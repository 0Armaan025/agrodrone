import React from 'react'
import { Bell, Mail, Phone, User, Settings as SettingsIcon, Shield, Rocket, CheckCircle2, AlertCircle, Sparkles, Wrench, Droplets, Sprout, Waves } from 'lucide-react'

const notifications = [
  { id: 1, title: 'Mission #4821 Complete', body: 'Field Alpha spraying finished at 44% coverage.', time: '2 min ago', type: 'success', icon: Shield },
  { id: 2, title: 'Spray Refill Alert', body: 'Tank at 30% — return to base at 50% coverage.', time: '45 min ago', type: 'warning', icon: Shield },
  { id: 3, title: 'New Operator Assigned', body: 'Priya Sharma assigned to DJI Agras T30.', time: '2 hours ago', type: 'info', icon: User },
  { id: 4, title: 'Drone Offline', body: 'XAG P100 Pro lost signal in Field Gamma.', time: '5 hours ago', type: 'error', icon: Shield },
  { id: 5, title: 'Weather Gate Updated', body: 'Wind speed increased to 18 km/h.', time: '1 day ago', type: 'info', icon: Shield },
  { id: 6, title: 'AI Analysis Complete', body: 'Video analysis finished — altitude 24m, coverage 44%. Recommendations ready for review.', time: 'Just now', type: 'success', icon: Sparkles },
  { id: 7, title: 'Recommendation Sent to Operator', body: 'Pesticide: Proceed · Fertilizer: Adjust +2m elevation · Drone: DJI Agras T40.', time: 'Just now', type: 'info', icon: Wrench },
  { id: 8, title: 'Drone Operator Confirmed', body: 'Carlos Mendez acknowledged AI recommendations. Drone adjusting spray elevation.', time: '1 min ago', type: 'success', icon: CheckCircle2 },
]

const recommendationOptions = [
  { key: 'pesticide', label: 'Pesticide Action', desc: 'Proceed — low pest pressure. Spray organic pyrethrin at 15L/ha.', icon: Sprout },
  { key: 'fertilizer', label: 'Fertilizer / Spray', desc: 'Apply N-P-K 12-12-17 + micronutrients. Adjust nozzle elevation.', icon: Waves },
  { key: 'sprayElevation', label: 'Spray Elevation', desc: 'Raise spray nozzle +2m to avoid crop damage.', icon: Droplets },
]

export default function NotificationsScreen() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="section-title">Notifications</h2>
            <p className="section-subtitle">Mission alerts, system updates, operator messages, and AI recommendations.</p>
          </div>
        <button className="px-4 py-2 rounded-xl border border-line bg-surface-2 text-sm text-ink hover:text-ink transition-colors flex items-center gap-2 w-fit">
          <Bell className="w-4 h-4" /> Mark All Read
        </button>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="card p-4 flex gap-3 cursor-pointer hover:bg-accent/5 transition-colors border-accent/20">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === 'success' ? 'bg-accent/10 text-accent' :
                n.type === 'warning' ? 'bg-[#fbbf24]/10 text-[#fbbf24]' :
                n.type === 'error' ? 'bg-red-900/20 text-red-400' : 'bg-surface-2 text-ink-3'
              }`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-ink text-sm">{n.title}</div>
                  {n.id >= 6 && <span className="text-[9px] bg-accent/10 text-accent px-1.5 rounded-full font-bold">AI</span>}
                </div>
                <div className="text-sm text-ink-3 mt-0.5">{n.body}</div>
                <div className="text-[10px] text-ink-3 mt-2">{n.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6 space-y-4">
            <h3 className="font-bold text-lg text-ink">AI Recommendation Status</h3>
            <div className="p-4 rounded-2xl border border-accent/20 bg-accent/5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-bold text-sm text-ink">Analysis Active</span>
              </div>
              <p className="text-xs text-ink-3">AI has processed the latest drone video. Recommendations are ready and have been sent to the operator.</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink-2 uppercase tracking-wider">Selected Actions</h4>
              {recommendationOptions.map((opt) => (
                <div key={opt.key} className="flex items-start gap-3 p-3 rounded-xl border border-line bg-surface-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <opt.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-ink text-sm">{opt.label}</div>
                    <div className="text-[10px] text-ink-3">{opt.desc}</div>
                    <div className="text-[10px] text-accent font-medium mt-1">Sent to Carlos Mendez — Zone 3</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h3 className="font-bold text-lg text-ink">Notification Settings</h3>
            <div className="space-y-4">
              <SettingRow label="Mission Completion" desc="Get notified when a mission finishes" checked />
              <SettingRow label="Low Battery Alerts" desc="Alert when drone battery drops below 20%" checked />
              <SettingRow label="Weather Changes" desc="Notify when weather gate status changes" checked />
              <SettingRow label="Operator Messages" desc="Receive messages from drone operators" checked />
              <SettingRow label="AI Recommendations" desc="Get AI analysis results and suggestions" checked />
              <SettingRow label="System Maintenance" desc="Alerts for scheduled maintenance" />
            </div>
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
        <div className="font-medium text-ink text-sm">{label}</div>
        <div className="text-[10px] text-ink-3">{desc}</div>
      </div>
      <div className={`w-5 h-5 rounded-full border transition-all ${checked ? 'bg-accent border-accent' : 'border-line'}`} />
    </div>
  )
}
