'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  ClipboardList,
  Mail,
  Briefcase,
  UserCog,
  LogOut,
  ArrowLeft,
  Menu,
  ExternalLink,
  ChevronDown,
  User,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

// Role-based navigation configuration
const roleNavItems: Record<string, Array<{
  label: string
  href: string
  icon: React.ElementType
}>> = {
  ADMIN: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
    { label: 'Resumes/CVs', href: '/admin/resumes', icon: Users },
    { label: 'Careers', href: '/admin/careers', icon: Briefcase },
    { label: 'Client Forms', href: '/admin/clients', icon: ClipboardList },
    { label: 'Contact Messages', href: '/admin/contact', icon: Mail },
    { label: 'User Management', href: '/admin/users', icon: UserCog },
  ],
  BLOG_MANAGER: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  ],
  CV_CHECKER: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Resumes/CVs', href: '/admin/resumes', icon: Users },
    { label: 'Careers', href: '/admin/careers', icon: Briefcase },
  ],
  CLIENT_CHECKER: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Client Forms', href: '/admin/clients', icon: ClipboardList },
    { label: 'Contact Messages', href: '/admin/contact', icon: Mail },
  ],
}

const roleLabels: Record<string, string> = {
  ADMIN: 'Administrator',
  BLOG_MANAGER: 'Blog Manager',
  CV_CHECKER: 'CV Checker',
  CLIENT_CHECKER: 'Client Checker',
}

const roleColors: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-700',
  BLOG_MANAGER: 'bg-blue-100 text-blue-700',
  CV_CHECKER: 'bg-emerald-100 text-emerald-700',
  CLIENT_CHECKER: 'bg-amber-100 text-amber-700',
}

function SidebarNav({ userRole, onNavigate }: { userRole: string; onNavigate?: () => void }) {
  const pathname = usePathname()
  const items = roleNavItems[userRole] || roleNavItems['CV_CHECKER']

  return (
    <nav className="flex flex-col gap-1 px-3 py-4" role="navigation" aria-label="Admin navigation">
      {/* Brand */}
      <div className="mb-6 px-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-vare-slate">VareWeb</h2>
          </div>
        </div>
        <p className="text-xs text-vare-gray mt-1">Admin Panel</p>
        <Badge className={cn('mt-2 text-[10px] font-medium', roleColors[userRole])}>
          <Shield className="h-2.5 w-2.5 mr-1" />
          {roleLabels[userRole] || userRole}
        </Badge>
      </div>

      {/* Nav Items */}
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-vare-purple text-white shadow-md shadow-vare-purple/20'
                : 'text-vare-slate hover:bg-vare-ice hover:text-vare-purple'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}

      {/* Bottom Links */}
      <div className="mt-auto border-t border-vare-border pt-4 space-y-1">
        <Link
          href="/admin/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-vare-gray transition-all duration-200 hover:bg-vare-ice hover:text-vare-slate"
        >
          <User className="h-4 w-4 shrink-0" />
          My Profile
        </Link>
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-vare-gray transition-all duration-200 hover:bg-vare-ice hover:text-vare-slate"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Website
        </Link>
      </div>
    </nav>
  )
}

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string; username: string } | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated')
        return res.json()
      })
      .then(data => setUser(data.data))
      .catch(() => {
        router.push('/admin/login')
      })
  }, [router])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch {
      toast.error('Logout failed')
      setLoggingOut(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vare-ice">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-vare-purple/30 border-t-vare-purple rounded-full animate-spin" />
          <p className="text-vare-gray text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-vare-ice">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-vare-border z-30">
        <SidebarNav userRole={user.role} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-vare-border bg-white/80 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <SidebarNav userRole={user.role} onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-lg font-bold text-vare-slate hidden sm:block">Administration</h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 border-vare-purple/30 text-vare-purple hover:bg-vare-purple hover:text-white transition-all duration-200">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">View Website</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 hover:bg-vare-ice">
                  <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-vare-slate leading-tight">{user.name}</p>
                    <p className="text-[10px] text-vare-gray">{roleLabels[user.role]}</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-vare-gray hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-vare-slate">{user.name}</p>
                  <p className="text-xs text-vare-gray">@{user.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-red-600 focus:text-red-600 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? 'Signing out...' : 'Sign Out'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
