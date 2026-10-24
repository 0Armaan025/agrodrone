import React, { useState } from 'react'
import { Shield, User, Palette, Bell, Globe, Key, Monitor, Database, MapPin, Sparkles } from 'lucide-react'

export default function SettingsScreen() {
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [autoLaunch, setAutoLaunch] = useState(false)
  const [geminiKey, setGeminiKey] = useState('')
  const [mapsKey, setMapsKey] = useState('')
  const [cartoKey, setCartoKey] = useState('')
  const [keySaved, setKeySaved] = useState(false)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="page-header">
        <h2 className="section-title">Settings</h2>
        <p className="section-subtitle">Configure your AgroDrone mission control preferences.</p>
      </div>

      <section className="card animate-in delay-100">
        <h3 className="font-bold text-lg text-ink mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-line bg-surface-2">
            <div className="font-medium text-ink mb-1">Theme</div>
            <div className="text-[10px] text-ink-3 mb-2">Choose between dark and light interface modes</div>
            <div className="flex gap-2">
              {['dark', 'light'].map((t) => (
                <button key={t} onClick={() => setTheme(t)} className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${theme === t ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-3 hover:border-accent/50'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card animate-in delay-200">
        <h3 className="font-bold text-lg text-ink mb-4">Notifications</h3>
        <div className="space-y-4">
          <ToggleRow label="Push Notifications" desc="Receive real-time mission updates on this device" checked={notifications} onChange={() => setNotifications(!notifications)} />
          <ToggleRow label="Email Alerts" desc="Get mission summaries via email" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
          <ToggleRow label="Auto-Launch" desc="Automatically launch when weather is optimal" checked={autoLaunch} onChange={() => setAutoLaunch(!autoLaunch)} />
        </div>
      </section>

      <section className="card animate-in delay-300">
        <h3 className="font-bold text-lg text-ink mb-4">API Keys</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-line bg-surface-2">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-medium text-ink">Gemini API Key</span>
            </div>
            <p className="text-[10px] text-ink-3 mb-2">Used for video AI analysis. Get a free key from Google AI Studio.</p>
            <div className="flex gap-2">
              <input type="password" placeholder="gsk_..." value={geminiKey} onChange={(e) => setGeminiKey(e.target.value)} className="flex-1 input-field text-xs" />
              <button onClick={() => { if (geminiKey.trim()) { setKeySaved(true); setTimeout(() => setKeySaved(false), 2000); } }} className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${keySaved ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-2 hover:text-ink hover:border-accent'}`}>{keySaved ? 'Saved!' : 'Save'}</button>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-line bg-surface-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-medium text-ink">Google Maps API Key</span>
            </div>
            <p className="text-[10px] text-ink-3 mb-2">Used for field mapping, route planning, and geolocation features.</p>
            <div className="flex gap-2">
              <input type="password" placeholder="AIza..." value={mapsKey} onChange={(e) => setMapsKey(e.target.value)} className="flex-1 input-field text-xs" />
              <button onClick={() => { if (mapsKey.trim()) { setKeySaved(true); setTimeout(() => setKeySaved(false), 2000); } }} className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${keySaved ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-2 hover:text-ink hover:border-accent'}`}>{keySaved ? 'Saved!' : 'Save'}</button>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-line bg-surface-2">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-accent" />
              <span className="font-medium text-ink">Carto API Key</span>
            </div>
            <p className="text-[10px] text-ink-3 mb-2">Used for map tiles and basemap rendering in Field Map Planner.</p>
            <div className="flex gap-2">
              <input type="password" placeholder="carto_key..." value={cartoKey} onChange={(e) => setCartoKey(e.target.value)} className="flex-1 input-field text-xs" />
              <button onClick={() => { if (cartoKey.trim()) { setKeySaved(true); setTimeout(() => setKeySaved(false), 2000); } }} className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all ${keySaved ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 border-line text-ink-2 hover:text-ink hover:border-accent'}`}>{keySaved ? 'Saved!' : 'Save'}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="card animate-in delay-400">
        <h3 className="font-bold text-lg text-ink mb-4">Account</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-line bg-surface-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">A</div>
              <div>
                <div className="font-bold text-ink">Demo Operator</div>
                <div className="text-xs text-ink-3">carlos.mendez@agrodrone.io</div>
              </div>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl border border-line text-left text-ink-3 hover:bg-surface-2 transition-colors flex items-center justify-between">
            <span>Sign Out</span>
            <span className="text-ink-3">→</span>
          </button>
        </div>
      </section>

      <section className="card animate-in delay-500">
        <h3 className="font-bold text-lg text-ink mb-4">Data & Export</h3>
        <div className="space-y-3">
          {['Export Mission Data (CSV)', 'Clear Cache', 'Reset to Defaults'].map((label) => (
            <button key={label} className="w-full py-3 rounded-xl border border-line text-left flex items-center justify-between text-ink-3 hover:bg-surface-2 transition-colors">
              <span>{label}</span>
              <span className="text-ink-3">→</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-line bg-surface-2">
      <div>
        <div className="font-medium text-ink">{label}</div>
        <div className="text-[10px] text-ink-3">{desc}</div>
      </div>
      <div className="relative inline-flex w-14 h-7 mr-2">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className={`w-14 h-7 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white transition-all duration-200 ease-in-out focus:outline-none ${checked ? 'bg-accent' : 'bg-surface-2'}`}>
          <span className={`absolute top-1 left-1 ${checked ? 'right-1' : 'left-1'} w-5 h-5 rounded-full bg-white transition-all duration-200`} />
        </div>
      </div>
    </div>
  )
}
