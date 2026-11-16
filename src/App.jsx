/* Composition only: content -> layout -> reading state -> desk, book and nav. */

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
  const { page, target, busy, go, turn, flip, finish } = useBook(last)

  return (
    <main className="scene">
      <div className="stage">
        <Desk playlist={playlist} notes={notes} />
        <Book pages={pages} chapters={chapters} page={page} target={target}
          onFinish={finish} onGo={go} onFlip={flip} />
      </div>
      <Nav busy={busy} page={page} last={last} chapters={chapters} onTurn={turn} onGo={go} />
    </main>
  )
}
