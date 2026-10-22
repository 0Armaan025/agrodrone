import React from 'react'
import { Activity, Clock, Shield, AlertTriangle } from 'lucide-react'

const missions = [
  { date: '20 Oct', field: 'Field Alpha', drone: 'DJI Agras T40', coverage: 44, duration: 120, status: 'completed' },
  { date: '19 Oct', field: 'Field Beta', drone: 'DJI Agras T30', coverage: 100, duration: 95, status: 'completed' },
  { date: '18 Oct', field: 'Field Gamma', drone: 'XAG P100 Pro', coverage: 78, duration: 110, status: 'completed' },
  { date: '17 Oct', field: 'Field Delta', drone: 'DJI Agras T40', coverage: 0, duration: 0, status: 'failed' },
  { date: '16 Oct', field: 'Field Alpha', drone: 'DJI Agras T40', coverage: 92, duration: 130, status: 'completed' },
]

export default function HistoryAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">History & Analytics</h2>
          <p className="text-ink-3">Mission history and fleet performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Total Missions" value="24" trend="+3 this month" icon={Activity} color={true} />
        <KPICard title="Area Covered" value="1,240 ha" trend="+18%" icon={Shield} color={true} />
        <KPICard title="Success Rate" value="94%" trend="+2%" icon={Shield} color={true} />
        <KPICard title="Flight Hours" value="184 h" trend="+12 h" icon={Clock} color={false} />
      </div>

      <div className="card">
        <h3 className="font-bold text-lg text-ink mb-4">Daily Coverage Trend</h3>
        <div className="h-48 flex items-end gap-2 mb-4">
          {[12, 19, 23, 31, 27, 19, 44].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-gradient-to-t from-accent/30 to-accent rounded-t-xl transition-all hover:from-accent/50 hover:to-accent-2" style={{ height: v * 2 + 'px' }} />
              <span className="text-[10px] text-ink-3 font-mono">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-lg text-ink mb-4">Mission History</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Date</th>
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Field</th>
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Drone</th>
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Coverage</th>
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Duration</th>
              <th className="pb-3 text-xs font-bold text-ink-2 uppercase text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => (
              <tr key={m.date} className="border-b border-line/50 hover:bg-surface-2/30">
                <td className="py-3 font-mono text-ink">{m.date}</td>
                <td className="py-3 text-ink">{m.field}</td>
                <td className="py-3 text-ink-2">{m.drone}</td>
                <td className="py-3 font-mono font-bold text-accent">{m.coverage}%</td>
                <td className="py-3 text-ink-3">{m.duration} min</td>
                <td className="py-3 text-right">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${m.status === 'completed' ? 'bg-accent/10 text-accent border border-accent/20' : m.status === 'failed' ? 'bg-red-900/20 text-red-400 border border-red-500/20' : 'bg-surface text-ink-3 border border-line'}`}>{m.status.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KPICard({ title, value, trend, icon: Icon, color }) {
  return (
    <div className="card hover:border-line-bright transition-all hover:shadow-[0_8px_30px_-12px_rgba(74,222,128,0.15)] group">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-2 border border-line group-hover:border-accent/20 transition-all">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <span className="text-[10px] font-bold text-ink-2 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold font-mono text-ink">{value}</div>
      <p className="text-xs mt-1 text-ink-3">{trend}</p>
    </div>
  )
}
