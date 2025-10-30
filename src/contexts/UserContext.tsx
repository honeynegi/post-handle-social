'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '../utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useAlert } from './AlertContext'

interface UserContextType {
  user: any
  loading: boolean
  refreshUser: () => Promise<void>
  updateUser: (updates: any) => Promise<void>
  updateEmail: (email: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>
  sendPasswordResetLink: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { showAlert } = useAlert()

  const fetchUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
        setUser(null)
        return
      }
      setUser(session?.user || null)
    } catch (error) {
      console.error('Error fetching session:', error)
      setUser(null)
    }
  }

  const refreshUser = async () => {
    await fetchUser()
  }

    const updateUser = async (updates: any) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })
      if (error) throw error

      // Update local user state with the new data
      setUser((prevUser: any) => ({
        ...prevUser,
        user_metadata: {
          ...prevUser?.user_metadata,
          ...updates
        }
      }))
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  const updateEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: email
      })
      if (error) throw error

      // Note: Email updates may require email confirmation
      // The user will receive a confirmation email
    } catch (error) {
      console.error('Error updating email:', error)
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error('All password fields are required')
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New passwords do not match')
    }

    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    try {
      // First verify current password by attempting to sign in
      if (!user?.email) throw new Error('User email not found')

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      })

      if (signInError) {
        throw new Error('Current password is incorrect')
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) throw updateError

      // Show success message and logout
      showAlert(
        'success',
        'Password Changed',
        'Your password has been changed successfully! Please login with your new password.',
        {
          onConfirm: async () => {
            await logout()
          },
          confirmText: 'Login Now',
          showConfirmButton: true
        }
      )
    } catch (error) {
      console.error('Error changing password:', error)
      throw error
    }
  }

  const sendPasswordResetLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`
      })
      if (error) throw error
    } catch (error) {
      console.error('Error sending password reset link:', error)
      throw error
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true)
      await fetchUser()
      setLoading(false)
    }

    initializeUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await fetchUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
      // Note: We handle USER_UPDATED manually in updateUser to avoid loops
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const value = {
    user,
    loading,
    refreshUser,
    updateUser,
    updateEmail,
    changePassword,
    sendPasswordResetLink,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}