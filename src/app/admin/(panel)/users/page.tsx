'use client'

import React, { useState, useEffect } from 'react'
import {
  UserCog, Plus, Search, Edit2, Trash2, Shield, Key,
  CheckCircle2, XCircle, Loader2, Eye, EyeOff, UserCheck, UserX,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

interface User {
  id: string; username: string; name: string; email: string | null
  role: string; isActive: boolean; passwordChangeRequest: boolean
  createdAt: string; updatedAt: string
}

const roleLabels: Record<string, string> = {
  ADMIN: 'Administrator', BLOG_MANAGER: 'Blog Manager',
  CV_CHECKER: 'CV Checker', CLIENT_CHECKER: 'Client Checker',
}

const roleColors: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-700', BLOG_MANAGER: 'bg-blue-100 text-blue-700',
  CV_CHECKER: 'bg-emerald-100 text-emerald-700', CLIENT_CHECKER: 'bg-amber-100 text-amber-700',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Create user dialog
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', email: '', role: 'CV_CHECKER' })
  const [creating, setCreating] = useState(false)

  // Edit user dialog
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editIsActive, setEditIsActive] = useState(true)
  const [saving, setSaving] = useState(false)

  // Reset password dialog
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [resetUser, setResetUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [resetting, setResetting] = useState(false)

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) setUsers((await res.json()).data || [])
    } catch { toast.error('Failed to fetch users') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [])

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  )

  // Create user
  const handleCreate = async () => {
    if (!newUser.username || !newUser.password || !newUser.name || !newUser.role) {
      toast.error('Please fill all required fields')
      return
    }
    if (newUser.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setCreating(true)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser),
      })
      if (res.ok) {
        toast.success('User created successfully!')
        setShowCreateDialog(false)
        setNewUser({ username: '', password: '', name: '', email: '', role: 'CV_CHECKER' })
        fetchUsers()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to create user')
      }
    } catch { toast.error('Failed to create user') }
    finally { setCreating(false) }
  }

  // Edit user
  const openEdit = (user: User) => {
    setEditUser(user)
    setEditName(user.name)
    setEditEmail(user.email || '')
    setEditRole(user.role)
    setEditIsActive(user.isActive)
    setShowEditDialog(true)
  }

  const handleSaveEdit = async () => {
    if (!editUser) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/users/${editUser.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, email: editEmail || null, role: editRole, isActive: editIsActive }),
      })
      if (res.ok) {
        toast.success('User updated!')
        setShowEditDialog(false)
        fetchUsers()
      }
    } catch { toast.error('Failed to update user') }
    finally { setSaving(false) }
  }

  // Approve password change
  const handleApprovePasswordChange = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvePasswordChange: true }),
      })
      if (res.ok) {
        toast.success('Password change approved!')
        fetchUsers()
      }
    } catch { toast.error('Failed to approve password change') }
  }

  // Reset password
  const handleResetPassword = async () => {
    if (!resetUser || !newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setResetting(true)
    try {
      const res = await fetch(`/api/admin/users/${resetUser.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      })
      if (res.ok) {
        toast.success('Password reset successfully!')
        setShowResetDialog(false)
        setNewPassword('')
        setResetUser(null)
      }
    } catch { toast.error('Failed to reset password') }
    finally { setResetting(false) }
  }

  // Delete user
  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/users/${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('User deleted!')
        fetchUsers()
      } else {
        const json = await res.json()
        toast.error(json.error || 'Failed to delete user')
      }
    } catch { toast.error('Failed to delete user') }
    finally { setDeleteId(null) }
  }

  // Toggle active
  const handleToggleActive = async (user: User) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !user.isActive }),
      })
      if (res.ok) {
        toast.success(user.isActive ? 'User deactivated' : 'User activated')
        fetchUsers()
      }
    } catch { toast.error('Failed to update user') }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-vare-slate">User Management</h1>
          <p className="text-vare-gray mt-1">Create and manage dashboard users and roles</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-vare-purple hover:bg-vare-purple-light text-white gap-2">
          <Plus className="h-4 w-4" />Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="border-vare-border bg-white mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vare-gray" />
            <Input placeholder="Search by name, username, or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-vare-border bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-vare-ice/50 hover:bg-vare-ice/50">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Password</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-vare-slate">{user.name}</p>
                          <p className="text-xs text-vare-gray">@{user.username}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={roleColors[user.role] || ''}>{roleLabels[user.role] || user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {user.passwordChangeRequest ? (
                          <button onClick={() => handleApprovePasswordChange(user.id)} className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-medium">
                            <Key className="h-3.5 w-3.5" />
                            Pending Approval
                          </button>
                        ) : (
                          <span className="text-sm text-vare-gray flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            Set
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-vare-gray">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-vare-purple" onClick={() => openEdit(user)} title="Edit">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-amber-600" onClick={() => { setResetUser(user); setNewPassword(''); setShowResetDialog(true) }} title="Reset Password">
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-vare-purple" onClick={() => handleToggleActive(user)} title={user.isActive ? 'Deactivate' : 'Activate'}>
                            {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-vare-gray hover:text-red-600" onClick={() => setDeleteId(user.id)} title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new dashboard account with a specific role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input value={newUser.name} onChange={(e) => setNewUser(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input value={newUser.username} onChange={(e) => setNewUser(p => ({ ...p, username: e.target.value }))} placeholder="johndoe" />
            </div>
            <div className="space-y-2">
              <Label>Password *</Label>
              <Input type="password" value={newUser.password} onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))} placeholder="Min 6 characters" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={newUser.email} onChange={(e) => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Role *</Label>
              <Select value={newUser.role} onValueChange={(v) => setNewUser(p => ({ ...p, role: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="BLOG_MANAGER">Blog Manager</SelectItem>
                  <SelectItem value="CV_CHECKER">CV Checker</SelectItem>
                  <SelectItem value="CLIENT_CHECKER">Client Checker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={creating} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                {creating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={editRole} onValueChange={setEditRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="BLOG_MANAGER">Blog Manager</SelectItem>
                  <SelectItem value="CV_CHECKER">CV Checker</SelectItem>
                  <SelectItem value="CLIENT_CHECKER">Client Checker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Label>Active Status</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditIsActive(!editIsActive)}
                className={editIsActive ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}
              >
                {editIsActive ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Active</> : <><XCircle className="h-3.5 w-3.5 mr-1" />Inactive</>}
              </Button>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit} disabled={saving} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Set a new password for {resetUser?.name} (@{resetUser?.username})</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2 relative">
              <Label>New Password</Label>
              <Input
                type={showPwd ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-8 text-vare-gray hover:text-vare-slate">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>Cancel</Button>
              <Button onClick={handleResetPassword} disabled={resetting} className="bg-vare-purple hover:bg-vare-purple-light text-white">
                {resetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Key className="mr-2 h-4 w-4" />}
                Reset Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
