/* Sheet k carries pages 2k (front) and 2k+1 (back); a desktop spread is the previous
   sheet's back and the next sheet's front, so spreads are numbered by this function. */
export const spreadOf = (page) => Math.floor((page + 1) / 2)

/* The first content page sits inside the cover. Even chapter lengths keep
   chapters on full spreads and the back cover on the last sheet. */
export function layout({ cover, chapters, back }) {
  const pages = [{ type: 'cover', ...cover }]
  const toc = chapters.map((chapter, n) => {
    if (chapter.pages.length % 2) throw new Error(`Chapter "${chapter.id}" needs an even number of pages`)
    const entry = { ...chapter, n, page: pages.length }
    for (const page of chapter.pages) pages.push({ ...page, chapter: entry, folio: pages.length })
    return entry
  })
  pages.push({ type: 'back', ...back })
  return { pages, chapters: toc, last: pages.length - 1 }
}
