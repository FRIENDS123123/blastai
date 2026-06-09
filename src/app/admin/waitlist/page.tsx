import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/app/LogoutButton'

export default async function AdminWaitlistPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  if (user.email !== process.env.ADMIN_EMAIL) redirect('/dashboard')

  const { data: rows, error } = await supabase
    .from('waitlist')
    .select('id, email, channel, source, ip_address, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error

  const total = rows?.length ?? 0
  const whatsappCount = rows?.filter(r => r.channel === 'whatsapp').length ?? 0
  const smsCount = rows?.filter(r => r.channel === 'sms').length ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">BlastAI</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Waitlist Signups</h1>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total</p>
            <p className="text-3xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">WhatsApp</p>
            <p className="text-3xl font-bold text-green-600">{whatsappCount}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">SMS</p>
            <p className="text-3xl font-bold text-blue-600">{smsCount}</p>
          </div>
        </div>

        {/* Table */}
        {total === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-500">No signups yet. Share your landing page!</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Channel</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">IP</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Signed up</th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{row.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.channel === 'whatsapp'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {row.channel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{row.source}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{row.ip_address ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(row.created_at).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
