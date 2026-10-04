import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import { site } from "./site"
import {
  formatRfc822,
  plainParagraph,
  prepareMarkdown,
  summarisePost,
  truncateChars,
  xmlEscape,
  type PostSummary
} from "./format"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const postsDir = path.join(root, "posts")

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

function readPostFile(fileName: string): PostSummary {
  const slug = fileName.replace(/\.md$/, "")
  const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8")
  const parsed = matter(raw)
  return summarisePost(slug, parsed.content, parsed.data)
}

export function loadPosts(): PostSummary[] {
  if (!fs.existsSync(postsDir)) {
    return []
  }

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readPostFile(fileName))
    .sort((left, right) => right.timestamp - left.timestamp || right.slug.localeCompare(left.slug))
}

export function descriptionForPage(relativePath: string): string {
  if (!relativePath || relativePath === "index.md" || relativePath.startsWith("page[") || relativePath === "404.md" || relativePath === "blog.md") {
    return site.description
  }

  const fullPath = path.join(root, relativePath)

  if (!fs.existsSync(fullPath)) {
    return site.description
  }

  const parsed = matter(fs.readFileSync(fullPath, "utf8"))
  const plain = plainParagraph(parsed.content)

  if (!plain) {
    return site.description
  }

  return truncateChars(plain, 200)
}

function renderPostHtml(slug: string): string {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8")
  const parsed = matter(raw)
  const prepared = prepareMarkdown(parsed.content).replace(/\{[a-zA-Z][^}\n]*\}/g, "")
  return markdown.render(prepared)
}

function cdata(value: string): string {
  return value.replace(/]]>/g, "]]]]><![CDATA[>")
}

export function renderAtom(posts: PostSummary[]): string {
  const entries = posts.map((post) => {
    const categories = [...post.tags, ...post.categories]
      .map((tag) => `      <category>${xmlEscape(tag)}</category>`)
      .join("\n")
    const media = post.postImage
      ? `      <media:content xmlns:media="http://search.yahoo.com/mrss/" url="${xmlEscape(absoluteUrl(post.postImage))}" medium="image" />`
      : ""

    return `    <entry>
      <title>${xmlEscape(post.title)}</title>
      <link href="${xmlEscape(absoluteUrl(post.url))}" />
      <id>${xmlEscape(absoluteUrl(post.url))}</id>
      <updated>${xmlEscape(post.date)}</updated>
${categories}
${media}
      <content type="html"><![CDATA[${cdata(renderPostHtml(post.slug))}]]></content>
    </entry>`
  }).join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${xmlEscape(site.title)}</title>
  <link type="application/atom+xml" href="${site.url}/feed.xml" rel="self" />
  <link type="text/html" href="${site.url}/" rel="alternate" />
  <updated>${xmlEscape(new Date().toISOString())}</updated>
  <id>${site.url}/</id>
  <author>
    <name>${xmlEscape(site.author)}</name>
  </author>
  <rights>${xmlEscape(`${new Date().getFullYear()} Dominic Barnes`)}</rights>
  <generator>VitePress</generator>
${entries}
</feed>
`
}

export function renderRss(posts: PostSummary[]): string {
  const now = formatRfc822(new Date())
  const items = posts.map((post) => {
    const categories = [...post.tags, ...post.categories]
      .map((tag) => `        <category>${xmlEscape(tag)}</category>`)
      .join("\n")
    const media = post.postImage
      ? `        <media:content xmlns:media="http://search.yahoo.com/mrss/" url="${xmlEscape(absoluteUrl(post.postImage))}" medium="image" />`
      : ""

    return `      <item>
        <title>${xmlEscape(post.title)}</title>
        <description type="html"><![CDATA[${cdata(renderPostHtml(post.slug))}]]></description>
        <pubDate>${xmlEscape(formatRfc822(post.date))}</pubDate>
        <link>${xmlEscape(absoluteUrl(post.url))}</link>
        <guid isPermaLink="true">${xmlEscape(absoluteUrl(post.url))}</guid>
${categories}
${media}
      </item>`
  }).join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.title)}</title>
    <description><![CDATA[${site.description}]]></description>
    <link>${site.url}/</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-GB</language>
    <copyright>${new Date().getFullYear()} Dominic Barnes</copyright>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>VitePress</generator>
${items}
  </channel>
</rss>
`
}

function absoluteUrl(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  return `${site.url}${value.startsWith("/") ? value : `/${value}`}`
}

export function canonicalFor(relativePath: string, params?: Record<string, string>): string {
  if (params?.page) {
    return `${site.url}/page${params.page}/`
  }

  if (!relativePath || relativePath === "index.md") {
    return `${site.url}/`
  }

  if (relativePath === "404.md") {
    return `${site.url}/404.html`
  }

  const slug = relativePath.replace(/^posts\//, "").replace(/\.md$/, "")

  if (!slug || slug.startsWith("page[")) {
    return `${site.url}/`
  }

  return `${site.url}/${slug}/`
}
