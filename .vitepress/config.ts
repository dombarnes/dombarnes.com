import fs from "node:fs"
import path from "node:path"
import { defineConfig, type HeadConfig } from "vitepress"
import { canonicalFor, descriptionForPage, loadPosts, renderAtom, renderRss } from "./content"
import { asDate, escapeHtml, formatXmlSchema, prepareMarkdown } from "./format"
import { site } from "./site"

function absoluteUrl(value: string | undefined, fallback: string): string {
  const target = value && value.trim() ? value : fallback

  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target
  }

  return `${site.url}${target.startsWith("/") ? target : `/${target}`}`
}

export default defineConfig({
  title: site.title,
  titleTemplate: ":title | Dom Barnes",
  description: site.description,
  lang: "en-GB",
  cleanUrls: true,
  appearance: false,
  lastUpdated: false,
  ignoreDeadLinks: true,
  srcExclude: ["README.md", "_drafts/**", "_projects/**"],
  rewrites: (id) => id.startsWith("posts/") && id.endsWith(".md") ? id.slice("posts/".length) : id,
  sitemap: {
    hostname: site.url
  },
  head: [
    ["meta", { name: "HandheldFriendly", content: "True" }],
    ["meta", { name: "MobileOptimized", content: "320" }],
    ["meta", { name: "mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],
    ["link", { rel: "alternate", href: `${site.url}/feed.xml`, title: `${site.title} - Atom`, type: "application/atom+xml" }],
    ["link", { rel: "alternate", href: `${site.url}/rss.xml`, title: `${site.title} - RSS`, type: "application/rss+xml" }],
    ["link", { rel: "shortcut icon", href: "/assets/images/favicon.png", type: "image/png" }],
    ["link", { rel: "stylesheet", href: "https://brick.a.ssl.fastly.net/Linux+Libertine:400,400i,700,700i/Open+Sans:400,400i,700,700i" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" }],
    ["link", { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" }],
    ["link", { rel: "stylesheet", href: "/assets/css/styles.css" }],
    ["link", { rel: "stylesheet", href: "/css/print.css", media: "print" }],
    ["script", { src: "/assets/js/analytics.js", defer: "true" }]
  ],
  markdown: {
    typographer: true,
    anchor: {
      permalink: false
    },
    preConfig(md) {
      md.core.ruler.before("normalize", "jekyll-markdown", (state) => {
        state.src = prepareMarkdown(state.src)
      })
    },
    config(md) {
      md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
        const token = tokens[idx]

        for (const name of ["target", "rel"]) {
          const index = token.attrIndex(name)

          if (index >= 0) {
            token.attrs?.splice(index, 1)
          }
        }

        return self.renderToken(tokens, idx, options)
      }

      md.renderer.rules.fence = (tokens, idx) => {
        const token = tokens[idx]
        const info = token?.info.trim().split(/\s+/)[0] ?? ""
        const language = info ? `language-${info} ` : ""
        const code = escapeHtml(token?.content ?? "")

        return `<div class="${language}highlighter-rouge"><div class="highlight"><pre class="highlight"><code>${code}</code></pre></div></div>\n`
      }
    }
  },
  vue: {
    template: {
      transformAssetUrls: {
        includeAbsolute: false
      }
    }
  },
  vite: {
    plugins: [
      {
        name: "dombarnes-feeds",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const requestUrl = req.url?.split("?")[0]

            if (requestUrl === "/feed.xml") {
              res.setHeader("Content-Type", "application/atom+xml; charset=utf-8")
              res.end(renderAtom(loadPosts()))
              return
            }

            if (requestUrl === "/rss.xml") {
              res.setHeader("Content-Type", "application/rss+xml; charset=utf-8")
              res.end(renderRss(loadPosts()))
              return
            }

            next()
          })
        }
      }
    ]
  },
  transformPageData(pageData) {
    const relativePath = pageData.relativePath

    if (relativePath === "index.md" || relativePath.startsWith("page[") || /^page\d+\.md$/.test(relativePath)) {
      pageData.title = site.title
      pageData.titleTemplate = false
    }

    pageData.description = descriptionForPage(relativePath)
  },
  transformHead(context): HeadConfig[] {
    const page = context.pageData
    const frontmatter = page.frontmatter
    const canonical = canonicalFor(page.relativePath, page.params)
    const description = page.description || site.description
    const headline = typeof frontmatter.title === "string" ? frontmatter.title : ""
    const pageTitle = headline || site.title
    const image = typeof frontmatter.image === "string" ? frontmatter.image : undefined
    const postImage = typeof frontmatter.post_image === "string" ? frontmatter.post_image : undefined
    const head: HeadConfig[] = [
      ["link", { rel: "canonical", href: canonical }],
      ["meta", { name: "twitter:card", content: "summary" }],
      ["meta", { name: "twitter:site", content: site.twitterHandle }],
      ["meta", { name: "twitter:title", content: pageTitle }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: absoluteUrl(postImage, site.cover) }],
      ["meta", { property: "og:site_name", content: site.title }],
      ["meta", { property: "og:title", content: pageTitle }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:image", content: absoluteUrl(image, site.logo) }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:type", content: "blog" }],
      ["meta", { property: "og:locale", content: "en_GB" }],
      ["script", { type: "application/ld+json" }, JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Blog",
        headline,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical
        },
        url: site.url,
        author: {
          "@type": "Person",
          name: site.author
        },
        publisher: {
          "@type": "Person",
          name: site.author,
          image: absoluteUrl(site.authorImage, site.authorImage)
        }
      }).replace(/</g, "\\u003c")]
    ]

    if (frontmatter.date) {
      head.push(["meta", { property: "article:published_time", content: formatXmlSchema(asDate(frontmatter.date)) }])
    }

    return head
  },
  buildEnd(siteConfig) {
    const posts = loadPosts()
    fs.mkdirSync(siteConfig.outDir, { recursive: true })
    fs.writeFileSync(path.join(siteConfig.outDir, "feed.xml"), renderAtom(posts))
    fs.writeFileSync(path.join(siteConfig.outDir, "rss.xml"), renderRss(posts))
  }
})
