<template>
  <div class="gallery">
    <div class="gallery-panel"
         v-for="photo in photos.slice().reverse()"
         :key="photo.id">
      <router-link :to="`feed/${photo.id}`">
        <img :src="thumbUrl(photo.filename)">
      </router-link>
    </div>
  </div>
</template>


<script>
import photos from '@/photos.json';
//import deviceName from "../pages/Device";

export default {
  name: 'Gallery',
  data() {
    return {
      photos,
    };
  },
  methods: {
    thumbUrl(filename) {
      return require(`../assets/images/${filename}`);
    },
  },
};
</script>
