.
<template>
  <div class="container-fluid mt-1">
    <div v-if="!search" class="row flex-nowrap trendings">
      <HorizontalScroll
        :movieTrendings="movieTrendings"
        :serieTrendings="serieTrendings"
        :mediaCasts="mediaCasts"
      ></HorizontalScroll>
    </div>

    <!-- media -->
    <ul class="row">
      <li class="col m-1" v-for="(movie, i) in media" :key="movie.id">
        <BaseCard
          class="px-1 d-flex justify-content-center h-400 w-300"
          :movie="movie"
          :i="i"
          :mediaCasts="mediaCasts"
          :search="search"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import HorizontalScroll from "./HorizontalScroll.vue";
import BaseCard from "./BaseCard.vue";
export default {
  name: "TheMain",

  props: {
    media: Array,

    mediaCasts: Array,

    movieTrendings: Array,
    serieTrendings: Array,
    search: Boolean,
  },

  components: {
    HorizontalScroll,
    BaseCard,
  },
};
</script>

<style lang="scss" scoped>
.trendings {
  display: flex;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.h-400 {
  height: 400px;
}

.w-300 {
  width: 300px;
}
</style>
