<template>
  <div class="custom-links">
    <template v-for="item in links" :key="item.icon">
      <a :class="`icon-${item.icon}`" :href="item.url" :title="item.desc">
        <i :class="`fa fa-${item.icon}`"></i>
      </a>
      &nbsp;&nbsp;·&nbsp;&nbsp;
    </template>
    <a href="/about">About</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { site } from "../../site"

const links = computed(() => site.social.filter((item) => item.url))
</script>
