<template>
  <div class="page-content">
    <div class="wrapper">
      <div class="teaserimage">
        <div class="teaserimage-image" :style="{ backgroundImage: `url(${site.cover})` }"></div>
      </div>
      <BlogIntro />
      <main class="content" role="main">
        <template v-if="pageNumber === 1">
          <template v-if="featured.length">
            <h5 class="index-headline featured"><span>Featured</span></h5>
            <div class="container featured">
              <PostList :posts="featured" mode="featured" />
            </div>
          </template>
          <h5 class="index-headline normal"><span>Regular</span></h5>
        </template>
        <div class="cf frame">
          <PostList :posts="pagePosts" mode="full" />
        </div>
        <nav class="pagination" role="navigation">
          <a v-if="pageNumber > 1" class="older-posts" :href="newerHref">&larr; Newer posts</a>
          <span class="page-number">Page {{ pageNumber }} of {{ totalPages }}</span>
          <a v-if="pageNumber < totalPages" class="newer-posts" :href="olderHref">Older posts &rarr;</a>
        </nav>
      </main>
    </div>
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
import { data as posts } from "../posts.data"
import { site } from "../../site"
import BlogIntro from "./BlogIntro.vue"
import PostList from "./PostList.vue"
import SiteFooter from "./SiteFooter.vue"

const { page } = useData()

const pageNumber = computed(() => {
  const raw = Number(page.value.params?.page ?? 1)
  return Number.isInteger(raw) && raw > 0 ? raw : 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(posts.length / site.perPage)))

const pagePosts = computed(() => {
  const start = (pageNumber.value - 1) * site.perPage
  return posts.slice(start, start + site.perPage)
})

const featured = computed(() => posts.filter((post) => post.tags.includes("featured")))

const newerHref = computed(() => {
  if (pageNumber.value <= 2) {
    return "/"
  }

  return `/page${pageNumber.value - 1}`
})

const olderHref = computed(() => `/page${pageNumber.value + 1}`)
</script>
