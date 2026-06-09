import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL('/login?error=verification_failed', request.url))
  }

  const supabase = createClient()

  // PKCE flow: Supabase newer projects send ?code= after email confirmation
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // OTP flow: older or manually configured projects send ?token_hash= + ?type=
  if (token_hash && type) {
    const { error: otpError } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!otpError) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.redirect(new URL('/login?error=verification_failed', request.url))
}
