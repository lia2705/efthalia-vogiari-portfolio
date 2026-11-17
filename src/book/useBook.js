import { useCallback, useEffect, useState } from 'react'
import { spreadOf } from './layout.js'

/* The reading position and every way of changing it: previous / next, a click on a page, chapter
   jumps, arrow keys and the URL hash. A move is a request: while one runs, others are ignored,
   and Book calls finish() when its animation ends. */
const fromHash = (last) => Math.min(last, Math.max(0, Number.parseInt(location.hash.slice(1), 10) || 0))

export function useBook(last, reduced) {
  const [reading, setReading] = useState(() => ({ page: fromHash(last), target: fromHash(last) }))
  const go = useCallback((target) => setReading((state) => {
    if (state.page !== state.target) return state
    const next = Math.min(last, Math.max(0, target))
    return reduced ? { page: next, target: next } : { ...state, target: next }
  }), [last, reduced])
  // A turn moves by a spread: to the left page of the next or previous spread.
  const turn = useCallback((direction) => setReading((state) => {
    if (state.page !== state.target) return state
    const spread = spreadOf(state.page)
    const target = direction > 0 ? 2 * spread + 1 : 2 * spread - 3
    const next = Math.min(last, Math.max(0, target))
    return reduced ? { page: next, target: next } : { ...state, target: next }
  }), [last, reduced])
  // A click on the right page turns forward, on the left page back.
  const flip = useCallback((side) => turn(side === 'front' ? 1 : -1), [turn])
  const finish = useCallback(() => setReading((state) => ({ page: state.target, target: state.target })), [])

  useEffect(() => {
    history.replaceState(null, '', reading.page ? `#${reading.page}` : location.pathname)
  }, [reading.page])
  useEffect(() => {
    const onHash = () => go(fromHash(last))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go, last])
  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest('input, textarea, select, [contenteditable]')) return
      const direction = { ArrowRight: 1, ArrowLeft: -1, PageDown: 1, PageUp: -1 }[event.key]
      if (direction) { event.preventDefault(); turn(direction) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn])
  return { ...reading, busy: reading.page !== reading.target, go, turn, flip, finish }
}
