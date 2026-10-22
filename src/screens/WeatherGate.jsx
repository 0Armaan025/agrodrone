import React, { useState } from 'react'
import { Sun, Cloud, CloudRain, Wind, Droplets, Shield, Activity, Rocket } from 'lucide-react'

const conditions = [
  { label: 'Wind Speed', value: '12 km/h', limit: '< 25 km/h', status: 'good', icon: Wind },
  { label: 'Temperature', value: '24°C', limit: '5°C – 40°C', status: 'good', icon: Sun },
  { label: 'Precipitation', value: '10%', limit: '< 20%', status: 'warning', icon: CloudRain },
  { label: 'Visibility', value: '10 km', limit: '> 5 km', status: 'good', icon: Droplets },
  { label: 'Humidity', value: '58%', limit: '20% – 90%', status: 'good', icon: Droplets },
  { label: 'Gusts', value: '18 km/h', limit: '< 30 km/h', status: 'good', icon: Activity },
]

export default function WeatherGate() {
  const [autoLaunch, setAutoLaunch] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Weather Gate</h2>
          <p className="text-ink-3">Real-time weather conditions and launch safety checks.</p>
        </div>
        <button className="px-4 py-2 rounded-xl border border-line bg-surface-2 text-sm text-ink hover:text-ink transition-colors flex items-center gap-2">
          <Shield className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      <div className="rounded-3xl border border-line bg-gradient-to-r from-surface-2 to-surface p-6 shadow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="font-bold text-ink text-lg">Launch Authorized</span>
            </div>
            <p className="text-ink-3">All weather parameters are within safe operating limits.</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-ink-3 uppercase tracking-wider">Next Window</div>
            <div className="text-2xl font-bold text-ink font-mono">23:11 UTC</div>
            <div className="text-xs text-ink-3 mt-1">21/10/2026</div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-ink">Auto-Launch Mode</h3>
            <p className="text-sm text-ink-3">Automatically launch when weather conditions are optimal.</p>
          </div>
          <div className="relative inline-flex w-14 h-7 mr-2">
            <input type="checkbox" checked={autoLaunch} onChange={() => setAutoLaunch(!autoLaunch)} className="sr-only peer" />
            <div className={`w-14 h-7 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white transition-all duration-200 ease-in-out focus:outline-none ${autoLaunch ? 'bg-accent' : 'bg-surface-2'}`}>
              <span className={`absolute top-1 left-1 ${autoLaunch ? 'right-1' : 'left-1'} w-5 h-5 rounded-full bg-white transition-all duration-200`} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {conditions.map((c) => {
          const good = c.status === 'good'
          return (
            <div key={c.label} className={`card text-center ${good ? 'border-accent/20' : 'border-[#fbbf24]/30'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${good ? 'bg-accent/10 text-accent' : 'bg-[#fbbf24]/10 text-[#fbbf24]'}`}>
                <c.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold font-mono text-ink">{c.value}</div>
              <div className="text-[10px] text-ink-3 uppercase tracking-wider mb-1">{c.label}</div>
              <div className={`text-xs font-medium ${good ? 'text-accent' : 'text-[#fbbf24]'}`}>{c.limit}</div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h3 className="font-bold text-lg text-ink mb-4">7-Day Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 3 ? 'bg-accent/10 text-accent border border-accent/30' : 'bg-surface-2 text-ink-3 border border-line'}`}>
                {i === 0 ? <Sun className="w-4 h-4" /> : i === 1 ? <Cloud className="w-4 h-4" /> : i === 2 ? <CloudRain className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div className="text-xs font-medium text-ink">{day}</div>
              <div className="text-[10px] text-ink-3">{i === 0 ? '24°C' : i === 1 ? '22°C' : i === 2 ? '19°C' : '25°C'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
