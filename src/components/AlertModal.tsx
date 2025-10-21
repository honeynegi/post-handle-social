'use client'

import { FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaCheckCircle } from 'react-icons/fa'

export type AlertType = 'info' | 'warning' | 'error' | 'success'

interface AlertModalProps {
  isOpen: boolean
  type: AlertType
  title: string
  message: string
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  showConfirmButton?: boolean
}

const alertStyles = {
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icon: FaInfoCircle
  },
  warning: {
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    icon: FaExclamationTriangle
  },
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    icon: FaTimesCircle
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    icon: FaCheckCircle
  }
}

export default function AlertModal({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'OK',
  showConfirmButton = false
}: AlertModalProps) {
  if (!isOpen) return null

  const style = alertStyles[type]
  const IconComponent = style.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-custom-secondary/10 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-md mx-4 ${style.bgColor} border ${style.borderColor} rounded-lg shadow-xl`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${style.iconColor}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className={`text-lg font-medium ${style.titleColor}`}>
                {title}
              </h3>
            </div>
          </div>

          {/* Message */}
          <div className="mt-4">
            <p className={`text-sm ${style.messageColor}`}>
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              {showConfirmButton ? 'Cancel' : 'OK'}
            </button>
            {showConfirmButton && onConfirm && (
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium text-white ${style.buttonColor} border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}