---
layout: page
title: Tags
permalink: /tags/
---

{% assign tags_sorted = site.tags | sort %}

{% for tag in tags_sorted %}
  {% assign tag_name = tag[0] %}
  {% assign tag_posts = tag[1] %}

### {{ tag_name }}
<a id="{{ tag_name | slugify }}"></a>

<ul>
  {% for post in tag_posts %}
    <li><a href="{{ post.url | replace:'index.html','' | prepend: site.baseurl }}">{{ post.title }}</a> <small>({{ post.date | date_to_string }})</small></li>
  {% endfor %}
</ul>

{% endfor %}
