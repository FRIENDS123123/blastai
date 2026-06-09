import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, channel } = body

    // Server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 })
    }

    if (!channel || !['whatsapp', 'sms'].includes(channel)) {
      return NextResponse.json({ message: 'Invalid channel.' }, { status: 400 })
    }

    // Extract IP (x-forwarded-for is set by Vercel)
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
    const userAgent = request.headers.get('user-agent') ?? ''

    const supabase = createClient()

    // Rate limit: max 3 signups per IP per channel per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('channel', channel)
      .gte('created_at', oneHourAgo)

    if (countError) throw countError

    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { message: 'Too many signups from this IP. Try again later.' },
        { status: 429 }
      )
    }

    // Dedup check: same email + channel already exists?
    const { data: existing, error: selectError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .eq('channel', channel)
      .maybeSingle()

    if (selectError) throw selectError

    if (existing) {
      return NextResponse.json({ status: 'already_subscribed' }, { status: 200 })
    }

    // Insert new signup
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, channel, ip_address: ip, user_agent: userAgent })

    if (insertError) throw insertError

    return NextResponse.json({ status: 'subscribed' }, { status: 200 })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
