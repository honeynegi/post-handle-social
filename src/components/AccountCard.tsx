'use client'

import { useState } from 'react'
import Button from './Button'
import { FaChevronDown, FaChevronUp, FaEnvelope, FaLock, FaKey } from 'react-icons/fa'
import { useUser } from '../contexts/UserContext'
import { useAlert } from '../contexts/AlertContext'

export default function AccountCard() {
  const { updateEmail, changePassword, sendPasswordResetLink } = useUser()
  const { showAlert } = useAlert()

  // Dropdown states
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Email update states
  const [newEmail, setNewEmail] = useState('')
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false)
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false)

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)

  // Password reset states
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail) return

    setEmailUpdateLoading(true)
    try {
      await updateEmail(newEmail)

      setEmailUpdateSuccess(true)
      setNewEmail('')
      setTimeout(() => setEmailUpdateSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating email:', error)
      showAlert('error', 'Email Update Failed', 'There was an error updating your email address. Please try again.')
    } finally {
      setEmailUpdateLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword || !confirmPassword) return

    setPasswordChangeLoading(true)
    try {
      await changePassword(currentPassword, newPassword, confirmPassword)

      // Clear form fields
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      console.error('Error changing password:', error)
      showAlert('error', 'Password Change Failed', error.message || 'There was an error changing your password. Please try again.')
    } finally {
      setPasswordChangeLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) return

    setResetLoading(true)
    try {
      await sendPasswordResetLink(resetEmail)

      setResetSuccess(true)
      setResetEmail('')
      setTimeout(() => setResetSuccess(false), 5000)
    } catch (error) {
      console.error('Error sending reset email:', error)
      showAlert('error', 'Reset Email Failed', 'There was an error sending the password reset email. Please try again.')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="p-6 rounded-lg shadow-sm w-full max-w-full bg-white mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Account Settings</h2>

      {/* Email Update Section */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <button
          onClick={() => toggleSection('email')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FaEnvelope className="mr-3 text-gray-500" />
            <h3 className="text-md font-medium text-gray-700">Update Email Address</h3>
          </div>
          {expandedSection === 'email' ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </button>
        {expandedSection === 'email' && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <form onSubmit={handleEmailUpdate} className="space-y-3 pt-4">
              <div>
                <label htmlFor="newEmail" className="block text-sm font-normal text-gray-400">New Email Address</label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 mt-1"
                  placeholder="Enter new email address"
                  required
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={emailUpdateLoading || !newEmail}
              >
                {emailUpdateLoading ? 'Updating...' : 'Update Email'}
              </Button>
              {emailUpdateSuccess && (
                <p className="text-sm text-green-600 mt-2">Email update initiated. Please check your email to confirm the change.</p>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Password Change Section */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <button
          onClick={() => toggleSection('password')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FaLock className="mr-3 text-gray-500" />
            <h3 className="text-md font-medium text-gray-700">Change Password</h3>
          </div>
          {expandedSection === 'password' ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </button>
        {expandedSection === 'password' && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <form onSubmit={handlePasswordChange} className="space-y-3 pt-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-normal text-gray-400">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 mt-1"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-normal text-gray-400">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 mt-1"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-normal text-gray-400">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 mt-1"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={passwordChangeLoading || !currentPassword || !newPassword || !confirmPassword}
              >
                {passwordChangeLoading ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Password Reset Section */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('reset')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FaKey className="mr-3 text-gray-500" />
            <h3 className="text-md font-medium text-gray-700">Forgot Password?</h3>
          </div>
          {expandedSection === 'reset' ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </button>
        {expandedSection === 'reset' && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3 pt-4">Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handlePasswordReset} className="space-y-3">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-normal text-gray-400">Email Address</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="block w-full border-gray-300 rounded-md border text-custom-primary focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 mt-1"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={resetLoading || !resetEmail}
              >
                {resetLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              {resetSuccess && (
                <p className="text-sm text-green-600 mt-2">Password reset link sent! Please check your email.</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}