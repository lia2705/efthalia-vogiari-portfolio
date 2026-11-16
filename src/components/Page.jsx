/* One page of the book. `page.type` (set in content/book.js) picks a layout.
   Each layout shows one page heading (h2) at most, with nothing stacked above it.
   Photos are prints taped in, scrapbook style. */

import { memo, useState } from 'react'
import './Page.css'
import de from '../assets/flags/de.svg'
import gr from '../assets/flags/gr.svg'
import gb from '../assets/flags/gb.svg'
import es from '../assets/flags/es.svg'

// Lia's eight-point star, from her Canva portfolio, stamped on the covers.
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 ? 33 : 48
  const a = (i * Math.PI) / 8
  return `${50 + r * Math.sin(a)},${50 - r * Math.cos(a)}`
}).join(' ')

const Star = () => (
  <svg className="star" viewBox="0 0 100 100" aria-hidden="true">
    <polygon points={STAR_POINTS} />
  </svg>
)

// Small flags for the language list; the flag colours are part of each image.
const FLAGS = { de, gr, gb, es }

const Flag = ({ code }) => <img className="flag" src={FLAGS[code]} alt="" />

// Eager loading starts image requests before their persistent sheets are exposed, and each image
// is decoded as soon as it arrives: pages stay hidden until they show, and a hidden image would
// otherwise be decoded only once it is on screen, leaving a blank print mid-turn.
// The image wrapper clips the crop without clipping the tape or caption.
// The print's width/height is a fact about the image: CSS sizes the frame from it, so a print is as
// tall as its image needs, in whole rows, and the page text keeps its place on the ruled lines.
function Photo({ src, alt, caption }) {
  const [ratio, setRatio] = useState()
  const ready = (img) => {
    if (!img?.naturalWidth) return
    setRatio(img.naturalWidth / img.naturalHeight)
    img.decode()
  }
  return (
    <figure className="photo" style={ratio && { '--print-ratio': ratio }}>
      <div className="photo__image">
        <img ref={ready} onLoad={(e) => ready(e.currentTarget)} src={src} alt={alt} loading="eager" decoding="async" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

const Photos = ({ items }) => (
  <div className="photos" data-count={items.length}>
    {items.map((p) => <Photo key={p.src} {...p} />)}
  </div>
)

// Page types select presentation only; all copy and media live in content/book.js.
const layouts = {
  cover: ({ name, line }) => (
    <>
      <div className="cover-label">
        <Star />
        <h1 className="cover-label__name">{name.map((part) => <span key={part}>{part}</span>)}</h1>
        <p className="cover-label__line">{line}</p>
      </div>
      <span className="band" />
    </>
  ),

  // The blank paper glued inside a cover.
  endpaper: () => null,

  back: ({ line }) => (
    <div className="cover-label">
      <p className="cover-label__line">{line}</p>
    </div>
  ),

  about: ({ title, photo, bullets }) => (
    <>
      <h2 className="title">{title}</h2>
      <Photos items={[photo]} />
      <ul className="bullets">{bullets.map((b) => <li key={b}>{b}</li>)}</ul>
    </>
  ),

  timeline: ({ title, items }) => (
    <>
      <h2 className="title">{title}</h2>
      <ol className="timeline">
        {items.map(({ when, what, where, note, detail, kind, now }, n) => (
          <li
            key={when + what}
            className="timeline__item"
            data-kind={kind}
            data-now={now || undefined}
            style={{ gridRow: n + 1 }}
          >
            <span className="timeline__when">{when}</span>
            <span className="timeline__dot" />
            <span className="timeline__body">
              <strong>{what}</strong>
              <span className="timeline__where">
                {where}
                {note && `, ${note}`}
                {detail && <span className="timeline__detail">{detail}</span>}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="timeline__key" aria-hidden="true">
        <i data-kind="study" /> studies <i data-kind="work" /> work <i data-now /> now
      </p>
    </>
  ),

  project: ({ title, line, photos, bullets, role, tools }) => (
    <>
      <h2 className="title">{title}</h2>
      <p className="line">{line}</p>
      <Photos items={photos} />
      <dl className="facts">
        {bullets.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
      </dl>
      <dl className="facts facts--meta">
        <div><dt>Role</dt><dd>{role}</dd></div>
        <div><dt>Tools</dt><dd>{tools}</dd></div>
      </dl>
    </>
  ),

  // Shared by the facing pages of longer case studies: evidence first,
  // followed by concise steps and an optional study limitation.
  process: ({ title, line, description, photos, steps, note }) => (
    <>
      {title && <h2 className="title">{title}</h2>}
      {line && <p className="line">{line}</p>}
      {description && <p className="process__description">{description}</p>}
      {photos?.length > 0 && <Photos items={photos} />}
      {steps?.length > 0 && <ol className="process">
        {steps.map(([label, text]) => <li key={label}><strong>{label}</strong><span>{text}</span></li>)}
      </ol>}
      {note && <p className="process__note">{note}</p>}
    </>
  ),

  gallery: ({ title, groups }) => (
    <>
      <h2 className="title">{title}</h2>
      {groups.map((g) => (
        <section key={g.line} className="group">
          {g.line && <p className="line">{g.line}</p>}
          <Photos items={g.photos} />
        </section>
      ))}
    </>
  ),

  skills: ({ title, groups, languages }) => (
    <>
      <h2 className="title">{title}</h2>
      {groups.map(([label, chips]) => (
        <section key={label} className="group">
          <h3 className="label">{label}</h3>
          <ul className="chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
      ))}
      <section className="group">
        <h3 className="label">Languages</h3>
        <ul className="languages">
          {languages.map(([code, name, level]) => (
            <li key={code}><Flag code={code} />{name} <span>{level}</span></li>
          ))}
        </ul>
      </section>
    </>
  ),

  contact: ({ title, email, links }) => (
    <>
      <h2 className="title title--big">{title}</h2>
      <a className="email" href={`mailto:${email}`}>{email}</a>
      <ul className="links">
        {links.map(([label, href]) => (
          <li key={label}><a href={href} target="_blank" rel="noreferrer">{label} ↗</a></li>
        ))}
      </ul>
    </>
  ),
}

// Sheets stay mounted during navigation; memo avoids rerendering unchanged pages.
// Inactive pages are inert so hidden links cannot receive keyboard focus.
const Page = memo(function Page({ page, inert }) {
  const Layout = layouts[page.type]
  const side = page.folio % 2 ? 'right' : 'left'
  return (
    <article
      className={`page page--${page.type}`}
      data-side={side}
      data-open={!inert || undefined}
      style={page.chapter && { '--chapter': `var(--note-${page.chapter.note})` }}
      inert={inert}
    >
      <Layout {...page} />
      {page.folio > 0 && <span className="folio">{page.folio}</span>}
    </article>
  )
})

export default Page
