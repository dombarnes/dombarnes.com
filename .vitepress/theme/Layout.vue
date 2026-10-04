<template>
  <SiteMark />
  <component :is="view" />
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch, watchEffect } from "vue"
import { useData, useRoute } from "vitepress"
import BlogPage from "./components/BlogPage.vue"
import HomePage from "./components/HomePage.vue"
import LinksPage from "./components/LinksPage.vue"
import NotFoundPage from "./components/NotFoundPage.vue"
import PagePage from "./components/PagePage.vue"
import PostPage from "./components/PostPage.vue"
import SiteMark from "./components/SiteMark.vue"

type LayoutName = "home" | "blog" | "post" | "page" | "links" | "not-found"

const pages = {
  home: HomePage,
  blog: BlogPage,
  post: PostPage,
  page: PagePage,
  links: LinksPage,
  "not-found": NotFoundPage
} as const

const route = useRoute()
const { frontmatter, page } = useData()

const layout = computed(() => resolveLayout(frontmatter.value.layout, page.value.isNotFound))
const view = computed(() => pages[layout.value])

function resolveLayout(value: unknown, notFound: boolean | undefined): LayoutName {
  if (notFound) {
    return "not-found"
  }

  switch (value) {
    case "home":
    case "blog":
    case "post":
    case "page":
    case "links":
    case "not-found":
      return value
    default:
      return "post"
  }
}

function appendScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) {
    return
  }

  const script = document.createElement("script")
  script.src = src
  script.defer = true
  document.body.appendChild(script)
}

onMounted(() => {
  appendScript("/assets/js/index.js")
  appendScript("/assets/js/analytics.js")
})

watchEffect(() => {
  if (!page.value.isNotFound || typeof document === "undefined") {
    return
  }

  document.title = "404 - Page Not Found | Dom Barnes"
})

watch(() => route.path, async () => {
  await nextTick()

  if (typeof window === "undefined") {
    return
  }

  if (page.value.isNotFound) {
    document.title = "404 - Page Not Found | Dom Barnes"
  }

  window.dispatchEvent(new Event("blog:init"))

  const analytics = window as Window & { ga?: (command: string, hitType: string, path?: string) => void }
  analytics.ga?.("send", "pageview", route.path)
})
</script>
