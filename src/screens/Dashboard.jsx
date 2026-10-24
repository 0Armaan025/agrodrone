import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Monitor, Leaf, Shield, Activity, RefreshCw, Users, BarChart3,
  TrendingUp, DollarSign, Clock, Zap
} from 'lucide-react'

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

  const stats = [
    { title: 'Active Drones', value: '3 / 5', sub: '+1 today', icon: Monitor, color: 'text-accent' },
    { title: 'Coverage Today', value: '19.7 ha', sub: '+22%', icon: Leaf, color: 'text-accent' },
    { title: 'Battery Avg', value: '87%', sub: '3 charging', icon: Shield, color: 'text-accent' },
    { title: 'Area Sprayed', value: '44%', sub: 'In progress', icon: Activity, color: 'text-accent' },
    { title: 'Waypoints', value: '36,000', sub: 'All missions', icon: BarChart3, color: 'text-accent' },
    { title: 'Farmers', value: '12', sub: '3 new', icon: Users, color: 'text-accent' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in delay-100">
        <div>
          <h2 className="section-title">Mission Control</h2>
          <p className="section-subtitle">Live drone operations across all fields.</p>
        </div>
        <button
          onClick={refresh}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshCount > 0 ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`stat-card animate-in delay-${i * 100}`}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">{s.title}</span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent/10 text-accent shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-ink tracking-tight font-mono">{s.value}</div>
            <p className="text-xs text-ink-3 mt-2">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl border border-line bg-surface/60 p-6 shadow-card backdrop-blur-sm animate-in delay-400">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-xl text-ink tracking-tight">Live Telemetry</h3>
          <div className="h-2 w-24 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-accent-2 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {telemetry.map((d) => (
            <TelemetryCard key={d.name} name={d.name} status={d.status} battery={d.battery} coverage={d.coverage} speed={d.speed} altitude={d.altitude} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TelemetryCard({ name, status, battery, coverage, speed, altitude }) {
  const isActive = status === 'Active'
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`rounded-2xl border p-5 ${isActive ? 'bg-surface-2/70 border-accent/20 shadow-card' : 'bg-base/40 border-line/50'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-ink">{name}</span>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide uppercase ${isActive ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-3 border border-line'}`}>{status}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium block mb-1">Battery</span>
          <div className="text-xl font-mono font-bold text-ink">{battery}%</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium block mb-1">Coverage</span>
          <div className="text-xl font-mono font-bold text-ink">{coverage}%</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium block mb-1">Speed</span>
          <div className="text-xl font-mono font-bold text-ink">{speed} m/s</div>
        </div>
        <div className="rounded-xl bg-surface p-3 border border-line/30">
          <span className="text-[10px] text-ink-3 uppercase tracking-wider font-medium block mb-1">Altitude</span>
          <div className="text-xl font-mono font-bold text-ink">{altitude} m</div>
        </div>
      </div>
      <div className="h-2.5 bg-surface rounded-full overflow-hidden border border-line/20 mb-3">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: battery + '%' }} />
      </div>
      <div className="flex items-center gap-2 text-xs text-ink-3">
        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent' : 'bg-surface-2'}`} />
        <span>{isActive ? 'Online' : 'Offline'}</span>
      </div>
    </motion.div>
  )
}
