import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Shield, User, Key, Check, Sparkles, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('operator')
  const [added, setAdded] = useState(false)

  const fillDummy = (targetRole = 'operator') => {
    setAdded(true)
    if (mode === 'signup') {
      setName('Carlos Mendez')
      setEmail('carlos.mendez@agrodrone.io')
      setPassword('flyops@2026')
      setRole(targetRole)
    } else {
      setEmail('rajesh.patel@agrodrone.io')
      setPassword('flyops@2026')
    }
  }

  return (
    <div className="min-h-screen bg-base text-ink flex items-center justify-center px-4 md:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center mb-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(74,222,128,0.3)] border border-accent/20">
            <Leaf className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-extrabold text-ink tracking-tight mb-2">AgroDrone</h1>
          <p className="text-ink-3 text-sm">Agricultural Drone Mission Control</p>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          className="card-glass p-6 md:p-8 shadow-card"
        >
          <div className="flex gap-2 mb-6">
            <button onClick={() => { setMode('login'); setAdded(false); }} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${mode === 'login' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-surface-2 text-ink-2 border-line hover:text-ink'}`}>Sign In</button>
            <button onClick={() => { setMode('signup'); setAdded(false); }} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${mode === 'signup' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-surface-2 text-ink-2 border-line hover:text-ink'}`}>Sign Up</button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all"
              />
            </div>
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all"
                />
              </div>
            )}
            {mode === 'signup' && (
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'operator', label: 'Operator' },
                  { key: 'manager', label: 'Manager' },
                  { key: 'user', label: 'Farmer' },
                ].map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`flex-1 min-w-[80px] py-2 rounded-xl border text-xs font-bold transition-all ${role === r.key ? 'bg-accent text-accent-ink border-accent shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-surface-2 text-ink-3 border-line hover:text-ink hover:border-line-bright'}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => { navigate('/dashboard') }}
            className="btn-primary w-full mt-6"
          >
            <Shield className="w-4 h-4 mr-2" /> {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>

          <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-line/50">
            <button
              onClick={() => {
                fillDummy('operator')
                navigate('/dashboard')
              }}
              disabled={added}
              className={`w-full py-3.5 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${added ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-surface-2 border-line text-ink-2 hover:text-ink hover:border-accent hover:shadow-[0_0_10px_rgba(74,222,128,0.1)]'}`}
            >
              {added ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              {added ? 'Dummy Details Filled!' : 'Auto-Fill Demo Account (Single Click)'}
            </button>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => { fillDummy('operator'); navigate('/dashboard'); }} className="flex-1 py-2.5 rounded-lg border border-line bg-surface-2 text-[11px] text-ink-3 hover:text-ink hover:border-accent transition-all">Operator</button>
              <button onClick={() => { fillDummy('manager'); navigate('/dashboard'); }} className="flex-1 py-2.5 rounded-lg border border-line bg-surface-2 text-[11px] text-ink-3 hover:text-ink hover:border-accent transition-all">Manager</button>
              <button onClick={() => { setMode('signup'); fillDummy('user'); navigate('/dashboard'); }} className="flex-1 py-2.5 rounded-lg border border-line bg-surface-2 text-[11px] text-ink-3 hover:text-ink hover:border-accent transition-all">Farmer</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
