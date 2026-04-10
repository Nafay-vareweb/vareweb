'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center gradient-purple-dark">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error()
      })
      .then(() => router.push('/admin/dashboard'))
      .catch(() => {})
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const json = await res.json()

      if (res.ok) {
        toast.success(`Welcome back, ${json.data.name}!`)

        if (json.data.passwordChangeRequest) {
          router.push('/admin/profile?mustChange=true')
        } else {
          const redirect = searchParams.get('redirect') || '/admin/dashboard'
          router.push(redirect)
        }
      } else {
        setError(json.error || 'Login failed')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex gradient-purple-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-vare-purple-light/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-vare-purple/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-vare-purple-light/10 blur-3xl" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Back to Website */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm">Back to Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">V</span>
            <div className="absolute inset-0 rounded-2xl bg-white/5" />
          </div>
          <h1 className="text-2xl font-bold text-white">VareWeb</h1>
          <p className="text-white/60 text-sm mt-1">Admin Dashboard Login</p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-vare-purple-light" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Sign In</h2>
                <p className="text-white/50 text-xs">Enter your credentials to access the dashboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/80 text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/30 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-vare-purple-light focus:ring-vare-purple-light/30 h-11 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full h-11 bg-white text-vare-purple-dark font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg shadow-black/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-vare-purple-dark/30 border-t-vare-purple-dark rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs text-center">
                Secure admin access only. All actions are logged.
              </p>
            </div>
          </div>

          {/* Role Info */}
          <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <p className="text-white/50 text-xs text-center">
              Available roles: <span className="text-white/70">Admin</span> · <span className="text-white/70">Blog Manager</span> · <span className="text-white/70">CV Checker</span> · <span className="text-white/70">Client Checker</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
