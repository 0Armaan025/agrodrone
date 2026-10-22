import React from 'react'
import { Bell, Mail, Phone, User, Settings as SettingsIcon, Shield, Rocket } from 'lucide-react'

const notifications = [
  { id: 1, title: 'Mission #4821 Complete', body: 'Field Alpha spraying finished at 44% coverage.', time: '2 min ago', type: 'success', icon: Shield },
  { id: 2, title: 'Spray Refill Alert', body: 'Tank at 30% — return to base at 50% coverage.', time: '45 min ago', type: 'warning', icon: Shield },
  { id: 3, title: 'New Operator Assigned', body: 'Priya Sharma assigned to DJI Agras T30.', time: '2 hours ago', type: 'info', icon: User },
  { id: 4, title: 'Drone Offline', body: 'XAG P100 Pro lost signal in Field Gamma.', time: '5 hours ago', type: 'error', icon: Shield },
  { id: 5, title: 'Weather Gate Updated', body: 'Wind speed increased to 18 km/h.', time: '1 day ago', type: 'info', icon: Shield },
]

export default function NotificationsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Notifications</h2>
          <p className="text-ink-3">Mission alerts, system updates, and operator messages.</p>
        </div>
        <button className="px-4 py-2 rounded-xl border border-line bg-surface-2 text-sm text-ink hover:text-ink transition-colors flex items-center gap-2">
          <Bell className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="card p-4 flex gap-3 cursor-pointer hover:bg-accent/5 transition-colors border-accent/20">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${n.type === 'success' ? 'bg-accent/10 text-accent' : n.type === 'warning' ? 'bg-[#fbbf24]/10 text-[#fbbf24]' : 'bg-surface-2 text-ink-3'}`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-ink">{n.title}</div>
                <div className="text-sm text-ink-3 mt-0.5">{n.body}</div>
                <div className="text-[10px] text-ink-3 mt-2">{n.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 card p-6 space-y-6">
          <h3 className="font-bold text-lg text-ink">Notification Settings</h3>
          <div className="space-y-4">
            <SettingRow label="Mission Completion" desc="Get notified when a mission finishes" checked />
            <SettingRow label="Low Battery Alerts" desc="Alert when drone battery drops below 20%" checked />
            <SettingRow label="Weather Changes" desc="Notify when weather gate status changes" checked />
            <SettingRow label="Operator Messages" desc="Receive messages from drone operators" />
            <SettingRow label="System Maintenance" desc="Alerts for scheduled maintenance" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingRow({ label, desc, checked }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-line bg-surface-2 cursor-pointer hover:border-accent/50 transition-colors">
      <div>
        <div className="font-medium text-ink">{label}</div>
        <div className="text-[10px] text-ink-3">{desc}</div>
      </div>
      <div className={`w-5 h-5 rounded-full border transition-all ${checked ? 'bg-accent border-accent' : 'border-line'}`} />
    </div>
  )
}
