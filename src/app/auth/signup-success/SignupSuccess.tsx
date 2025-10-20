'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import Button from '../../../components/Button'

export default function SignupSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Get email from URL params if available
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Home Button */}
        <div className="flex justify-start mb-8">
          <Button
            variant="text"
            className="text-gray-600 hover:text-gray-800 p-0 h-auto"
            onClick={() => router.push('/')}
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Home</span>
          </Button>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome to Post Handle! Your account has been created successfully.
          </p>
          {email && (
            <p className="text-sm text-gray-500 mb-4">
              We've sent a confirmation email to <strong>{email}</strong>
            </p>
          )}
          <p className="text-sm text-gray-600">
            Please check your email and click the confirmation link to activate your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            className="bg-custom-secondary hover:bg-custom-secondary/90 text-white"
            onClick={() => router.push('/login')}
          >
            Continue to Login
          </Button>

          <Button
            variant="outline"
            fullWidth
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your email for a confirmation link</li>
            <li>• Click the link to verify your email address</li>
            <li>• Return here and sign in with your credentials</li>
            <li>• Start managing your social media campaigns!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}