<template>
  <div id="app" class="">
    <h2 class="text-white ms-3">Top movies</h2>
    <horizontal-scroll class="">
      <ul class="row flex-nowrap scroll d-flex align-items-center">
        <li class="col" v-for="(movie, i) in movieTrendings" :key="movie.id">
          <BaseCard
            class="px-1 d-flex justify-content-center h-300 w-220 my-1 mx-1 basecard cardHover overlayd"
            :movie="movie"
            :i="i"
            :mediaCasts="mediaCasts"
          />
        </li>
      </ul>
    </horizontal-scroll>

    <h2 class="text-white ms-3">Top TV series</h2>
    <horizontal-scroll class="">
      <ul class="row flex-nowrap scroll d-flex align-items-center">
        <li class="col" v-for="(movie, i) in serieTrendings" :key="movie.id">
          <BaseCard
            class="px-1 d-flex justify-content-center h-300 w-220 my-1 mx-1 basecard cardHover"
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
  height: 350px;
}

._horizontal-scroll[data-v-5ce095ec]::-webkit-scrollbar {
  display: none;
}

h2 {
  margin-bottom: 10px;
  margin-left: 40px;
  width: 280px;
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

.h-300 {
  height: 300px;
}

.w-220 {
  width: 220px;
}

.basecard {
  transition: all 0.3s ease-in-out;
}
.cardHover:hover {
  transform: scale(1.17);
  z-index: 5;
}
</style>
