<template>
  <footer class="site-footer">
    <a class="subscribe" href="/feed.xml"> <span class="tooltip"> <i class="fa fa-rss"></i> Subscribe!</span></a>
    <div class="inner">
      <section class="copyright">All content copyright <a :href="`mailto:${site.email}`">{{ site.name }}</a> &copy; {{ year }} &bull; All rights reserved.</section>
      <section class="poweredby">
        Made with <a href="http://jekyllrb.com"> Jekyll</a> | Hosted by <a href="http://netlify.com">Netlify</a><br>
        <a href="/rss.xml">RSS Feed</a> | <a href="/feed.xml">Atom Feed</a>.
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from "../../site"

const year = new Date().getFullYear()
</script>
