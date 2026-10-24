import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, Compass, MapPin, Rocket, Monitor,
  Activity, BarChart3, Zap, Shield, Bell, Settings,
  Leaf, RefreshCw, Users, MessageCircle, Key, User, LogIn, UserPlus, Check, Menu, X
} from 'lucide-react'
import { ToastProvider } from './components/Toast'

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
      <ToastProvider>
        <AppLayout />
      </ToastProvider>
    </Router>
  )
}

function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()
  const activeKey = location.pathname === '/' ? 'dashboard' : (location.pathname.slice(1) || 'dashboard')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.className = theme === 'dark' ? 'dark' : 'light'
  }, [theme])

  return (
    <div className={`relative min-h-screen font-sans overflow-x-hidden selection:bg-accent selection:text-accent-ink ${theme === 'light' ? 'bg-[#f7f6f0] text-[#1a271a]' : 'bg-base text-ink'}`}>
      {/* Desktop header + sidebar */}
      <div className="hidden md:flex h-screen">
        <nav className="fixed inset-y-0 left-0 z-30 w-72 border-r border-line/50 bg-surface/90 backdrop-blur-md flex-col shadow-[4px_0_40px_-12px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 px-6 py-7 border-b border-line/50">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shadow-[0_0_25px_rgba(74,222,128,0.25)] border border-accent/20">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="font-extrabold text-ink text-xl tracking-tight leading-none">AgroDrone</h1>
                <p className="text-[10px] text-ink-3 mt-0.5 font-medium tracking-wide uppercase">Mission Control</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group ${
                    activeKey === item.key ? 'bg-accent text-accent-ink shadow-[0_0_20px_rgba(74,222,128,0.25)]' : 'text-ink-3 hover:text-ink hover:bg-surface-2'
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    activeKey === item.key ? 'bg-accent/20 border-accent/40 text-accent-ink' : 'bg-surface-2 border-line/30 group-hover:border-accent/30'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="px-4 py-5 border-t border-line/50">
              <div className="bg-surface-2 rounded-2xl border border-line/50 p-4 shadow-inner">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                  <span className="text-[10px] font-extrabold text-accent uppercase tracking-[0.15em]">Live</span>
                </div>
                <p className="text-[10px] text-ink-2 leading-relaxed">Botanical Garden theme · Video AI analysis · 9 mission screens.</p>
              </div>
            </div>
          </div>
        </nav>

        <main className="md:ml-72 min-h-screen pb-20 md:pb-0">
          <div className="px-6 md:px-10 py-8 md:py-12 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="min-h-screen"
              >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface/95 backdrop-blur-xl border-b border-line/50 flex items-center justify-between px-4 shadow-sm">
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 -ml-2 rounded-xl hover:bg-surface-2 transition-colors">
          {mobileNavOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
        </button>
        <span className="font-extrabold text-ink text-base tracking-tight">AgroDrone</span>
        <span className="text-[10px] text-ink-3 font-medium tracking-wide uppercase">Mission Control</span>
      </header>

      {/* Mobile overlay sidebar */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute left-0 top-14 bottom-0 w-72 bg-surface/98 backdrop-blur-xl border-r border-line/50 shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-line/50">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.25)] border border-accent/20">
                <Leaf className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h1 className="font-extrabold text-ink text-base leading-none">AgroDrone</h1>
                <p className="text-[10px] text-ink-3 mt-0.5">Mission Control</p>
              </div>
            </div>
            <div className="py-3 px-2 space-y-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeKey === item.key ? 'bg-accent text-accent-ink shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'text-ink-3 hover:text-ink hover:bg-surface-2'
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    activeKey === item.key ? 'bg-accent/20 border-accent/40 text-accent-ink' : 'bg-surface-2 border-line/30'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-surface/95 backdrop-blur-xl border-t border-line/50 flex items-center justify-around px-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]">
        {NAV.slice(0, 5).map((item) => (
          <Link key={item.key} to={item.path} className={`flex flex-col items-center gap-0.5 min-w-0 px-2 py-1 rounded-xl transition-all ${activeKey === item.key ? 'text-accent scale-105' : 'text-ink-3 hover:text-ink'}`}>
            <item.icon className={`w-5 h-5 ${activeKey === item.key ? 'text-accent' : 'text-ink-3'}`} />
            <span className={`text-[9px] font-semibold leading-none ${activeKey === item.key ? 'text-accent' : 'text-ink-3'}`}>{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile main */}
      <main className="md:hidden min-h-screen pb-20 md:pb-0 pt-14">
        <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="min-h-screen"
            >
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
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
