'use client'

import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    price: '₹0',
    period: '/mo',
    emails: '100 emails/mo',
    ai: false,
    footer: true,
    multiUser: false,
    highlight: false,
  },
  {
    name: 'Starter',
    price: '₹599',
    period: '/mo',
    emails: '5,000 emails/mo',
    ai: false,
    footer: false,
    multiUser: false,
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹1,499',
    period: '/mo',
    emails: '25,000 emails/mo',
    ai: true,
    footer: false,
    multiUser: false,
    highlight: true,
  },
  {
    name: 'Business',
    price: '₹3,499',
    period: '/mo',
    emails: '1,00,000 emails/mo',
    ai: true,
    footer: false,
    multiUser: true,
    highlight: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight text-indigo-600">BlastAI</span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
          Multi-channel marketing<br className="hidden sm:block" /> for Indian businesses
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          AI-personalized email today. WhatsApp and SMS coming soon. One tool. Built for India. Priced in INR.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-indigo-600 text-white font-medium px-8 py-3 rounded-xl hover:bg-indigo-700 transition text-base"
          >
            Start free
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto border border-gray-200 text-gray-700 font-medium px-8 py-3 rounded-xl hover:border-gray-400 transition text-base"
          >
            See pricing
          </a>
        </div>
      </section>

      {/* Channels row */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-3">
            <div className="text-3xl">📧</div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Email</h3>
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Available now
              </span>
            </div>
            <p className="text-sm text-gray-500">Send AI-personalized email campaigns to your contacts. Full tracking and analytics.</p>
            <Link href="/signup" className="mt-auto text-sm font-medium text-indigo-600 hover:underline">
              Get started →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 opacity-75">
            <div className="text-3xl">💬</div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">WhatsApp</h3>
              <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                Coming Q3 2026
              </span>
            </div>
            <p className="text-sm text-gray-500">Bulk WhatsApp messaging with template support and delivery tracking.</p>
            <button
              onClick={() => alert('Waitlist coming soon')}
              className="mt-auto text-sm font-medium text-gray-500 hover:text-gray-700 text-left"
            >
              Join waitlist →
            </button>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 opacity-75">
            <div className="text-3xl">📱</div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">SMS</h3>
              <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                Coming Q4 2026
              </span>
            </div>
            <p className="text-sm text-gray-500">Transactional and promotional SMS with DLT compliance built in.</p>
            <button
              onClick={() => alert('Waitlist coming soon')}
              className="mt-auto text-sm font-medium text-gray-500 hover:text-gray-700 text-left"
            >
              Join waitlist →
            </button>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Stop paying for three tools to do one job
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Indian SMBs pay <strong>₹2,500+/mo</strong> for Mailchimp and AiSensy separately. BlastAI gives you all your channels in one tool, in INR, with AI personalization powered by Claude.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-2">Simple pricing in INR</h2>
        <p className="text-center text-gray-500 mb-12">No USD billing. Cancel anytime.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 flex flex-col gap-4 relative ${
                tier.highlight
                  ? 'border-indigo-600 shadow-lg ring-2 ring-indigo-600'
                  : 'border-gray-200'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {tier.emails}
                </li>
                <li className="flex items-center gap-2">
                  {tier.ai ? (
                    <><span className="text-green-500">✓</span> AI personalization</>
                  ) : (
                    <><span className="text-gray-300">✗</span> No AI personalization</>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  {tier.footer ? (
                    <><span className="text-gray-300">✗</span> BlastAI footer in emails</>
                  ) : (
                    <><span className="text-green-500">✓</span> No BlastAI footer</>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  {tier.multiUser ? (
                    <><span className="text-green-500">✓</span> Multi-user</>
                  ) : (
                    <><span className="text-gray-300">✗</span> Single user</>
                  )}
                </li>
              </ul>
              <Link
                href="/signup"
                className={`text-center text-sm font-medium py-2.5 rounded-xl transition ${
                  tier.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'border border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                Start free
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        BlastAI © 2026 · Built in India · contact:{' '}
        <a href="mailto:hello@blastai.in" className="hover:text-gray-600 transition">
          hello@blastai.in
        </a>
      </footer>
    </div>
  )
}
