<template>
  <span class="post-tags-set">
    <template v-if="tags.length">in |
      <span v-for="tag in tags" :key="tag" class="post-tag-">
        <a :href="slugify(tag)">{{ capitalize(tag) }}</a>|
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { capitalize, slugify } from "../../format"

defineProps<{
  tags: string[]
}>()
</script>
