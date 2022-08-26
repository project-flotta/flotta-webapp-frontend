<template>
  <div class="lightbox" @click.self="closeLightbox">

    <img :src="photoUrl(photo.filename)">

    <div class="lightbox-info">
      <div class="lightbox-info-inner">
        <p v-if="photo.timestamp">DateTime - {{ photo.timestamp }}</p>

        <p v-if="photo.detected">Detected - {{ photo.detected }}</p>

        <p v-if="photo.device">Captured on - {{ photo.device }}</p>

      </div>
    </div>

  </div>
</template>

<script>
import photos from '@/photos.json';

export default {
  name: 'Photo',
  data() {
    return {
      photos,
    };
  },
  computed: {
    photo() {
      return this.photos.find((photo) => {
        return photo.id === Number(this.$route.params.id);
      });
    },
  },
  methods: {
    photoUrl(filename) {
      return require(`../assets/images/${filename}`);
    },
    closeLightbox() {
      this.$router.push(`../feed`);
    },
  },
};
</script>

<style>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  .lightbox img {
    margin: auto;
    grid-column-start: 2;
  }

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    background-color: #FFFFFF;
    padding: 1.5rem;
    border-radius: 12px;
  }
</style>
