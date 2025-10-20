'use client'

import { Turnstile as CloudflareTurnstile } from '@marsidev/react-turnstile'
import { forwardRef, Ref } from 'react'

interface TurnstileProps {
  onSuccess: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

const Turnstile = forwardRef<any, TurnstileProps>(
  ({ onSuccess, onError, onExpire }, ref) => {
    return (
      <CloudflareTurnstile
        ref={ref}
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: 'light',
          size: 'normal',
        }}
      />
    )
  }
)

Turnstile.displayName = 'Turnstile'

export default Turnstile