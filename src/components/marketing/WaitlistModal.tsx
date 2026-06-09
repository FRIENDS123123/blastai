'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Smartphone } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  channel: 'whatsapp' | 'sms'
}

const CHANNEL_CONFIG = {
  whatsapp: {
    icon: MessageCircle,
    label: 'WhatsApp',
    heading: 'Join the WhatsApp waitlist',
    emoji: '💬',
  },
  sms: {
    icon: Smartphone,
    label: 'SMS',
    heading: 'Join the SMS waitlist',
    emoji: '📱',
  },
}

export default function WaitlistModal({ isOpen, onClose, channel }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')

  const config = CHANNEL_CONFIG[channel]

  // Auto-close after success
  useEffect(() => {
    if (status === 'success' || status === 'already') {
      const t = setTimeout(() => {
        onClose()
        setStatus('idle')
        setEmail('')
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [status, onClose])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle')
      setEmail('')
      setErrorMsg('')
      setEmailError('')
    }
  }, [isOpen])

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Email is required.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, channel }),
      })

      const data = await res.json()

      if (res.status === 429) {
        setStatus('error')
        setErrorMsg(data.message ?? 'Too many signups. Please try again later.')
        return
      }

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.message ?? 'Something went wrong. Please try again.')
        return
      }

      if (data.status === 'already_subscribed') {
        setStatus('already')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  const Icon = config.icon

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
          <Icon size={24} className="text-indigo-600" />
        </div>

        {status === 'success' && (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h2>
            <p className="text-gray-500 text-sm">
              We&apos;ll email <strong>{email}</strong> the moment {config.label} launches.
            </p>
            <p className="text-gray-400 text-xs mt-3">This window will close automatically.</p>
          </div>
        )}

        {status === 'already' && (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Already registered!</h2>
            <p className="text-gray-500 text-sm">
              You&apos;re already on the {config.label} waitlist — we&apos;ll email you when it launches.
            </p>
            <p className="text-gray-400 text-xs mt-3">This window will close automatically.</p>
          </div>
        )}

        {(status === 'idle' || status === 'loading' || status === 'error') && (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {config.heading} {config.emoji}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We&apos;ll email you the moment {config.label} sending is ready. No spam, just one launch announcement.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  placeholder="you@example.com"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    emailError ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {emailError && (
                  <p className="text-red-600 text-sm mt-1">{emailError}</p>
                )}
              </div>

              {status === 'error' && errorMsg && (
                <p className="text-red-600 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                {status === 'loading' ? 'Adding you…' : 'Notify me'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
