<template>
  <div class="home">
    <Gallery />
  </div>
</template>

<script>

import Gallery from '../components/Gallery.vue';

export default {
  name: "feed",
  components: { 
    Gallery,
  },
};
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }

  .gallery-panel img {
    width: 100%;
    object-fit: cover;
  }
</style>