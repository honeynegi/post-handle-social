'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import AlertModal, { AlertType } from '../components/AlertModal'

interface AlertContextType {
  showAlert: (type: AlertType, title: string, message: string, options?: AlertOptions) => void
  hideAlert: () => void
}

interface AlertOptions {
  onConfirm?: () => void
  confirmText?: string
  showConfirmButton?: boolean
}

interface AlertState {
  isOpen: boolean
  type: AlertType
  title: string
  message: string
  onConfirm?: () => void
  confirmText?: string
  showConfirmButton?: boolean
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  })

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
    options: AlertOptions = {}
  ) => {
    setAlert({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: options.onConfirm,
      confirmText: options.confirmText || 'OK',
      showConfirmButton: options.showConfirmButton || false
    })
  }

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }))
  }

  const value = {
    showAlert,
    hideAlert
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertModal
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={hideAlert}
        onConfirm={alert.onConfirm}
        confirmText={alert.confirmText}
        showConfirmButton={alert.showConfirmButton}
      />
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}