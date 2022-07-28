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
      <!-- Movies -->
      <h1 class="text-center" v-show="hasLoaded">Movies</h1>
      <ul>
        <li v-for="movie in searchedMovies" :key="movie.id">
          <strong>{{ movie.title }}</strong>
          <ul>
            <li class="my-2">Titolo originale: {{ movie.original_title }}</li>
            <li class="my-2">
              Lingua originale:
              {{ movie.original_language }}
              <img
                v-if="
                  movie.original_language === 'en' ||
                  movie.original_language === 'it'
                "
                :src="require(`./assets/flags/${movie.original_language}.png`)"
                :alt="movie.original_language"
              />
            </li>
            <li class="my-2">Voto: {{ movie.vote_average }}</li>
          </ul>
        </li>
      </ul>
      <!-- TV series -->
      <h1 class="text-center" v-show="hasLoaded">Tv Series</h1>
      <ul>
        <li v-for="TVSerie in searchedTV" :key="TVSerie.id">
          <strong>{{ TVSerie.name }}</strong>
          <ul>
            <li class="my-2">Titolo originale: {{ TVSerie.original_name }}</li>
            <li class="my-2">
              Lingua originale:
              {{ TVSerie.original_language }}
              <img
                v-if="
                  TVSerie.original_language === 'en' ||
                  TVSerie.original_language === 'it'
                "
                :src="
                  require(`./assets/flags/${TVSerie.original_language}.png`)
                "
                :alt="TVSerie.original_language"
              />
            </li>
            <li class="my-2">Voto: {{ TVSerie.vote_average }}</li>
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
      hasLoaded: false,
      searchedMovies: [],
      searchedTV: [],
    };
  },
  components: {},
  methods: {
    callAPI() {
      if (!this.searchQuery) return;
      axios
        .get(
          `${this.baseURI}/movie?api_key=${this.apiKey}&query=${this.searchQuery},`
        )
        .then((res) => {
          this.searchedMovies = res.data.results;
          this.hasLoaded = true;
        });
      axios
        .get(
          `${this.baseURI}/tv?api_key=${this.apiKey}&query=${this.searchQuery}`
        )
        .then((res) => {
          this.searchedTV = res.data.results;
          this.hasLoaded = true;
          this.searchQuery = "";
        });
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
img {
  width: 40px;
  margin-left: 5px;
}
</style>
