<template>
  <main class="links-content" role="main">
    <section class="post-content">
      <a name="topofpage"></a>
      <Content />
    </section>
  </main>
  <BottomCloser :show-button="false" image-text="Image" />
</template>

<script setup lang="ts">
import BottomCloser from "./BottomCloser.vue"
</script>
