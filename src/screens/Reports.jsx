import React, { useState } from 'react'
import { BarChart3, FileText, MessageCircle, Clock, AlertCircle, CheckCircle } from 'lucide-react'

const reports = [
  { id: 1, title: 'Field Alpha Coverage Report', date: '21/10/2026', type: 'Mission', status: 'Completed', value: '44% coverage · 19.7 ha', icon: CheckCircle },
  { id: 2, title: 'Spray Log — Pesticide Mix A', date: '20/10/2026', type: 'Spray', status: 'Completed', value: '12.3 ha sprayed', icon: CheckCircle },
  { id: 3, title: 'Battery Health Audit', date: '19/10/2026', type: 'Maintenance', status: 'Warning', value: '2 drones below 70%', icon: AlertCircle },
  { id: 4, title: 'Weather Gate Log', date: '18/10/2026', type: 'Weather', status: 'Completed', value: 'All clear · 5 launches', icon: CheckCircle },
  { id: 5, title: 'Mission #34621 Timeline', date: '17/10/2026', type: 'Mission', status: 'Failed', value: 'Drone offline mid-flight', icon: AlertCircle },
]

const messages = [
  { id: 1, from: 'Carlos Mendez (Operator)', time: '14:32', text: 'Mission #4821 complete. Field Alpha at 44% coverage. Returning to base.', read: true },
  { id: 2, from: 'System Alert', time: '13:45', text: 'XAG P100 Pro battery critical (61%). Recommend immediate recharge.', read: false },
  { id: 3, from: 'Priya Sharma (Operator)', time: '11:20', text: 'Weather gate approved for Field Beta. Clear to launch at 14:00.', read: true },
  { id: 4, from: 'Weather Service', time: '09:15', text: 'Wind speed increasing to 18 km/h. Monitor spray drift.', read: false },
  { id: 5, from: 'Carlos Mendez (Operator)', time: '08:30', text: 'Mission #34621 started. Field Alpha — grid pattern at 25m altitude.', read: true },
]

export default function Reports() {
  const [activeTab, setActiveTab] = useState('reports')
  const [exporting, setExporting] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Reports & Messages</h2>
          <p className="text-ink-3">Mission history, fleet reports, and operator messages.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeTab === 'reports' ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-3 hover:border-accent/50'}`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeTab === 'messages' ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-3 hover:border-accent/50'}`}
          >
            Messages
          </button>
        </div>
      </div>

      {activeTab === 'reports' ? (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold text-lg text-ink mb-4">Mission Reports</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Report</th>
                    <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Date</th>
                    <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Type</th>
                    <th className="pb-3 text-xs font-bold text-ink-2 uppercase text-right">Status</th>
                    <th className="pb-3 text-xs font-bold text-ink-2 uppercase text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-b border-line/50 hover:bg-surface-2/50 transition-colors">
                      <td className="py-3 text-sm text-ink">{r.title}</td>
                      <td className="py-3 text-xs font-mono text-ink-3">{r.date}</td>
                      <td className="py-3 text-xs text-ink-2">{r.type}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          r.status === 'Completed' ? 'bg-accent/10 text-accent border border-accent/20' :
                          r.status === 'Warning' ? 'bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/30' :
                          'bg-red-900/20 text-red-400 border border-red-500/30'
                        }`}>{r.status}</span>
                      </td>
                      <td className="py-3 text-right text-xs font-mono text-ink">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg text-ink mb-4">Quick Export</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Export All Reports (CSV)', 'Export Spray Logs', 'Export Flight Telemetry'].map((label) => (
                <button key={label}
                  onClick={() => {
                    setExporting(label)
                    setTimeout(() => {
                      setExporting(null)
                      alert('Export started: ' + label + '\n\nExporting data... (demo mode)')
                    }, 800)
                  }}
                  className={`w-full py-3 rounded-xl border border-line text-left flex items-center justify-between text-ink-3 hover:bg-surface-2 transition-all ${exporting === label ? 'bg-accent/20 border-accent text-accent-ink' : ''}`}
                >
                  <span>{label}</span>
                  <span className={exporting === label ? 'text-accent-ink animate-pulse' : 'text-ink-3'}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold text-lg text-ink mb-4">Operator Messages</h3>
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`p-4 rounded-2xl border transition-all hover:bg-accent/5 ${m.read ? 'border-line bg-surface-2' : 'border-accent bg-accent/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-ink">{m.from}</span>
                    <span className="text-[10px] text-ink-3 font-mono">{m.time}</span>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <p className="text-sm text-ink-3">{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg text-ink mb-4">Send Message</h3>
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent resize-none"
                  placeholder="Type a message to an operator..."
                  rows={4}
                />
                <button
                  className="absolute right-3 bottom-3 bg-accent text-accent-ink rounded-lg px-4 py-2 text-sm font-bold hover:bg-accent-2 transition-all"
                  disabled
                >
                  Send
                </button>
              </div>
              <div className="flex gap-2 text-xs text-ink-3">
                <span>⚠️ Messaging is demo mode — operator replies require backend integration.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}