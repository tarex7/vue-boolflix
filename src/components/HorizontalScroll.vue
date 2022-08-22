<template>
  <div id="app" class="">
    <h2 class="text-white ms-3">Top movies</h2>
    <horizontal-scroll class="">
      <ul class="row flex-nowrap scroll d-flex align-items-center">
        <li class="col" v-for="(movie, i) in movieTrendings" :key="movie.id">
          <BaseCard
            class="px-1 d-flex justify-content-center h-400 w-300 my-1"
            :movie="movie"
            :i="i"
            :mediaCasts="mediaCasts"
          />
        </li>
      </ul>
    </horizontal-scroll>

    <h2 class="text-white ms-3">Top TV series</h2>
    <horizontal-scroll class="">
      <ul class="row flex-nowrap scroll">
        <li class="col" v-for="(movie, i) in serieTrendings" :key="movie.id">
          <BaseCard
            class="px-1 d-flex justify-content-center h-400 w-300 my-1"
            :movie="movie"
            :i="i"
            :mediaCasts="mediaCasts"
          />
        </li>
      </ul>
    </horizontal-scroll>
  </div>
</template>

<script>
import HorizontalScroll from "vue-horizontal-scroll";
import BaseCard from "./BaseCard.vue";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";

export default {
  name: "App",
  components: {
    HorizontalScroll,
    BaseCard,
  },
  props: { movieTrendings: Array, serieTrendings: Array, mediaCasts: Array },
};
</script>
<style lang="scss" scoped>
.scroll {
  height: 300px;
}

._horizontal-scroll[data-v-5ce095ec]::-webkit-scrollbar {
  display: none;
}

h2 {
  z-index: 5;
  //background-color: rgba($color: #000000, $alpha: 0.7);
  margin-bottom: 10px;
  margin-left: 40px;
  border-radius: 0 5px 5px 0;
  width: 280px;
}

.debug {
  border: 1px red solid;
}

li {
  list-style-type: none;
}

.card {
  min-height: 100%;
  cursor: pointer;
  padding: 0;
  margin: 0;
  img {
    height: 100%;
  }

  &:hover .overlay {
    opacity: 1;
  }
}

.form-control,
.form-select {
  min-height: 50%;
  margin: auto 0;
  padding: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.8);
  padding: 20px;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.8s;
  overflow-y: scroll;
  height: 100%;
  word-break: break-all;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.backdrop {
  filter: opacity(0.3);
  min-width: 300px;
}

.bg-grey {
  background-color: #444;
}

.row {
  padding-left: 20px;
}

.p-absolute {
  position: absolute;
}

.h-400 {
  height: 300px;
}

.w-300 {
  width: 220px;
}
</style>
