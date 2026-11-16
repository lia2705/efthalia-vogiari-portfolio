/* Sheet k carries pages 2k (front) and 2k+1 (back); a desktop spread is the previous
   sheet's back and the next sheet's front, so spreads are numbered by this function. */
export const spreadOf = (page) => Math.floor((page + 1) / 2)

/* Flatten the content into numbered pages, bound like a real book: cover, a blank endpaper inside
   it, the chapters, an endpaper, the back cover. Every chapter has an even number of pages, so each
   starts on the front of a fresh leaf: that leaf carries the chapter's tab, and both its faces are
   the chapter's. Content pages are numbered from 1, odd on the right. */
export function layout({ cover, chapters, back }) {
  const pages = [{ type: 'cover', ...cover }, { type: 'endpaper' }]
  const toc = chapters.map((chapter, n) => {
    if (chapter.pages.length % 2) throw new Error(`Chapter "${chapter.id}" needs an even number of pages`)
    const entry = { ...chapter, n, page: pages.length }
    for (const page of chapter.pages) pages.push({ ...page, chapter: entry, folio: pages.length - 1 })
    return entry
  })
  pages.push({ type: 'endpaper' }, { type: 'back', ...back })
  return { pages, chapters: toc, last: pages.length - 1 }
}
