/* Core Stylelint rules only.
   1. Raw values (colours, times, easings, font families) live in src/styles/tokens.css, the one
      file these rules do not apply to.
   2. OWNERS says which stylesheet owns which class blocks. A block name is a prefix followed by
      an optional plural "s" and then "__", "--" or the end: "photo" covers .photo and .photos.
      Add a prefix here when you add a block; the map must stay disjoint. */
const OWNERS = {
  'src/App.css': ['scene', 'stage'],
  'src/components/Book.css': ['book'],
  'src/components/Nav.css': ['nav'],
  'src/components/Desk.css': ['desk', 'props', 'coffee', 'pen', 'postit', 'clip', 'music', 'earphones', 'snack', 'cat'],
  'src/components/Page.css': ['page', 'title', 'line', 'bullet', 'fact', 'process', 'group', 'label', 'photo', 'folio', 'timeline', 'chip', 'language', 'flag', 'email', 'link', 'cover-label', 'star', 'band'],
}

const entries = Object.entries(OWNERS).flatMap(([file, prefixes]) => prefixes.map((prefix) => ({ file, prefix })))
for (const a of entries) for (const b of entries) {
  if (a !== b && b.prefix.startsWith(a.prefix)) {
    throw new Error(`stylelint.config.mjs: prefix "${b.prefix}" (${b.file}) overlaps "${a.prefix}" (${a.file})`)
  }
}

const rawValueRules = [
  'color-no-hex', 'color-named', 'function-disallowed-list', 'declaration-property-unit-disallowed-list',
  'declaration-property-value-allowed-list', 'declaration-property-value-disallowed-list',
]

export default {
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'],
    'declaration-property-unit-disallowed-list': { '/^(animation|transition)/': ['s', 'ms'] },
    'declaration-property-value-allowed-list': {
      'font-family': ['/^var\\(--font-/'],
      'font': ['/^(inherit|var\\(--font-)/', '/var\\(--font-[a-z]+\\)\\s*$/'],
      '/^(animation|transition)-timing-function$/': ['/^var\\(--ease-/'],
    },
    'declaration-property-value-disallowed-list': {
      '/^(animation|transition)$/': ['/(?<![-\\w])(ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier)(?![-\\w])/'],
      '/^(box-shadow|filter|text-shadow)$/': ['/rgb|#|hsl/'],
    },
  },
  overrides: [
    { files: ['src/styles/tokens.css'], rules: Object.fromEntries(rawValueRules.map((rule) => [rule, null])) },
    ...Object.entries(OWNERS).map(([file, prefixes]) => ({
      files: [file],
      rules: { 'selector-class-pattern': [`^(${prefixes.join('|')})s?(__|--|$)`] },
    })),
  ],
}
