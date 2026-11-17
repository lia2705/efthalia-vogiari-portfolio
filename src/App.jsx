/* Composition only: content -> layout -> reading state -> desk, book and nav. */

import { useEffect, useState } from 'react'
import { book } from './content/book.js'
import { playlist, notes } from './content/desk.js'
import { layout } from './book/layout.js'
import { useBook } from './book/useBook.js'
import Desk from './components/Desk.jsx'
import Book from './components/Book.jsx'
import Nav from './components/Nav.jsx'
import './App.css'

// Content is static, so build page and chapter indexes once, not on each turn.
const { pages, chapters, last } = layout(book)

export default function App() {
  const [preference, setPreference] = useState(() => {
    try { return localStorage.getItem('reduce-motion') } catch { return null }
  })
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (event) => setSystemReduced(event.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const reduced = preference === null ? systemReduced : preference === 'true'
  const toggleMotion = () => {
    const next = String(!reduced)
    setPreference(next)
    try { localStorage.setItem('reduce-motion', next) } catch { /* The choice still works for this visit. */ }
  }
  const { page, target, busy, go, turn, flip, finish } = useBook(last, reduced)

  return (
    <main className="scene" data-reduced-motion={reduced || undefined}>
      <div className="stage">
        <Desk playlist={playlist} notes={notes} />
        <Book pages={pages} chapters={chapters} page={page} target={target}
          onFinish={finish} onGo={go} onFlip={flip} />
      </div>
      <Nav reduced={reduced} onToggleMotion={toggleMotion} busy={busy} page={page} last={last} chapters={chapters} onTurn={turn} onGo={go} />
    </main>
  )
}
