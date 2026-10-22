import React, { useState } from 'react'
import { LogIn, UserPlus, Shield, User, Key, Check } from 'lucide-react'

export default function LoginScreen() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('operator')
  const [added, setAdded] = useState(false)

  return (
    <div className="min-h-screen bg-base text-ink flex items-center justify-center px-4 md:px-8 py-10">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-ink tracking-tight mb-2">AgroDrone</h1>
          <p className="text-ink-3 text-sm">Agricultural Drone Mission Control</p>
        </div>

        <div className="card p-6 shadow-card backdrop-blur-sm">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border ${mode === 'login' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.25)]' : 'bg-surface-2 text-ink-2 border-line hover:text-ink'}`}>Sign In</button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border ${mode === 'signup' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.25)]' : 'bg-surface-2 text-ink-2 border-line hover:text-ink'}`}>Sign Up</button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all" />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all" />
            </div>
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink placeholder-ink-3 focus:outline-none focus:border-accent hover:border-line-bright transition-all" />
              </div>
            )}
            {mode === 'signup' && (
              <div className="flex gap-2">
                <button onClick={() => setRole('operator')} className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${role === 'operator' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-surface-2 text-ink-3 border-line hover:text-ink'}`}>Drone Operator</button>
                <button onClick={() => setRole('manager')} className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${role === 'manager' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-surface-2 text-ink-3 border-line hover:text-ink'}`}>Farm Manager</button>
                <button onClick={() => setRole('user')} className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${role === 'user' ? 'bg-accent text-accent-ink border-accent shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-surface-2 text-ink-3 border-line hover:text-ink'}`}>Farmer / User</button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              alert(`Demo mode — ${mode === 'signup' ? 'User registered' : 'Signed in'} as ${mode === 'signup' ? name : 'Demo User'} (${role || 'operator'}). No backend required.`)
            }}
            className="btn-primary w-full"
          >
            <Shield className="w-4 h-4 mr-2" /> {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-line/50">
            <button
              onClick={() => {
                setAdded(true)
                alert('Dummy account created — Carlos Mendez (Drone Operator) · rajesh.patel@agrodrone.io (Farmer) · flyops@2026 (Operator). Use these for quick access.')
              }}
              disabled={added}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              {added ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {added ? 'Dummy Details Added' : 'Add Dummy Details (Single Click)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
