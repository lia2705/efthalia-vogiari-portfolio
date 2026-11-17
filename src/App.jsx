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
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return
    const update = (event) => setSystemReduced(event.matches)
    if (media.addEventListener) media.addEventListener('change', update)
    else media.addListener(update)
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  }, [])
  const reduced = preference === null ? systemReduced : preference === 'true'
  const { page, target, busy, go, turn, flip, finish } = useBook(last, reduced)
  const toggleMotion = () => {
    if (!reduced && busy) finish()
    const next = String(!reduced)
    setPreference(next)
    try { localStorage.setItem('reduce-motion', next) } catch { /* The choice still works for this visit. */ }
  }

  return (
    <main className="scene" data-reduced-motion={reduced || undefined}>
      <button className="scene__motion" type="button" aria-label="Animations" aria-pressed={!reduced}
        title={reduced ? 'Play animations' : 'Pause animations'} onClick={toggleMotion}>
        <span aria-hidden="true">{reduced ? '▶' : 'Ⅱ'}</span>
      </button>
      <div className="stage">
        <Desk playlist={playlist} notes={notes} />
        <Book pages={pages} chapters={chapters} page={page} target={target}
          onFinish={finish} onGo={go} onFlip={flip} />
      </div>
      <Nav busy={busy} page={page} last={last} chapters={chapters} onTurn={turn} onGo={go} />
    </main>
  )
}
