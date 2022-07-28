<template>
  <div>
    <div class="container mt-5">
      <div class="input-group mb-3">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search something..."
        />
        <div class="input-group-append">
          <button
            @click="callAPI"
            class="btn btn-outline-secondary"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <ul>
        <li v-for="movie in searchedContents" :key="movie.id">
          <strong>{{ movie.title }}</strong>
          <ul>
            <li>Titolo originale {{ movie.original_title }}</li>
            <li>Lingua originale {{ movie.original_language }}</li>
            <li>Voto {{ movie.vote_average }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      searchQuery: "",
      baseURI: "https://api.themoviedb.org/3/search",
      apiKey: "8f030f64cafc8883928f433bfac05217",
      searchedContents: [],
    };
  },
  components: {},
  methods: {
    callAPI() {
      if (!this.searchQuery) return;
      axios
        .get(
          `${this.baseURI}/movie?api_key=${this.apiKey}&query=${this.searchQuery}`
        )
        .then((res) => {
          this.searchedContents = res.data.results;
        });
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
