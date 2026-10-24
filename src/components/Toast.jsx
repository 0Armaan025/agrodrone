import React, { useState, useCallback } from 'react'
import { useToast } from './useToast'

export function ToastProvider({ children }) {
  const { toasts, add, remove } = useToast()
  return (
    <>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto animate-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${t.index * 0.1}s` }}>
            <div className={`min-w-[300px] max-w-[400px] rounded-2xl border p-4 shadow-2xl shadow-accent/20 flex items-start gap-3 ${
              t.type === 'success' ? 'bg-surface border-accent/30' :
              t.type === 'error' ? 'bg-red-900/5 border-red-500/30' :
              t.type === 'warning' ? 'bg-[#fbbf24]/5 border-[#fbbf24]/30' :
              'bg-surface border-line'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                t.type === 'success' ? 'bg-accent/10 text-accent' :
                t.type === 'error' ? 'bg-red-900/20 text-red-400' :
                t.type === 'warning' ? 'bg-[#fbbf24]/10 text-[#fbbf24]' :
                'bg-surface-2 text-ink-3'
              }`}>
                {t.type === 'success' && <span className="w-5 h-5">✓</span>}
                {t.type === 'error' && <span className="w-5 h-5">!</span>}
                {t.type === 'warning' && <span className="w-5 h-5">⚠</span>}
                {t.type === 'info' && <span className="w-5 h-5">ℹ</span>}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-ink">{t.title}</div>
                <div className="text-xs text-ink-3 mt-1">{t.message}</div>
              </div>
              <button onClick={() => remove(t.id)} className="text-ink-3 hover:text-accent transition-colors p-1">
                <span className="text-xs">✕</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function useAppToast() {
  const { add } = useToast()
  return {
    toast: add,
  }
}
