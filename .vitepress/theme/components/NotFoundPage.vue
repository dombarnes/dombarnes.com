<template>
  <div class="page-content">
    <div class="wrapper">
      <div class="teaserimage">
        <div class="teaserimage-image" :style="{ backgroundImage: `url(${site.cover})` }">
          Teaser Image
        </div>
      </div>
      <BlogIntro />
      <main class="content" role="main">
        <h2>404 Page Not Found</h2>
        <h3>Sorry, we can't find that page. </h3>
        <p>This site now only has a selection of posts from my old website. You may want to try checking the archives for older posts at <a href="http://archive.dombarnes.com" target="_blank">archive.dombarnes.com</a>.</p>
        <p>Or pick from the list below.</p>
        <div class="cf frame">
          <PostList :posts="posts" mode="titles" />
        </div>
      </main>
      <BlogIntro :show-logo="false" />
    </div>
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import { data as posts } from "../posts.data"
import { site } from "../../site"
import BlogIntro from "./BlogIntro.vue"
import PostList from "./PostList.vue"
import SiteFooter from "./SiteFooter.vue"
</script>
