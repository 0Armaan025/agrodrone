import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Compass, MapPin, Rocket, Monitor,
  Activity, BarChart3, Zap, Shield, Bell, Settings,
  Leaf, RefreshCw, Users, MessageCircle, Key, User, LogIn, UserPlus, Check
} from 'lucide-react'

import Dashboard from './screens/Dashboard'
import MapPlanner from './screens/MapPlanner'
import ConfigureWizard from './screens/ConfigureWizard'
import FleetHealth from './screens/FleetHealth'
import WeatherGate from './screens/WeatherGate'
import Reports from './screens/Reports'
import VideoUploadAI from './screens/VideoUploadAI'
import NotificationsScreen from './screens/Notifications'
import SettingsScreen from './screens/Settings'
import LoginScreen from './screens/Login'

const NAV = [
  { key: 'dashboard', label: 'Mission Control', icon: LayoutDashboard, path: '/' },
  { key: 'map', label: 'Field Map', icon: Compass, path: '/map' },
  { key: 'configure', label: 'Configure Mission', icon: Rocket, path: '/configure' },
  { key: 'fleet', label: 'Fleet Health', icon: Monitor, path: '/fleet' },
  { key: 'weather', label: 'Weather Gate', icon: Activity, path: '/weather' },
  { key: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
  { key: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
  { key: 'video-ai', label: 'Video → AI Stats', icon: Zap, path: '/video-ai' },
  { key: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

function AppLayout() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()
  const activeKey = location.pathname === '/' ? 'dashboard' : (location.pathname.slice(1) || 'dashboard')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.className = theme === 'dark' ? 'dark' : 'light'
  }, [theme])

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden selection:bg-accent selection:text-ink ${theme === 'light' ? 'bg-[#f7f6f0] text-[#1a271a]' : 'bg-base text-ink'}`}>
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface/90 backdrop-blur border-b border-line/50 flex items-center justify-between px-4">
        <span className="font-extrabold text-ink text-sm">AgroDrone</span>
        <span className="text-[10px] text-ink-3">Mission Control</span>
      </header>

      <nav className="hidden md:flex fixed inset-y-0 left-0 w-72 z-30 border-r border-line/50 bg-surface/90 backdrop-blur-md flex-col shadow-[4px_0_40px_-12px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-6 border-b border-line/50">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.25)] border border-accent/20">
              <Leaf className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="font-extrabold text-ink text-xl tracking-tight leading-none">AgroDrone</h1>
              <p className="text-[11px] text-ink-3 mt-0.5 font-medium tracking-wide">Mission Control</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  activeKey === item.key ? 'bg-accent text-accent-ink shadow-[0_0_20px_rgba(74,222,128,0.25)]' : 'text-ink-3 hover:text-ink hover:bg-surface-2'
                }`}
                onClick={() => setOpen(false)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  activeKey === item.key ? 'bg-accent/20 border-accent/40 text-accent-ink' : 'bg-surface-2 border-line/30 group-hover:border-accent/30'
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="px-4 py-5 border-t border-line/50">
            <div className="bg-gradient-to-br from-surface-2 to-surface rounded-2xl border border-line/50 p-4 shadow-inner">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                <span className="text-[10px] font-extrabold text-accent uppercase tracking-[0.15em]">Live</span>
              </div>
              <p className="text-[11px] text-ink-2 leading-relaxed">Botanical Garden theme · Full web size · Video AI analysis · 9 mission screens.</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="md:ml-72 min-h-screen pb-16 md:pb-0">
        <div className="px-4 md:px-10 py-6 md:py-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapPlanner />} />
            <Route path="/configure" element={<ConfigureWizard />} />
            <Route path="/fleet" element={<FleetHealth />} />
            <Route path="/weather" element={<WeatherGate />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/messages" element={<Reports />} />
            <Route path="/history" element={<Reports />} />
            <Route path="/video-ai" element={<VideoUploadAI />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
