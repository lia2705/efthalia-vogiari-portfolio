/* Below the book: one slim row with previous / next, a strip with one segment
   per chapter, and the page count. Segment width follows the chapter's page
   count and fills as you read; segments jump to their chapter. */

import './Nav.css'

export default function Nav({ page, last, chapters, busy, onTurn, onGo }) {
  // The last matching chapter owns the current page, up to the back cover.
  const current = chapters.findLast((c) => c.page <= page && page < last)

  return (
    <nav className="nav" aria-label="Pages">
      <button className="nav__arrow" onClick={() => onTurn(-1)} disabled={busy || page === 0} aria-label="Previous page">
        ←
      </button>
      <ol className="nav__strip">
        {chapters.map((c) => {
          const pages = c.pages.length
          // Width represents chapter length; fill represents progress within it.
          const fill = Math.min(Math.max((page - c.page + 1) / pages, 0), 1)
          return (
            <li key={c.id} style={{ flexGrow: pages, '--fill': fill, '--note': `var(--note-${c.note})` }}>
              <button
                disabled={busy}
                onClick={() => onGo(c.page)}
                aria-current={c === current || undefined}
                aria-label={`${c.title}, page ${c.page}`}
                title={c.title}
              />
            </li>
          )
        })}
      </ol>
      <span className="nav__count" aria-live="polite">{page} / {last}</span>
      <button className="nav__arrow" onClick={() => onTurn(1)} disabled={busy || page === last} aria-label="Next page">
        →
      </button>
    </nav>
  )
}
