import React from 'react'
import { Monitor, Activity, BatteryCharging, AlertTriangle, Wifi, Cloud } from 'lucide-react'

const drones = [
  { id: 1, name: 'DJI Agras T40', status: 'Active', battery: 78, health: 'Excellent', lastSeen: '2 min ago', color: '#4ade80' },
  { id: 2, name: 'DJI Agras T30', status: 'Standby', battery: 94, health: 'Good', lastSeen: '15 min ago', color: '#4ade80' },
  { id: 3, name: 'XAG P100 Pro', status: 'Maintenance', battery: 61, health: 'Critical', lastSeen: '4 hours ago', color: '#fbbf24' },
  { id: 4, name: 'DJI Mavic 3M', status: 'Offline', battery: 12, health: 'Critical', lastSeen: '1 day ago', color: '#7a9a7a' },
  { id: 5, name: 'DJI Agras T20', status: 'Active', battery: 52, health: 'Fair', lastSeen: '5 min ago', color: '#4ade80' },
]

export default function FleetHealth() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Fleet Health</h2>
          <p className="text-ink-3">Monitor all drones across your operations.</p>
        </div>
        <button className="px-4 py-2 rounded-xl border border-line bg-surface-2 text-sm text-ink hover:text-ink transition-colors flex items-center gap-2">
          <Wifi className="w-4 h-4" /> Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MiniStat label="Total Fleet" value="5" sub="All drones" icon={Monitor} />
        <MiniStat label="Active" value="2" sub="In the air" icon={Activity} />
        <MiniStat label="Standby" value="1" sub="Ready to fly" icon={BatteryCharging} />
        <MiniStat label="Maintenance" value="2" sub="Needs attention" icon={AlertTriangle} />
      </div>

      <div className="card">
        <h3 className="font-bold text-lg text-ink mb-4">Drone Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Drone</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Status</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Battery</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Health</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase">Last Seen</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase text-right">Signal</th>
                <th className="pb-3 text-xs font-bold text-ink-2 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drones.map((d) => (
                <tr key={d.id} className="border-b border-line/50 hover:bg-surface-2/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                        <Monitor className={`w-4 h-4 ${d.color === '#4ade80' ? 'text-accent' : d.color === '#fbbf24' ? 'text-accent-2' : 'text-ink-3'}`} />
                      </div>
                      <div>
                        <div className="font-medium text-ink">{d.name}</div>
                        <div className="text-xs text-ink-3">Serial #AD-{String(d.id).padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${d.status === 'Active' ? 'bg-accent/10 text-accent border border-accent/20' : d.status === 'Standby' ? 'bg-accent-2/10 text-accent-2 border border-accent-2/30' : 'bg-surface text-ink-3 border border-line'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink">{d.battery}%</span>
                      <div className="flex-1 h-1 bg-surface-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: d.battery + '%', background: d.battery > 70 ? '#4ade80' : d.battery > 40 ? '#22c55e' : '#ef4444' }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-medium ${d.health === 'Excellent' ? 'text-accent' : d.health === 'Good' ? 'text-accent-2' : d.health === 'Fair' ? 'text-ink-2' : 'text-red-400'}`}>{d.health}</span>
                  </td>
                  <td className="py-4 text-xs text-ink-3 font-mono">{d.lastSeen}</td>
                  <td className="py-4 text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${d.status === 'Active' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-surface text-ink-3 border border-line'}`}>{Math.floor(85 + Math.random() * 15)}%</span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-ink-3 hover:text-accent transition-colors" title="Details"><Monitor className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-lg text-ink mb-4">Battery Levels Across Fleet</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drones.map((d) => (
            <div key={d.id} className="p-4 rounded-2xl border border-line bg-surface-2">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-ink">{d.name}</span>
                <span className="text-xs font-mono font-bold text-accent">{d.battery}%</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: d.battery + '%', background: d.battery > 70 ? '#4ade80' : d.battery > 40 ? '#22c55e' : '#ef4444' }} />
              </div>
              <div className="flex justify-between text-[10px] text-ink-3">
                <span>{d.health}</span>
                <span>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, sub, icon: Icon }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-surface-2 border border-line">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <span className="text-xs font-bold text-ink-2 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold font-mono text-ink">{value}</div>
      <p className="text-xs text-ink-3 mt-1">{sub}</p>
    </div>
  )
}
