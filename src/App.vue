<template>
  <div>
    <header class="d-flex justify-content-between px-5">
      <img src="./assets/netflix-logo.png" alt="" id="logo" />
      <div class="input-group mb-3 w-25">
        <input
          v-model="query"
          type="text"
          class="form-control w-25"
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
    </header>
    <div class="container-fluid mt-1 p-5">
      <!-- Movies -->
      <h1 class="text-center text-white" v-show="hasLoaded">Movies</h1>
      <ul class="row">
        <!-- COL -->
        <li class="col p-4" v-for="movie in movies" :key="movie.id">
          <!-- Card -->
          <div @mouseover="setDisplay" class="card p-1 h-100">
            <div
              class="d-flex flex-column justify-content-between h-100"
              v-if="!movie.backdrop_path && !movie.poster_path"
            >
              <!-- Backdrop image -->
              <div>
                <img
                  src="./assets/movie-reel.webp"
                  alt=""
                  class="img-fluid backdrop"
                />
              </div>
              <!-- Movie title -->
              <div class="p-3">
                <strong>{{ movie.title }}</strong>

                <li class="my-2">
                  Titolo originale: {{ movie.original_title }}
                </li>
                <!-- Original language -->
                <li class="my-2">
                  Lingua originale:

                  <img
                    v-if="
                      movie.original_language === 'en' ||
                      movie.original_language === 'it'
                    "
                    :src="
                      require(`./assets/flags/${movie.original_language}.png`)
                    "
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
              </div>
            </div>
            <img
              v-if="!movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`"
              alt=""
            />
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
              alt=""
            />
            <div class="overlay text-white">
              <strong>{{ movie.title }}</strong>

              <li class="my-2">Titolo originale: {{ movie.original_title }}</li>
              <li class="my-2">
                Lingua originale:

                <img
                  v-if="
                    movie.original_language === 'en' ||
                    movie.original_language === 'it'
                  "
                  :src="
                    require(`./assets/flags/${movie.original_language}.png`)
                  "
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
              <div class="overview">
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- TV series -->
      <h1 class="text-center text-white" v-show="hasLoaded">TVSeries</h1>
      <ul class="row">
        <li class="col p-4" v-for="serie in series" :key="serie.id">
          <div class="card d-flex p-1 h-100 d-flex justify-content-between">
            <div class="d-flex justify-content-center">
              <div v-if="!serie.backdrop_path && !serie.poster_path">
                <img src="./assets/movie-reel.webp" alt="" class="img-fluid" />
              </div>

              <img
                v-if="!serie.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${serie.backdrop_path}`"
                alt=""
              />
              <img
                v-if="serie.poster_path"
                :src="`https://image.tmdb.org/t/p/w342${serie.poster_path}`"
                alt=""
              />
            </div>

            <div>
              <strong>{{ serie.name }}</strong>

              <li class="my-2">Titolo originale: {{ serie.original_name }}</li>
              <li class="my-2">
                Lingua originale:

                <img
                  v-if="
                    serie.original_language === 'en' ||
                    serie.original_language === 'it'
                  "
                  :src="
                    require(`./assets/flags/${serie.original_language}.png`)
                  "
                  :alt="serie.original_language"
                  class="flag"
                />
                <p v-else>Lingua originale: {{ serie.original_language }}</p>
              </li>
              <li class="my-2">
                Voto:
                <i
                  v-for="(star, i) in 5"
                  :key="star.id"
                  class="fa-solid fa-star"
                  :class="{
                    'text-warning': i < Math.ceil(serie.vote_average / 2),
                  }"
                ></i>
              </li>
            </div>
          </div>
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
      baseURI: "https://api.themoviedb.org/3/search",
      apiKey: "8f030f64cafc8883928f433bfac05217",
      query: "",
      hasLoaded: false,
      movies: [],
      series: [],
    };
  },
  components: {},
  methods: {
    callAPI() {
      if (!this.query) return;
      axios
        .get(
          `${this.baseURI}/movie?api_key=${this.apiKey}&query=${this.query},`
        )
        .then((res) => {
          this.movies = res.data.results;
          this.hasLoaded = true;
        });
      axios
        .get(`${this.baseURI}/tv?api_key=${this.apiKey}&query=${this.query}`)
        .then((res) => {
          this.series = res.data.results;
          this.hasLoaded = true;
          this.query = "";
        });
    },
    setDisplay() {
      console.log("CI sono");
      this.show = true;
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
.flag {
  width: 40px;
  margin-left: 5px;
}
.col {
  //border: 3px red solid;
  min-width: calc(100% / 5);
  .reel {
    margin: 95px 0;
  }
}
ul {
  list-style: none;
}
body {
  background-color: #313131;
}

header {
  height: 100px;
  line-height: 100px;
  background-color: #1c1c1c;
}

.debug {
  border: 1px red solid;
}

.card {
  max-height: 500px;
  overflow: hidden;
  cursor: pointer;
  img {
    min-height: 100%;
  }
  .overview {
    overflow: scroll;
    max-height: 80%;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  &:hover .overlay {
    opacity: 1;
  }
}

.form-control {
  min-height: 75%;
  margin: auto 0;
  padding: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.8);
  padding: 20px;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.8s;
}

.backdrop {
  filter: opacity(0.3);
}
</style>
