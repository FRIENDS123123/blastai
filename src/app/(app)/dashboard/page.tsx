import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/app/LogoutButton'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">BlastAI</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome to BlastAI 👋
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Coming this week */}
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
          Coming this week
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PlaceholderCard title="Campaigns" description="Create and send email campaigns" eta="Week 3" />
          <PlaceholderCard title="Contacts" description="Upload and manage your contact list" eta="Week 2" />
          <PlaceholderCard title="Templates" description="Build reusable email templates" eta="Week 2" />
        </div>
      </main>
    </div>
  )
}

function PlaceholderCard({ title, description, eta }: { title: string; description: string; eta: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm opacity-60">
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <span className="inline-block text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
        Coming {eta}
      </span>
    </div>
  )
}
