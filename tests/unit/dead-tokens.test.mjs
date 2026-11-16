/* A token declared in tokens.css that nothing reads is a leftover: delete it. */
import { readFileSync, readdirSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const files = readdirSync('src', { recursive: true }).filter((f) => /\.(css|jsx?)$/.test(f)).map((f) => `src/${f}`)
const text = files.map((f) => readFileSync(f, 'utf8')).join('\n')
const declared = [...readFileSync('src/styles/tokens.css', 'utf8').matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1])
// var(--color-page-${chapter.note}) in JSX reads that token for each chapter colour in the content.
const notes = [...text.matchAll(/note: '(\w+)'/g)].map((m) => m[1])
const dynamic = [...text.matchAll(/var\((--[\w-]*)\$\{/g)].flatMap((m) => notes.map((note) => m[1] + note))

test('every token declared in tokens.css is used in src/', () => {
  const used = (t) => text.includes(`var(${t})`) || text.includes(`var(${t},`) || text.includes(`'${t}'`) || dynamic.includes(t)
  assert.deepEqual(declared.filter((t) => !used(t)), [])
})
