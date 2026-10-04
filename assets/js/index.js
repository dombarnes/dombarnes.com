/**
 * Main JS file for Casper behaviours
 */

(function () {
  "use strict";

  const VIDEO_SELECTORS = [
    "iframe[src*='player.vimeo.com']",
    "iframe[src*='youtube.com']",
    "iframe[src*='youtube-nocookie.com']",
    "iframe[src*='kickstarter.com'][src*='video.html']",
    "object",
    "embed"
  ];

  function fitVideos(root) {
    root.querySelectorAll(VIDEO_SELECTORS.join(",")).forEach((video) => {
      const parent = video.parentElement;

      if (!parent) {
        return;
      }

      if (video.tagName === "EMBED" && parent.tagName === "OBJECT") {
        return;
      }

      if (video.tagName === "OBJECT" && parent.closest("object")) {
        return;
      }

      if (parent.classList.contains("fluid-width-video-wrapper")) {
        return;
      }

      const heightAttr = video.getAttribute("height");
      const widthAttr = video.getAttribute("width");
      const parsedHeight = parseInt(heightAttr, 10);
      const parsedWidth = parseInt(widthAttr, 10);
      const height = (video.tagName === "OBJECT" || (heightAttr && !Number.isNaN(parsedHeight)))
        ? parsedHeight
        : video.getBoundingClientRect().height;
      const width = !Number.isNaN(parsedWidth) ? parsedWidth : video.getBoundingClientRect().width;

      if (!width) {
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "fluid-width-video-wrapper";
      wrapper.style.paddingTop = `${(height / width) * 100}%`;
      parent.insertBefore(wrapper, video);
      wrapper.appendChild(video);
      video.removeAttribute("height");
      video.removeAttribute("width");
    });
  }

  function readingTime(root) {
    const wordsPerMinute = 270;
    const wordCount = (root.textContent || "").split(" ").length;
    const minutes = Math.round(wordCount / wordsPerMinute);
    const label = minutes > 0 ? `${minutes} min` : "Less than a minute";

    root.querySelectorAll(".post-reading-time").forEach((target) => {
      target.textContent = label;
    });

    root.querySelectorAll(".post-word-count").forEach((target) => {
      target.textContent = String(wordCount);
    });
  }

  function addImageCaptions(root) {
    root.querySelectorAll("img").forEach((image) => {
      const alt = image.getAttribute("alt");

      // Let's put a caption if there is one
      if (!alt || image.classList.contains("emoji") || image.closest("figure")) {
        return;
      }

      const figure = document.createElement("figure");
      const caption = document.createElement("figcaption");

      figure.className = "image";
      caption.textContent = alt;
      image.parentNode.insertBefore(figure, image);
      figure.appendChild(image);
      figure.appendChild(caption);
    });
  }

  function updateHeroImages() {
    const top = window.scrollY || window.pageYOffset;

    if (top < 0 || top > 1500) {
      return;
    }

    document.querySelectorAll(".post-image-image, .teaserimage-image").forEach((image) => {
      image.style.transform = `translate3d(0px, ${top / 3}px, 0px)`;
      image.style.opacity = String(1 - Math.max(top / 700, 0));
    });
  }

  function setArticleOffset() {
    const articleImage = document.querySelector(".article-image");

    if (!articleImage) {
      return;
    }

    const height = articleImage.offsetHeight;

    document.querySelectorAll(".post-content").forEach((content) => {
      content.style.paddingTop = `${height}px`;
    });
  }

  function scrollToHash(event) {
    const link = event.currentTarget;
    const samePath = location.pathname.replace(/^\//, "") === link.pathname.replace(/^\//, "");
    const sameHost = location.hostname === link.hostname;

    if (!samePath || !sameHost) {
      return;
    }

    const id = link.hash.slice(1);
    const target = document.getElementById(id) || document.getElementsByName(id)[0];

    if (!target) {
      return;
    }

    event.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset,
      behavior: "smooth"
    });
  }

  function bindHashLinks() {
    document.querySelectorAll('a[href*="#"]').forEach((link) => {
      if (link.getAttribute("href") === "#" || link.dataset.hashScroll === "true") {
        return;
      }

      link.dataset.hashScroll = "true";
      link.addEventListener("click", scrollToHash);
    });
  }

  function init() {
    document.querySelectorAll(".post-content").forEach((content) => {
      fitVideos(content);

      // Calculates Reading Time
      readingTime(content);

      // Creates Captions from Alt tags
      addImageCaptions(content);
    });

    if (window.__heroImageScroll) {
      window.removeEventListener("scroll", window.__heroImageScroll);
    }

    window.__heroImageScroll = updateHeroImages;
    window.addEventListener("scroll", updateHeroImages, { passive: true });
    updateHeroImages();
    setArticleOffset();
    bindHashLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
