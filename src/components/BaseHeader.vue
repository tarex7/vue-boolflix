.
<template>
  <div>
    <header
      class="d-flex justify-content-between align-items-center px-4 debug"
    >
      <img
        class="img-fluid"
        src="../assets/netflix-logo.png"
        alt=""
        id="logo"
      />
      <div class="mb-3">
        <input
          v-model="searchQuery"
          type="text"
          class=""
          placeholder="Search something..."
        />
        <!-- <div class="input-grou">
          <button
            @click="callAPI"
            class="btn btn-outline-secondary"
            type="button"
          >
            Search
          </button>
        </div> -->
      </div>
    </header>
    <div class="container">
      <!-- Movies -->
      <h1 class="text-center" v-show="hasLoaded">Movies</h1>
      <ul>
        <li v-for="movie in searchedMovies" :key="movie.id">
          <strong>{{ movie.title }}</strong>
          <img
            :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
            alt=""
          />
          <ul>
            <li class="my-2">Titolo originale: {{ movie.original_title }}</li>
            <li class="my-2">
              <img
                v-if="
                  movie.original_language === 'en' ||
                  movie.original_language === 'it'
                "
                :src="require(`../assets/flags/${movie.original_language}.png`)"
                :alt="movie.original_language"
                class="flag"
              />
              <p v-else>Lingua originale: {{ movie.original_language }}</p>
            </li>
            <li class="my-2">
              Voto:
              <i
                v-for="(star, i) in 5"
                :key="star.id"
                class="fa-solid fa-star"
                :class="{
                  'text-warning': i < Math.ceil(movie.vote_average / 2),
                }"
              ></i>
            </li>
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
                  require(`../assets/flags/${TVSerie.original_language}.png`)
                "
                :alt="TVSerie.original_language"
              />
            </li>
            <li class="my-2">
              Voto: <i class="fa-solid fa-star text-success"></i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BaseHeader",
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

<style lang="scss" scoped>
header {
  height: 70px;
  background-color: gray;
  justify-content: space-between;
  #logo {
    width: 10%;
  }
}
.flag {
  width: 40px;
  margin-left: 5px;
}
input {
  height: 50px;
}
</style>
