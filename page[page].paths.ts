import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { site } from "./.vitepress/site"

const postsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "posts")

export default {
  paths() {
    const count = fs.readdirSync(postsDir).filter((fileName) => fileName.endsWith(".md")).length
    const totalPages = Math.ceil(count / site.perPage)

    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_item, index) => ({
      params: { page: String(index + 2) }
    }))
  }
}
