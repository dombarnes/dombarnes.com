<template>
  <article
    v-for="post in posts"
    :key="post.slug"
    class="post"
    itemscope
    itemtype="http://schema.org/BlogPosting"
    role="article"
  >
    <div class="article-item">
      <header class="post-header">
        <template v-if="listMode === 'full'">
          <meta itemprop="author" :content="post.author">
          <meta itemprop="publisher" :content="site.author">
        </template>
        <h2 class="post-title" itemprop="name">
          <a :href="post.url" itemprop="url">{{ post.title }}</a>
        </h2>
        <meta v-if="listMode === 'full'" itemprop="headline" :content="post.title">
      </header>
      <section v-if="listMode !== 'titles'" class="post-excerpt" itemprop="description">
        <p>{{ post.excerpt }}</p>
      </section>
      <div class="post-meta">
        <time
          :itemprop="listMode === 'full' ? 'datePublished' : undefined"
          :datetime="formatLongDate(post.date)"
        >{{ formatLongDate(post.date) }}</time>
        <meta v-if="listMode === 'full'" itemprop="dateModified" :content="formatXmlSchema(post.date)">
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { formatLongDate, formatXmlSchema, type PostSummary } from "../../format"
import { site } from "../../site"

type PostListMode = "full" | "featured" | "titles"

const props = defineProps<{
  posts: PostSummary[]
  mode: PostListMode
}>()

const listMode = computed(() => modeName(props.mode))

function modeName(mode: PostListMode): PostListMode {
  switch (mode) {
    case "full":
    case "featured":
    case "titles":
      return mode
    default: {
      const unknown: never = mode
      return unknown
    }
  }
}
</script>
