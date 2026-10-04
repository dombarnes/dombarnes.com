<template>
  <div class="bottom-closer">
    <div class="background-closer-image" :style="{ backgroundImage: `url(${site.cover})` }">
      {{ imageText }}
    </div>
    <div class="inner">
      <h1 class="blog-title">{{ site.title }}</h1>
      <h2 class="blog-description">{{ site.description }}</h2>
      <a v-if="showButton" href="/" class="btn">Back to Overview</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { site } from "../../site"

withDefaults(defineProps<{
  showButton?: boolean
  imageText?: string
}>(), {
  showButton: true,
  imageText: ""
})
</script>
