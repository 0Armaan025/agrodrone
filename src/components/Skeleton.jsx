import React from 'react'

export function Skeleton({ className = '', h = '1rem', w = '100%', radius = 'rounded-xl' }) {
  return (
    <div
      className={`animate-pulse ${radius} ${className}`}
      style={{ height: h, width: w }}
    />
  )
}

export function SkeletonCard({ h = 'h-48', w = 'w-full' }) {
  return (
    <div className={`${h} ${w} bg-surface rounded-3xl border border-line animate-pulse`} />
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} h="h-5" w={i === lines - 1 ? 'w-2/3' : 'w-full'} />
      ))}
    </div>
  )
}
