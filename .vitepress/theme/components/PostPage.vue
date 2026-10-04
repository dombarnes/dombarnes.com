<template>
  <main class="content" role="main">
    <article class="post">
      <div v-if="image" class="article-image">
        <div class="post-image-image" :style="{ backgroundImage: `url(${image})` }">
          Article Image
        </div>
        <div v-if="image2" class="post-image-image2" :style="{ backgroundImage: `url(${image2})` }">
          Article Image
        </div>
        <div class="post-meta">
          <h1 class="post-title">{{ title }}</h1>
          <div class="cf post-meta-text">
            <div class="author-image" :style="{ backgroundImage: `url(${site.authorImage})` }">Blog Logo</div>
            <h4 class="author-name" itemprop="author" itemscope itemtype="http://schema.org/Person">{{ site.author }}</h4>
            on
            <time itemprop="datePublished" :datetime="shortStamp">{{ shortDate }}</time>
            <TagList :tags="tags" />
          </div>
          <div style="text-align:center">
            <a href="#topofpage" class="topofpage"><i class="fa fa-angle-down"></i></a>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="noarticleimage">
          <div class="post-meta">
            <h1 class="post-title">{{ title }}</h1>
            <div class="cf post-meta-text">
              <div class="author-image" itemprop="image" itemscope itemtype="http://schema.org/ImageObject" :style="{ backgroundImage: `url(${site.authorImage})` }">Blog Logo</div>
              <h4 class="author-name" itemprop="author" itemscope itemtype="http://schema.org/Person">{{ author }}</h4>
              on
              <time itemprop="datePublished" :datetime="xmlDate">{{ shortDate }}</time>
              <TagList :tags="tags" />
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
      </template>
      <section class="post-content">
        <div class="post-reading">
          <span class="post-reading-time"></span> read
        </div>
        <a name="topofpage"></a>
        <Content />
      </section>
      <footer class="post-footer">
        <section class="share">
          <a
            v-for="item in shareLinks"
            :key="item.icon"
            :class="`icon-${item.icon}`"
            :href="item.href"
            @click="openShare($event, item.icon)"
          >
            <i :class="`fa fa-${item.icon}`"></i><span class="hidden">{{ item.icon }}</span> Share this
          </a>
        </section>
      </footer>
      <div class="bottom-teaser cf">
        <div class="isLeft">
          <h5 class="index-headline featured"><span>Written by</span></h5>
          <section class="author">
            <div class="author-image" :style="{ backgroundImage: `url(${site.authorImage})` }">Blog Logo</div>
            <h4>{{ site.author }}</h4>
            <p class="bio"></p>
            <hr>
            <p class="published">Published <time itemprop="datePublished" :datetime="shortStamp">{{ shortDate }}</time></p>
          </section>
        </div>
        <div class="isRight">
          <h5 class="index-headline featured"><span>Supported by</span></h5>
          <SiteFooter />
        </div>
      </div>
    </article>
  </main>
  <BottomCloser />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData, useRoute } from "vitepress"
import { asDate, asTags, cgiEscape, formatShortDate, formatXmlSchema, postId } from "../../format"
import { site, type SocialLink } from "../../site"
import BottomCloser from "./BottomCloser.vue"
import SiteFooter from "./SiteFooter.vue"
import TagList from "./TagList.vue"

interface ShareLink {
  icon: string
  href: string
}

const route = useRoute()
const { frontmatter } = useData()

const title = computed(() => String(frontmatter.value.title ?? ""))
const author = computed(() => typeof frontmatter.value.author === "string" ? frontmatter.value.author : "")
const image = computed(() => typeof frontmatter.value.image === "string" ? frontmatter.value.image : "")
const image2 = computed(() => typeof frontmatter.value.image2 === "string" ? frontmatter.value.image2 : "")
const tags = computed(() => asTags(frontmatter.value.tags))
const date = computed(() => asDate(frontmatter.value.date))
const slug = computed(() => route.path.split("/").filter(Boolean)[0] ?? "")
const shortDate = computed(() => formatShortDate(date.value))
const xmlDate = computed(() => formatXmlSchema(date.value))
const shortStamp = computed(() => {
  const parts = formatXmlSchema(date.value)
  return parts.slice(0, 16).replace("T", " ")
})

const shareLinks = computed(() => site.social.flatMap((item) => shareLink(item, title.value, date.value, slug.value)))

function shareLink(item: SocialLink, pageTitle: string, pageDate: Date, pageSlug: string): ShareLink[] {
  if (!item.shareUrl || !item.shareTitle || !item.shareLink || !item.username) {
    return []
  }

  return [{
    icon: item.icon,
    href: `${item.shareUrl}${item.shareTitle}${cgiEscape(pageTitle)} By @${item.username}${item.shareLink}${site.url}${postId(pageDate, pageSlug)}`
  }]
}

function openShare(event: MouseEvent, icon: string) {
  event.preventDefault()
  const target = event.currentTarget

  if (!(target instanceof HTMLAnchorElement)) {
    return
  }

  window.open(target.href, `${icon}-share`, "width=550,height=255")
}
</script>
