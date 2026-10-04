import { createContentLoader } from "vitepress"
import { slugFromUrl, summarisePost, type PostSummary } from "../format"

declare const data: PostSummary[]
export { data }

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---")) {
    return source
  }

  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return match ? source.slice(match[0].length) : source
}

export default createContentLoader<PostSummary[]>("posts/*.md", {
  includeSrc: true,
  transform(raw) {
    return raw
      .map((entry) => summarisePost(slugFromUrl(entry.url), stripFrontmatter(entry.src ?? ""), entry.frontmatter))
      .sort((left, right) => right.timestamp - left.timestamp || right.slug.localeCompare(left.slug))
  }
})
