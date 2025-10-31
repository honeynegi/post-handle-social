import { createClient } from '@/utils/supabase/client'

export async function connectInstagramUser(uid?: string | null) {
  const supabase = createClient()

  console.log('Util: connectInstagramUser started, uid:', uid)

  try {
    if (uid) {
      // console.log('Util: Processing uid:', uid)
      // console.log('Util: About to query users table')

      // Fetch user from Supabase
      const result = await supabase
        .from('users')
        .select('*')
        .eq('uid', uid)
        .single()
      // console.log('Util: Raw result from query:', result)
      const { data: existingUser, error: fetchError } = result

      // console.log('Util: Query completed. User found:', !!existingUser, 'error:', fetchError?.message)

      if (existingUser && !fetchError) {
        // Sign in anonymously for existing user
        const { error: signInError } = await supabase.auth.signInAnonymously()
        if (signInError) {
          // console.error('Util: Anonymous sign-in failed:', signInError)
          throw new Error('Failed to sign in anonymously for existing user')
        } else {
          // console.log('Util: User anonymously signed in for UID:', uid)
          return existingUser
        }
      } else {
        // User not found, create new user with uid
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({ uid: uid })
          .select()
          .single()

        if (newUser && !insertError) {
          // Sign in anonymously for new user
          const { error: signInError } = await supabase.auth.signInAnonymously()
          if (signInError) {
            // console.error('Util: Anonymous sign-in failed for new user:', signInError)
            throw new Error('Failed to sign in anonymously for new user')
          } else {
            // console.log('Util: New user created and signed in for UID:', uid)
            return newUser
          }
        } else {
          // console.error('Util: Failed to create new user:', insertError)
          throw new Error('Failed to create new user')
        }
      }
    } else {
      // No UID, create new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({})
        .select()
        .single()

      if (newUser && !insertError) {
        // Sign in anonymously
        const { error: signInError } = await supabase.auth.signInAnonymously()
        if (signInError) {
          // console.error('Util: Anonymous sign-in failed:', signInError)
          throw new Error('Failed to sign in anonymously')
        } else {
          // console.log('Util: New user created and signed in')
          return newUser
        }
      } else {
        // console.error('Util: Failed to create new user:', insertError)
        throw new Error('Failed to create new user')
      }
    }
  } catch (err) {
    // console.error('Util: Error:', err)
    throw err
  }
}