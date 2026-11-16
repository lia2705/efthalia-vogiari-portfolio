/* The book: one sheet per two pages, each sheet two faces, the tabs on the faces. Book.jsx only
   sets facts (--page --target --last --count on .book, data-turning / --order on turning sheets,
   data-cast beside the turn); Book.css plays the turn. A move ends on the book's own animationend. */
import Page from './Page.jsx'
import { spreadOf } from '../book/layout.js'
import './Book.css'

const isCover = (content) => content.type === 'cover' || content.type === 'back'

export default function Book({ pages, chapters, page, target, onFinish, onGo, onFlip }) {
  const last = pages.length - 1
  const sheets = Math.ceil(pages.length / 2)
  const moving = page !== target
  const forward = target > page
  const source = spreadOf(page)
  const destination = spreadOf(target)
  const first = Math.min(source, destination)
  const lastTurning = Math.max(source, destination)
  const count = moving ? lastTurning - first : 0

  return (
    <div className="book" data-turn={moving ? (forward ? 'fwd' : 'back') : undefined}
      style={{ '--page': page, '--target': target, '--last': last, '--count': count }}
      onAnimationEnd={(event) => { if (event.target === event.currentTarget) onFinish() }}>
      {Array.from({ length: sheets }, (_, index) => {
        const turning = moving && index >= first && index < lastTurning
        const flipped = index < source
        const order = turning ? (forward ? index - first : lastTurning - 1 - index) : 0
        const tabs = chapters.filter((chapter) => Math.floor(chapter.page / 2) === index)
        return <div key={index} className="book__sheet" data-turning={turning || undefined}
          style={{ '--rest': `${flipped ? -180 : 0}deg`, '--z': flipped ? index + 1 : sheets - index - 1, '--order': order }}>
          {(index === 0 || index === sheets - 1) && <span className="book__board" aria-hidden="true" />}
          {['front', 'back'].map((side, n) => {
            const content = pages[index * 2 + n]
            if (!content) return null
            // The page facing the reader, or the one a turn uncovers or lands on.
            const exposed = side === 'front'
              ? index === (moving && forward ? destination : source)
              : index === (moving && !forward ? destination : source) - 1
            const under = moving && (forward ? side === 'front' && index === destination : side === 'back' && index === destination - 1)
            const landing = moving && (forward ? side === 'back' && index === source - 1 : side === 'front' && index === source)
            return <div key={side} className={`book__face book__face--${side}`}
              style={content.chapter && { '--paper': `var(--color-page-${content.chapter.note})` }}>
              <div className="book__surface" data-exposed={exposed || turning || undefined}
                data-cover={isCover(content) || undefined}
                data-cast={under ? 'under' : landing ? 'landing' : undefined}
                onClick={(event) => { if (!moving && exposed && !event.target.closest('a, button')) onFlip(side) }}>
                <Page page={content} inert={moving || !exposed} />
              </div>
              {/* The tab is part of the leaf, so it is on both faces; the face turned away is inert. */}
              {tabs.map((chapter) => <button key={chapter.id} className="book__tab" inert={side === (flipped ? 'front' : 'back')}
                style={{ '--tab-paper': `var(--color-page-${chapter.note})`, '--index': chapter.n }}
                onClick={() => onGo(chapter.page)} aria-label={`${chapter.tab} chapter`}
                aria-current={page >= chapter.page && page < chapter.page + chapter.pages.length ? 'page' : undefined}>
                {chapter.tab}
              </button>)}
            </div>
          })}
        </div>
      })}
    </div>
  )
}
