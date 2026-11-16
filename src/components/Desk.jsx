/* The desk around the book, in a cartoon style: ink outlines, three tones per object
   (base, shade, light) lit from the top left, and one shadow direction for everything.
   Objects: a coffee with steam and latte art, a pen, two sticky notes with a paperclip,
   a music player with wired earbuds, an open bag of chips, and a curled-up cat.

   Contract (see Desk.css):
   - Art is static SVG. Anything that moves is an HTML element or an <svg> root, and moves
     only by translate, rotate, scale or opacity, so the browser never repaints it per frame.
   - Two toys: the player skips to the next song (and advances by itself when the progress
     bar fills), the cat swishes its tail when the pointer touches it. */

import { useState } from 'react'
import './Desk.css'

const HEART = 'M50 74 C34 63 30 50 42 45 C47 43 50 47 50 52 C50 47 53 43 58 45 C70 50 66 63 50 74 Z'
const SWIRL = 'M50 24 C34 24 24 36 26 50 M74 50 C74 64 64 74 52 76'
// One steam wisp: a soft ribbon, wide at the base, curling thinner toward the top.
const WISP = 'M14 120 C-6 94 30 78 14 54 C2 36 22 18 18 2 C36 18 40 38 30 56 C46 80 22 98 38 120 Z'
// Earphone cable from the jack on top of the player (118,118) through one
// lazy loop to a splitter (96,40), then to the end of each earbud's stem.
const CABLE = 'M118 118 C118 92 168 96 160 64 C154 40 118 44 126 66 C132 82 170 70 150 40 C138 22 108 26 96 40 M96 40 C86 52 74 64 60 64 M96 40 C96 28 86 18 72 16'
const EARBUDS = [
  { stem: 'M60 64 L45 53', head: [40, 50] },
  { stem: 'M72 16 L55 11', head: [50, 10] },
]
const CLIP = 'M12 62 V22 a9 9 0 0 1 18 0 V68 a14 14 0 0 1 -28 0 V30'

const Coffee = () => (
  <div className="coffee">
    <span className="coffee__ring" />
    <svg className="coffee__cup" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="brew" cx="42%" cy="38%">
          <stop offset="0" className="coffee__brew-light" />
          <stop offset="1" className="coffee__brew-dark" />
        </radialGradient>
        <clipPath id="saucer"><circle cx="100" cy="100" r="95" /></clipPath>
        <clipPath id="cup"><circle cx="100" cy="100" r="60" /></clipPath>
      </defs>
      <circle className="coffee__china" cx="100" cy="100" r="95" />
      <g clipPath="url(#saucer)">
        <circle className="coffee__shade" cx="128" cy="130" r="95" />
        <path className="coffee__light" d="M26 70 A80 80 0 0 1 80 22" />
      </g>
      <circle className="coffee__ink" cx="100" cy="100" r="95" />
      <circle className="coffee__rim" cx="100" cy="100" r="79" />
      <rect className="coffee__china coffee__ink" x="146" y="88" width="48" height="24" rx="12" />
      <path className="coffee__shade" d="M152 106 H190 a10 8 0 0 1 -10 6 H156 Z" />
      <circle className="coffee__china" cx="100" cy="100" r="60" />
      <g clipPath="url(#cup)">
        <circle className="coffee__shade" cx="122" cy="122" r="62" />
        <path className="coffee__light" d="M52 78 A52 52 0 0 1 86 50" />
      </g>
      <circle className="coffee__ink" cx="100" cy="100" r="60" />
      <circle className="coffee__brew" cx="100" cy="100" r="50" fill="url(#brew)" />
    </svg>
    <svg className="coffee__art" viewBox="0 0 100 100" aria-hidden="true">
      <path d={HEART} />
      <path className="coffee__swirl" d={SWIRL} />
    </svg>
    <span className="coffee__steam" aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <span key={k} className="coffee__wisp" style={{ '--k': k }}>
          <svg viewBox="0 0 50 120">
            {k === 0 && (
              <linearGradient id="steam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" className="coffee__steam-stop" stopOpacity="0" />
                <stop offset="0.25" className="coffee__steam-stop" stopOpacity="0.95" />
                <stop offset="1" className="coffee__steam-stop" stopOpacity="0" />
              </linearGradient>
            )}
            <path d={WISP} fill="url(#steam)" />
          </svg>
        </span>
      ))}
    </span>
  </div>
)

const Pen = () => (
  <svg className="pen" viewBox="0 0 420 34" aria-hidden="true">
    <path className="pen__metal" d="M44 9 L4 17 L44 25 Z" />
    <path className="pen__metal-shade" d="M44 17 L4 17 L44 25 Z" />
    <rect className="pen__body" x="42" y="6" width="340" height="22" rx="11" />
    <path className="pen__shade" d="M52 20 H372 a9 9 0 0 1 -9 8 H62 a9 9 0 0 1 -10 -8 Z" />
    <rect className="pen__light" x="64" y="10" width="290" height="3.6" rx="1.8" />
    <rect className="pen__metal" x="300" y="-1" width="82" height="8" rx="4" />
    <rect className="pen__metal-light" x="304" y="0.5" width="70" height="2.2" rx="1.1" />
    <path className="pen__cap" d="M368 10 h18 a5 5 0 0 1 0 10 h-18" />
  </svg>
)

const Clip = ({ className }) => (
  <svg className={`clip ${className}`} viewBox="0 0 40 90" aria-hidden="true">
    <path className="clip__edge" d={CLIP} />
    <path className="clip__wire" d={CLIP} />
  </svg>
)

const Notes = ({ notes }) => (
  <div className="postits" aria-hidden="true">
    {notes.map(({ title, mark, items }) => (
      <div key={title} className="postit">
        <p className="postit__title">{title}</p>
        <ul className="postit__list">{items.map((item) => <li key={item}>{mark} {item}</li>)}</ul>
      </div>
    ))}
    <Clip className="postits__clip" />
  </div>
)

const CHIPS = [[84, 56, 19, -15], [122, 52, 21, 12], [154, 60, 15, 0]]
const Chip = ({ x, y, r, angle }) => (
  <g transform={`rotate(${angle} ${x} ${y})`}>
    <ellipse className="snack__chip" cx={x} cy={y} rx={r} ry={r * 0.66} />
    <path className="snack__ridge" d={`M${x - r * 0.6} ${y - 1} q${r * 0.3} -4 ${r * 0.6} 0 t${r * 0.6} 0`} />
    <ellipse className="snack__glint" cx={x - r * 0.3} cy={y - r * 0.25} rx={r * 0.28} ry={r * 0.1} />
  </g>
)

// An open bag of chips peeking in at the bottom-left corner, one chip fallen out.
const Snack = () => (
  <div className="snack" aria-hidden="true">
    <svg className="snack__bag" viewBox="0 0 240 300">
      <path className="snack__foil" d="M30 56 L196 56 L212 288 L16 288 Z" />
      <path className="snack__shade" d="M150 56 L196 56 L212 288 L170 288 Z" />
      <path className="snack__crinkle" d="M158 80 l10 14 l-10 14 l10 14 l-10 14 M178 80 l8 16 l-8 16 l8 16" />
      <path className="snack__light" d="M46 84 L40 250" />
      <path className="snack__ink" d="M30 56 L196 56 L212 288 L16 288 Z" />
      <path className="snack__foil snack__ink" d="M30 56 l10 -20 l10 20 l10 -20 l10 20 l10 -20 l10 20 l10 -20 l10 20 l10 -20 l10 20 l10 -20 l10 20 l10 -20 l10 20 l6 -14" />
      <path className="snack__shade" d="M150 56 l10 -20 l10 20 l10 -20 l10 20 l6 -14 l-4 14 Z" />
      <ellipse className="snack__mouth" cx="113" cy="62" rx="78" ry="14" />
      {CHIPS.map(([x, y, r, angle]) => <Chip key={x} x={x} y={y} r={r} angle={angle} />)}
      <g transform="rotate(-4 114 170)">
        <rect className="snack__label" x="32" y="138" width="164" height="66" rx="8" />
        <path className="snack__label-shade" d="M32 192 h164 v4 a8 8 0 0 1 -8 8 h-148 a8 8 0 0 1 -8 -8 z" />
        <text className="snack__text" x="114" y="184" textAnchor="middle">chips!</text>
      </g>
    </svg>
    <svg className="snack__loose" viewBox="0 0 50 40">
      <Chip x={25} y={20} r={17} angle={-20} />
    </svg>
  </div>
)

// A visual playlist, not an audio player. The progress bar fills over one track length;
// when it ends, or on a click, the next song shows. key={track} restarts the bar.
function Music({ playlist }) {
  const [track, setTrack] = useState(0)
  const next = () => setTrack((t) => (t + 1) % playlist.length)
  const song = playlist[track]
  return (
    <button className="music" onClick={next} aria-label={`Playing ${song.title} by ${song.artist}. Next song`}>
      <svg className="earphones" viewBox="0 0 220 252" aria-hidden="true">
        <path className="earphones__edge" d={CABLE} />
        <path className="earphones__cable" d={CABLE} />
        <rect className="earphones__part" x="113" y="114" width="10" height="16" rx="2" />
        <circle className="earphones__part" cx="96" cy="40" r="4" />
        {EARBUDS.map(({ stem, head: [x, y] }) => (
          <g key={stem}>
            <path className="earphones__edge earphones__stem" d={stem} />
            <path className="earphones__cable earphones__stem" d={stem} />
            <circle className="earphones__part" cx={x} cy={y} r="11" />
          </g>
        ))}
      </svg>
      <span className="music__screen">
        <span className="music__eq">{[0, 1, 2, 3, 4].map((n) => <i key={n} style={{ '--n': n }} />)}</span>
        <span className="music__title">{song.title}</span>
        <span className="music__artist">{song.artist}</span>
        <span className="music__progress">
          <span key={track} className="music__played" onAnimationEnd={next} />
        </span>
      </span>
      <span className="music__wheel" />
    </button>
  )
}

/* The cat's tail is a chain of rigid segments, each its own <svg> nested in the one
   below, so each sways a beat after its parent and a slow wave runs to the tip. Each
   segment's fill reaches past its pivot (no gap at a joint) while its ink outline is two
   open edge strokes that stop at the pivot (no seam line). The edges are soft fur locks. */
const LOCKS = 3 // fur locks along each edge of a tail segment
const PUFF = 5 // how far a lock swells out of the edge
const fur = (x, a, c, L, side, n = LOCKS, puff = PUFF) => {
  const pt = (t) => [x + side * (a + (c - a) * t), 90 - L * t]
  let d = ''
  for (let k = 0; k < n; k++) {
    const [x0, y0] = pt(k / n), [x1, y1] = pt((k + 1) / n), step = L / n
    const ax = x1 + side * puff, ay = y1 + step * 0.15
    d += ` C ${x0 + side * puff * 1.1} ${y0 - step * 0.25} ${ax + side * puff * 0.2} ${ay + step * 0.35} ${ax} ${ay}`
    d += ` Q ${ax - side * puff * 0.1} ${ay - step * 0.35} ${x1 - side * puff * 0.35} ${y1 - step * 0.05}`
  }
  return d
}
const furBack = (x, a, c, L, side, n = LOCKS, puff = PUFF) => {
  const pt = (t) => [x + side * (a + (c - a) * t), 90 - L * t]
  let d = ''
  for (let k = n - 1; k >= 0; k--) {
    const [x0, y0] = pt(k / n), [x1, y1] = pt((k + 1) / n), step = L / n
    const ax = x1 + side * puff, ay = y1 + step * 0.15
    d += ` Q ${ax - side * puff * 0.1} ${ay - step * 0.35} ${ax} ${ay}`
    d += ` C ${ax + side * puff * 0.2} ${ay + step * 0.35} ${x0 + side * puff * 1.1} ${y0 - step * 0.25} ${x0} ${y0}`
  }
  return d
}
const TAIL = [
  { w0: 56, w1: 56, L: 56, rest: 16, swing: 4 },
  { w0: 56, w1: 54, L: 56, rest: 8, swing: 5, stripe: true },
  { w0: 54, w1: 50, L: 54, rest: -10, swing: 6 },
  { w0: 50, w1: 44, L: 52, rest: -22, swing: 7, stripe: true },
  { w0: 44, w1: 32, L: 48, rest: -28, swing: 8, tip: true },
]
function TailArt({ w0, w1, L, stripe, tip, i }) {
  const a = w0 / 2, c = w1 / 2, top = 90 - L
  const end = (side) => `${50 + side * (c - PUFF * 0.35)} ${top - (L / LOCKS) * 0.05}`
  const crown = tip
    ? ` C ${50 - c - 7} ${top - c * 0.9} ${50 - c * 0.7} ${top - c * 1.9} 53 ${top - c * 1.7} Q ${50 + c * 0.2} ${top - c * 2.3} ${50 + c * 0.55} ${top - c * 1.45} C ${50 + c * 1.1} ${top - c * 1.2} ${50 + c + 7} ${top - c * 0.6} ${end(1)}`
    : ` L ${end(1)}`
  const fill = `M ${50 - a} 100 L ${50 - a} 90${fur(50, a, c, L, -1)}${crown}${furBack(50, a, c, L, 1)} L ${50 + a} 100 A ${a} ${a * 0.6} 0 0 1 ${50 - a} 100 Z`
  const id = `tail-${i}`
  return (
    <svg viewBox="0 0 100 100">
      <defs><clipPath id={id}><path d={fill} /></clipPath></defs>
      <path className="cat__fur" d={fill} />
      <g clipPath={`url(#${id})`}>
        {stripe && <path className="cat__stripe" d={`M ${38 - a} ${90 - L * 0.62} Q 50 ${90 - L * 0.5} ${62 + a} ${90 - L * 0.66} L ${62 + a} ${90 - L * 0.36} Q 50 ${90 - L * 0.22} ${38 - a} ${90 - L * 0.32} Z`} />}
        {tip && <rect className="cat__light-fill" x="0" y={top - 60} width="100" height={L * 0.55 + 60} />}
        {[[-0.45, 0.2], [0.3, 0.45], [-0.2, 0.75], [0.5, 0.85]].map(([x, t]) => (
          <path key={t} className="cat__strand" d={`M ${50 + a * x} ${96 - L * t} q 2 -8 6 -11`} />
        ))}
      </g>
      <path className="cat__ink" d={`M ${50 - a} 90${fur(50, a, c, L, -1)}`} />
      <path className="cat__ink" d={`M ${50 + a} 90${fur(50, a, c, L, 1)}`} />
      {tip && <path className="cat__ink" d={`M ${end(-1)}${crown}`} />}
    </svg>
  )
}
const Tail = ({ i = 0 }) => {
  const segment = TAIL[i]
  if (!segment) return null
  return (
    <span className="cat__segment" style={{ '--i': i, '--rest': `${segment.rest}deg`, '--swing': `${segment.swing}deg`, '--up': TAIL[i - 1]?.L ?? 0 }}>
      <TailArt {...segment} i={i} />
      <Tail i={i + 1} />
    </span>
  )
}

// The cat seen from above, curled up like a round loaf: half a circle standing on the screen's
// bottom edge, the tail coming out at its top. Tufts of fur stick out along the rim.
const R = 142
const LOAF = `M${150 - R} 150 A${R} ${R} 0 0 1 ${150 + R} 150 Z`
const TUFTS = [-78, -58, -38, -18, 18, 38, 58, 78].map((angle) => {
  const t = (angle * Math.PI) / 180
  return [150 + R * Math.sin(t), 150 - R * Math.cos(t), angle]
})
// Tabby bars: a short stripe down the spine and short bars leaving it toward each side.
const BARS = 'M150 22 V58 M138 52 Q112 56 92 74 M162 52 Q188 56 208 74 M136 84 Q106 90 84 112 M164 84 Q194 90 216 112 M134 116 Q108 122 92 140 M166 116 Q192 122 208 140'

// A ginger tabby curled up just past the bottom edge of the screen, with its tail lying out across
// the desk, swaying. Touching the tail makes it swish.
function Cat() {
  const [swish, setSwish] = useState(false)
  return (
    <div className="cat" aria-hidden="true">
      <span className="cat__tail" data-swish={swish || undefined} onPointerEnter={() => setSwish(true)}
        onAnimationEnd={(e) => e.target === e.currentTarget && setSwish(false)}>
        <Tail />
      </span>
      <svg className="cat__body" viewBox="0 0 300 150">
        <defs><clipPath id="cat-loaf"><path d={LOAF} /></clipPath></defs>
        <path className="cat__shade" d={LOAF} />
        <g clipPath="url(#cat-loaf)">
          <circle className="cat__fur" cx="138" cy="160" r={R} />
          <path className="cat__band" d={BARS} />
          <path className="cat__light" d="M34 104 C46 62 80 32 124 22" />
        </g>
        {TUFTS.map(([x, y, angle]) => (
          <path key={angle} className="cat__tuft" transform={`rotate(${angle} ${x} ${y})`} d={`M${x - 8} ${y + 4} Q${x - 2} ${y - 12} ${x + 8} ${y + 3}`} />
        ))}
        <path className="cat__ink" d={LOAF} />
      </svg>
    </div>
  )
}

export default function Desk({ playlist, notes }) {
  return (
    <>
      <div className="desk" />
      <div className="props">
        <Coffee />
        <Pen />
        <Notes notes={notes} />
        <Music playlist={playlist} />
      </div>
      <Snack />
      <Cat />
    </>
  )
}
