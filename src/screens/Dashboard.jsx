import React, { useState, useCallback } from 'react'
import { Monitor, Leaf, Shield, Activity, RefreshCw, Users, BarChart3 } from 'lucide-react'

const initialDrones = [
  { name: 'DJI Agras T40', status: 'Active', battery: 78, coverage: 44, speed: 7.5, altitude: 24.5 },
  { name: 'DJI Agras T30', status: 'Standby', battery: 94, coverage: 0, speed: 0, altitude: 0 },
  { name: 'XAG P100 Pro', status: 'Maintenance', battery: 61, coverage: 0, speed: 0, altitude: 0 },
]

export default function Dashboard() {
  const [telemetry, setTelemetry] = useState(initialDrones)
  const [refreshCount, setRefreshCount] = useState(0)

  const refresh = useCallback(() => {
    setRefreshCount(c => c + 1)
    setTelemetry(initialDrones.map((d) => ({
      ...d,
      battery: Math.max(10, d.battery - Math.floor(Math.random() * 3)),
      coverage: Math.min(100, d.coverage + Math.floor(Math.random() * 5)),
      speed: d.status === 'Active' ? (6 + Math.random() * 3).toFixed(1) : d.speed,
    })))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Mission Control</h2>
          <p className="text-ink-3">Live drone operations across all fields.</p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-surface-2 text-sm text-ink hover:border-accent hover:text-ink transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${refreshCount > 0 ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Active Drones" value="3 / 5" sub="+1 today" icon={Monitor} />
        <StatCard title="Coverage Today" value="19.7 ha" sub="+22%" icon={Leaf} />
        <StatCard title="Battery Avg" value="87%" sub="3 charging" icon={Shield} />
        <StatCard title="Area Sprayed" value="44%" sub="In progress" icon={Activity} />
        <StatCard title="Waypoints" value="36,000" sub="All missions" icon={BarChart3} />
        <StatCard title="Farmers" value="12" sub="3 new" icon={Users} />
      </div>

      <div className="rounded-3xl border border-line bg-surface/60 p-6 shadow-card backdrop-blur-sm">
        <h3 className="font-bold text-xl text-ink tracking-tight mb-5">Live Telemetry</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {telemetry.map((d) => (
            <TelemetryCard key={d.name} name={d.name} status={d.status} battery={d.battery} coverage={d.coverage} speed={d.speed} altitude={d.altitude} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, sub, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-line bg-surface/60 p-5 shadow-card backdrop-blur-sm hover:border-line-bright hover:shadow-[0_8px_30px_-12px_rgba(74,222,128,0.15)] transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold text-ink-3 uppercase tracking-widest">{title}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-accent/10 text-accent shadow-[0_0_12px_rgba(74,222,128,0.2)]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-extrabold text-ink tracking-tight font-mono">{value}</div>
      <p className="text-xs text-ink-3 mt-1.5">{sub}</p>
    </div>
  )
}

function TelemetryCard({ name, status, battery, coverage, speed, altitude }) {
  const isActive = status === 'Active'
  return (
    <div className={`rounded-2xl border p-5 transition-all ${isActive ? 'bg-surface-2/70 border-accent/20' : 'bg-base/40 border-line/50'}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-ink">{name}</span>
        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wide uppercase ${isActive ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-3 border border-line'}`}>{status}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium">Battery</span>
          <div className="text-xl font-mono font-bold text-ink mt-0.5">{battery}%</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium">Coverage</span>
          <div className="text-xl font-mono font-bold text-ink mt-0.5">{coverage}%</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium">Speed</span>
          <div className="text-xl font-mono font-bold text-ink mt-0.5">{speed} m/s</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium">Altitude</span>
          <div className="text-xl font-mono font-bold text-ink mt-0.5">{altitude} m</div>
        </div>
      </div>
      <div className="h-2.5 bg-surface rounded-full overflow-hidden border border-line/20">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: battery + '%' }} />
      </div>
    </div>
  )
}
