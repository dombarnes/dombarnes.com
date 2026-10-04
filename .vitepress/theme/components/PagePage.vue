<template>
  <main class="content" role="main">
    <article class="post">
      <div v-if="image" class="article-image">
        <div class="post-image-image" :style="{ backgroundImage: `url(${image})` }">
          Article Image
        </div>
        <div class="post-meta">
          <h1 class="post-title">{{ title }}</h1>
          <div class="cf post-meta-text">
            <div class="author-image" :style="{ backgroundImage: `url(${site.authorImage})` }">Blog Logo</div>
            <h4 class="author-name" itemprop="author" itemscope itemtype="http://schema.org/Person">{{ site.author }}</h4>
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
              <div class="author-image" :style="{ backgroundImage: `url(${authorImage})` }">Blog Logo</div>
              <h4 class="author-name" itemprop="author" itemscope itemtype="http://schema.org/Person">{{ author }}</h4>
              <TagList :tags="tags" />
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
      </template>
      <section class="post-content">
        <a name="topofpage"></a>
        <Content />
      </section>
    </article>
  </main>
  <BottomCloser image-text="Image" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useData } from "vitepress"
import { asTags } from "../../format"
import { site } from "../../site"
import BottomCloser from "./BottomCloser.vue"
import TagList from "./TagList.vue"

const { frontmatter } = useData()

const title = computed(() => String(frontmatter.value.title ?? ""))
const image = computed(() => typeof frontmatter.value.image === "string" ? frontmatter.value.image : "")
const author = computed(() => typeof frontmatter.value.author === "string" ? frontmatter.value.author : "")
const authorImage = computed(() => typeof frontmatter.value.author_image === "string" ? frontmatter.value.author_image : "")
const tags = computed(() => asTags(frontmatter.value.tags))
</script>
