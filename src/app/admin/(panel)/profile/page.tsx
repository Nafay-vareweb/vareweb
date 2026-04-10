'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Key, Shield, AlertTriangle, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

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

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mustChange = searchParams.get('mustChange') === 'true'

  const [user, setUser] = useState<{ name: string; username: string; role: string; passwordChangeRequest: boolean } | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => setUser(data.data))
      .catch(() => router.push('/admin/login'))
  }, [router])

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestedPassword: newPassword }),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success(json.data.message)
        setNewPassword('')
        setConfirmPassword('')
        // Refresh user data
        const meRes = await fetch('/api/auth/me')
        if (meRes.ok) {
          const meData = await meRes.json()
          setUser(meData.data)
        }
      } else {
        toast.error(json.error || 'Failed to submit request')
      }
    } catch {
      toast.error('Failed to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-vare-purple" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-vare-slate">My Profile</h1>
        <p className="text-vare-gray mt-1">View your account details and manage your password</p>
      </div>

      {/* Profile Card */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shrink-0">
              <span className="text-white text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-vare-slate">{user.name}</h2>
              <p className="text-sm text-vare-gray">@{user.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={roleColors[user.role] || ''}>
                  <Shield className="h-3 w-3 mr-1" />
                  {roleLabels[user.role]}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card className="border-vare-border bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-vare-purple/10 flex items-center justify-center">
              <Key className="h-5 w-5 text-vare-purple" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-vare-slate">Change Password</h3>
              <p className="text-sm text-vare-gray">
                Request a password change. An administrator will review and approve it.
              </p>
            </div>
          </div>

          {user.passwordChangeRequest && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-sm text-amber-700 font-medium">
                  Password change request is pending admin approval.
                </p>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                An administrator will review your request. Once approved, your password will be updated automatically.
              </p>
            </div>
          )}

          {mustChange && !user.passwordChangeRequest && (
            <div className="bg-vare-purple/5 border border-vare-purple/20 rounded-xl px-4 py-3 mb-4">
              <p className="text-sm text-vare-purple font-medium">
                Please request a new password. Your administrator requires you to set a custom password.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPwd ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  required
                  disabled={user.passwordChangeRequest}
                  className="pr-10 border-vare-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-vare-gray hover:text-vare-slate"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPwd ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={user.passwordChangeRequest}
                className="border-vare-border"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting || user.passwordChangeRequest}
              className="bg-vare-purple hover:bg-vare-purple-light text-white"
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting Request...</>
              ) : (
                <><Key className="mr-2 h-4 w-4" />Request Password Change</>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-vare-border">
            <p className="text-xs text-vare-gray">
              <strong>Note:</strong> Password changes require administrator approval. After you submit a request, your admin will review and approve it. Once approved, your password will be updated immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
