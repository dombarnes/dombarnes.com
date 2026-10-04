<template>
  <a href="/" class="logo-readium"><span class="logo" :style="{ backgroundImage: `url(${site.logo})` }"></span></a>
</template>

<script setup lang="ts">
import { site } from "../../site"
</script>
