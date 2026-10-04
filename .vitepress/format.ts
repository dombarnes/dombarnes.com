export interface PostSummary {
  title: string
  slug: string
  url: string
  id: string
  date: string
  author: string
  tags: string[]
  categories: string[]
  excerpt: string
  description: string
  image?: string
  image2?: string
  postImage?: string
  timestamp: number
}

interface LondonParts {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  second: string
  offset: string
}

const londonOptions: Intl.DateTimeFormatOptions = {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZoneName: "longOffset"
}

export function asDate(value: unknown): Date {
  if (value instanceof Date) {
    return value
  }

  if (typeof value === "string" || typeof value === "number") {
    return new Date(value)
  }

  return new Date(NaN)
}

export function asTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag)).filter((tag) => tag.trim())
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()]
  }

  return []
}

export function prepareMarkdown(source: string): string {
  return source
    .replace(/\{\{\s*site\.url\s*\}\}/g, "")
    .replace(/\{%\s*highlight\s+([^\s%]+)\s*%\}([\s\S]*?)\{%\s*endhighlight\s*%\}/g, (_match, lang: string, code: string) => {
      const body = String(code).replace(/^\n/, "").replace(/\n$/, "")
      return `\n\`\`\`${lang}\n${body}\n\`\`\`\n`
    })
    .replace(/\{:([^}]+)\}/g, "{$1}")
}

export function slugFromUrl(url: string): string {
  const path = url.split("?")[0].replace(/\.html$/, "").replace(/\/+$/, "")
  const parts = path.split("/").filter(Boolean)
  return parts[parts.length - 1] ?? ""
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function capitalize(value: string): string {
  if (!value) {
    return ""
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function cgiEscape(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, "+")
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function londonParts(date: Date): LondonParts {
  const parts = new Intl.DateTimeFormat("en-GB", londonOptions).formatToParts(date)
  const values: Record<string, string> = {}

  parts.forEach((part) => {
    values[part.type] = part.value
  })

  const offsetName = values.timeZoneName ?? "GMT"
  const offsetMatch = offsetName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/)
  let offset = "+00:00"

  if (offsetMatch) {
    const hours = offsetMatch[2].padStart(2, "0")
    const minutes = (offsetMatch[3] ?? "00").padStart(2, "0")
    offset = `${offsetMatch[1]}${hours}:${minutes}`
  }

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
    offset
  }
}

export function formatLongDate(value: unknown): string {
  const date = asDate(value)
  const parts = londonParts(date)
  const month = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    month: "long"
  }).format(date)

  return `${parts.day} ${month} ${parts.year}`
}

export function formatShortDate(value: unknown): string {
  const date = asDate(value)
  const parts = londonParts(date)
  const month = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    month: "short"
  }).format(date)

  return `${parts.day} ${month} ${parts.year}`
}

export function formatXmlSchema(value: unknown): string {
  const parts = londonParts(asDate(value))
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${parts.offset}`
}

export function formatRfc822(value: unknown): string {
  const date = asDate(value)
  const parts = londonParts(date)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short"
  }).format(date)
  const month = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    month: "short"
  }).format(date)
  const knownWeekday = weekdays.find((day) => weekday.startsWith(day)) ?? weekday
  const offset = parts.offset.replace(":", "")

  return `${knownWeekday}, ${parts.day} ${month} ${parts.year} ${parts.hour}:${parts.minute}:${parts.second} ${offset}`
}

export function postId(value: unknown, slug: string): string {
  const parts = londonParts(asDate(value))
  return `/${parts.year}/${parts.month}/${parts.day}/${slug}`
}

function firstParagraph(body: string): string {
  const parts = body.split(/\n\s*\n/)
  return parts.find((part) => part.trim()) ?? ""
}

function markdownToText(value: string): string {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\{:([^}]+)\}/g, "")
    .replace(/\{[a-zA-Z][^}]*\}/g, "")
    .replace(/\{%[\s\S]*?%\}/g, "")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function truncateWords(value: string, count: number): string {
  const words = value.split(" ").filter(Boolean)

  if (words.length <= count) {
    return words.join(" ")
  }

  return `${words.slice(0, count).join(" ")}...`
}

export function truncateChars(value: string, count: number): string {
  if (value.length <= count) {
    return value
  }

  const omission = "..."
  return value.slice(0, Math.max(0, count - omission.length)) + omission
}

export function plainParagraph(body: string): string {
  return markdownToText(firstParagraph(body))
}

export function summarisePost(slug: string, body: string, data: Record<string, unknown>): PostSummary {
  const date = asDate(data.date)
  const plain = plainParagraph(body)
  const image = typeof data.image === "string" ? data.image : undefined
  const image2 = typeof data.image2 === "string" ? data.image2 : undefined
  const postImage = typeof data.post_image === "string" ? data.post_image : undefined

  return {
    title: String(data.title ?? slug),
    slug,
    url: `/${slug}`,
    id: postId(date, slug),
    date: Number.isNaN(date.getTime()) ? "" : date.toISOString(),
    author: typeof data.author === "string" ? data.author : "",
    tags: asTags(data.tags),
    categories: asTags(data.categories),
    excerpt: truncateWords(plain, 50),
    description: plain ? truncateChars(plain, 200) : "",
    image,
    image2,
    postImage,
    timestamp: Number.isNaN(date.getTime()) ? 0 : date.getTime()
  }
}
