<template>
  <header class="blog-header">
    <a v-if="showLogo" class="blog-logo" href="/" :style="{ backgroundImage: `url('${site.logo}')` }">{{ site.title }}</a>
    <h1 class="blog-title">{{ site.title }}</h1>
    <h2 class="blog-description">{{ site.description }}</h2>
    <SocialLinks />
  </header>
</template>

<script setup lang="ts">
import { site } from "../../site"
import SocialLinks from "./SocialLinks.vue"

withDefaults(defineProps<{
  showLogo?: boolean
}>(), {
  showLogo: true
})
</script>
