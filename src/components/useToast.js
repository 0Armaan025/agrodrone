import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback(({ title, message, type = 'info' }) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, title, message, type, index: prev.length }])
    setTimeout(() => remove(id), 4000)
    return id
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, add, remove }
}
