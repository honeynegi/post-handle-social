import { Suspense } from 'react'
import SignupSuccess from './SignupSuccess'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupSuccess />
    </Suspense>
  )
}