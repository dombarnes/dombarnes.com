<template>
  <div class="page-content">
    <div class="wrapper">
      <main class="content" role="main">
        <div class="cf frame">
          <PostList :posts="posts" mode="full" />
        </div>
      </main>
    </div>
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import { data as posts } from "../posts.data"
import PostList from "./PostList.vue"
import SiteFooter from "./SiteFooter.vue"
</script>
