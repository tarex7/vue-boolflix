<template>
  <div>
    <!-- Header -->
    <header class="d-flex justify-content-between px-5">
      <!-- Logo -->
      <img src="./assets/netflix-logo.png" alt="" id="logo" />

      <div class="input-group mb-3 w-25">
        <!-- Select -->
        <select
          v-model="selected"
          @change="filterMovieByGenre"
          class="form-select w-25 me-3"
          aria-label="Default select example"
        >
          <option selected>Seleziona un genere</option>
          <option v-for="genre in genres" :key="genre.name" :value="genre">
            {{ genre.genreName }}
          </option>
        </select>
        <!-- Search bar -->
        <input
          v-model="query"
          type="text"
          class="form-control w-25"
          placeholder="Search something..."
        />
        <!-- Search button -->
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
      <h1 class="text-center text-white" v-show="hasLoaded">Moviesss</h1>
      <ul class="row">
        <!-- COL -->
        <li class="col p-4" v-for="(movie, i) in movies" :key="movie.id">
          <!-- Card -->
          <div class="card p-1 h-100">
            <!-- Backdrop -->
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
              <!--Backfrop Movie title -->
              <div class="p-3">
                <strong>{{ movie.title }} </strong>

                <li class="my-2">
                  Titolo originale: {{ movie.original_title }}
                </li>
                <!--Backdrop Original language -->
                <li class="my-2">
                  <!-- Original Language -->
                  Lingua originale:
                  <!-- Flag image -->
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
                <!-- Vote -->
                <li class="my-2">
                  Voto:
                  <i
                    v-for="(star, i) in 5"
                    :key="star.id"
                    class="fa-solid fa-star ms-1"
                    :class="{
                      'text-warning': i < Math.ceil(movie.vote_average / 2),
                    }"
                  ></i>
                </li>
              </div>
            </div>
            <!-- Backdrop end -->

            <img
              v-if="!movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`"
              alt=""
            />
            <!-- Movie poster -->
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
              alt=""
            />
            <!--Movie Overlay -->
            <div class="overlay text-white">
              <!-- Movie  -->
              <!-- Movie title -->
              <h5 class="m-0">{{ movie.title }}</h5>
              <!-- Original title -->
              <li class="m-0">
                <strong>Titolo originale:</strong> {{ movie.original_title }}
              </li>
              <!-- Original language -->
              <li class="m-0">
                <strong>Lingua originale: </strong>
                <!-- Flags image -->
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
                <!-- Original language -->
                <p class="m-0" v-else>
                  <strong>Lingua originale: </strong>
                  {{ movie.original_language }}
                </p>
              </li>
              <!-- Year -->
              <li class="m-0">
                <strong>Anno:</strong> {{ movie.release_date.split("-")[0] }}
              </li>
              <!-- Genre -->
              <li class="m-0">
                <strong>Genere:</strong>
                <span
                  class="m-0"
                  v-for="genre in movie.genre_ids"
                  :key="genre.id"
                >
                  {{ genre }},
                </span>
              </li>
              <!-- Vote -->
              <li class="m-0">
                <strong>Voto:</strong>
                <!-- Stars -->
                <i
                  v-for="(star, i) in 5"
                  :key="star.id"
                  class="fa-solid fa-star ms-1"
                  :class="{
                    'text-warning': i < Math.ceil(movie.vote_average / 2),
                  }"
                ></i
                ><br />
                <!-- Total votes -->
                <strong>Voti totali:</strong> {{ movie.vote_count }}
              </li>
              <div class="m-0">
                <p class="m-0"><strong>Cast:</strong></p>
                <!-- Cast -->
                <span
                  v-for="actor in allMovieCasts[i]"
                  :key="actor.name"
                  class="m-0"
                >
                  {{ actor.name }},
                </span>
              </div>
              <!-- Overview -->
              <p class="m-0"><strong>Overview:</strong></p>
              <div class="overview">
                <p class="m-0">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- TV series -->
      <h1 class="text-center text-white" v-show="hasLoaded">TVSeries</h1>
      <ul class="row">
        <!-- COL -->
        <li class="col p-4" v-for="(serie, i) in series" :key="serie.id">
          <!-- Card -->
          <div class="card p-1 h-100">
            <!-- Backdrop -->
            <div
              class="d-flex flex-column justify-content-between h-100"
              v-if="!serie.backdrop_path && !serie.poster_path"
            >
              <!-- Backdrop image -->
              <div>
                <img
                  src="./assets/movie-reel.webp"
                  alt=""
                  class="img-fluid backdrop"
                />
              </div>
              <!--Backdrop Movie title -->
              <div class="p-3">
                <strong>{{ serie.title }} </strong>

                <li class="my-2">
                  Titolo originale: {{ serie.original_title }}
                </li>
                <!--Backdrop Original language -->
                <li class="my-2">
                  <!-- Original Language -->
                  Lingua originale:
                  <!-- Flag image -->
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
                <!-- Vote -->
                <li class="my-2">
                  Voto:
                  <i
                    v-for="(star, i) in 5"
                    :key="star.id"
                    class="fa-solid fa-star ms-1"
                    :class="{
                      'text-warning': i < Math.ceil(serie.vote_average / 2),
                    }"
                  ></i>
                </li>
              </div>
            </div>
            <!-- Backdrop end -->

            <img
              v-if="!serie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${serie.backdrop_path}`"
              alt=""
            />
            <!-- serie poster -->
            <img
              v-if="serie.poster_path"
              :src="`https://image.tmdb.org/t/p/w342${serie.poster_path}`"
              alt=""
            />
            <!--serie Overlay -->
            <div class="overlay text-white">
              <!-- serie  -->
              <!-- serie title -->
              <h5 class="m-0">{{ serie.title }}</h5>
              <!-- Original title -->
              <li class="m-0">
                <strong>Titolo originale:</strong> {{ serie.original_title }}
              </li>
              <!-- Original language -->
              <li class="m-0">
                <strong>Lingua originale: </strong>
                <!-- Flags image -->
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
                <!-- Original language -->
                <p class="m-0" v-else>
                  <strong>Lingua originale: </strong>
                  {{ serie.original_language }}
                </p>
              </li>
              <!-- Year -->
              <li class="m-0">
                <strong>Anno:</strong> {{ serie.first_air_date.split("-")[0] }}
              </li>
              <!-- Genre -->
              <li class="m-0">
                <strong>Genere:</strong>
                <span
                  class="m-0"
                  v-for="genre in serie.genre_ids"
                  :key="genre.id"
                >
                  {{ genre }},
                </span>
              </li>
              <!-- Vote -->
              <li class="m-0">
                <strong>Voto:</strong>
                <!-- Stars -->
                <i
                  v-for="(star, i) in 5"
                  :key="star.id"
                  class="fa-solid fa-star ms-1"
                  :class="{
                    'text-warning': i < Math.ceil(serie.vote_average / 2),
                  }"
                ></i
                ><br />
                <!-- Total votes -->
                <strong>Voti totali:</strong> {{ serie.vote_count }}
              </li>
              <div class="m-0">
                <p class="m-0"><strong>Cast:</strong></p>
                <!-- Cast -->
                <span
                  v-for="actor in allSerieCasts[i]"
                  :key="actor.name"
                  class="m-0"
                >
                  {{ actor.name }},
                </span>
              </div>
              <!-- Overview -->
              <p class="m-0"><strong>Overview:</strong></p>
              <div class="overview">
                <p class="m-0">{{ serie.overview }}</p>
              </div>
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
      baseURI: "https://api.themoviedb.org/3",
      apiKey: "8f030f64cafc8883928f433bfac05217",
      query: "",
      hasLoaded: false,

      movies: [],
      moviesID: [],
      allMovieCasts: [],
      allMovieGenres: [],
      moviesGenreID: [],

      series: [],
      seriesID: [],
      allSerieCasts: [],
      allSerieGenres: [],
      seriesGenreID: [],
      i: 0,

      genres: [],
      TVgenres: [],
      selected: "Seleziona un genere",
    };
  },
  components: {},
  computed: {},
  methods: {
    callAPI() {
      if (!this.query) return;
      this.allSerieCasts = [];
      this.i++;
      console.log(this.i);
      console.log("serie cast", this.allSerieCasts);
      this.allMovieCasts = [];
      console.log("movie cast", this.allMovieCasts);

      this.movies = [];
      this.moviesID = [];
      //Get movies
      axios
        .get(
          `${this.baseURI}/search/movie?api_key=${this.apiKey}&query=${this.query},`
        )
        .then((res) => {
          this.movies = res.data.results;
          this.hasLoaded = true;
          this.query = "";
          this.allMovieGenres = [];

          this.movies.forEach((movie) => {
            this.moviesID.push(movie.id);
            this.moviesGenreID.push(movie.genre_ids);
          });
          this.movies.forEach((movie) => {
            this.allMovieGenres.push(movie.genre_ids);
          });
          this.moviesID.forEach((ID, i) => {
            axios
              .get(`${this.baseURI}/movie/${ID}/casts?api_key=${this.apiKey}`)
              .then((res) => {
                this.allMovieCasts.push(res.data.cast);
                const cast = this.allMovieCasts[i];
                cast.splice(5);
                this.hasLoaded = true;
                this.query = "";
              });
          });
          this.allMovieGenres.forEach((genreName) => {
            for (let i = 0; i < genreName.length; i++) {
              switch (genreName[i]) {
                case 28:
                  genreName[i] = "Action";
                  break;
                case 12:
                  genreName[i] = "Adventure";
                  break;
                case 16:
                  genreName[i] = "Animation";
                  break;
                case 35:
                  genreName[i] = "Comedy";
                  break;
                case 80:
                  genreName[i] = "Crime";
                  break;
                case 99:
                  genreName[i] = "Documentary";
                  break;
                case 18:
                  genreName[i] = "Drama";
                  break;
                case 10751:
                  genreName[i] = "Family";
                  break;
                case 14:
                  genreName[i] = "Fantasy";
                  break;
                case 36:
                  genreName[i] = "History";
                  break;
                case 27:
                  genreName[i] = "Horror";
                  break;
                case 10402:
                  genreName[i] = "Music";
                  break;
                case 9648:
                  genreName[i] = "Mistery";
                  break;
                case 10749:
                  genreName[i] = "Romance";
                  break;
                case 878:
                  genreName[i] = "Science Fiction";
                  break;
                case 10770:
                  genreName[i] = "TV Movie";
                  break;
                case 53:
                  genreName[i] = "Thriller";
                  break;
                case 10752:
                  genreName[i] = "War";
                  break;
                case 37:
                  genreName[i] = "Western";
                  break;
              }
            }
          });
        });
      //Get series

      axios
        .get(
          `${this.baseURI}/search/tv?api_key=${this.apiKey}&query=${this.query}`
        )
        .then((res) => {
          this.series = res.data.results;
          this.hasLoaded = true;
          this.query = "";
          this.allSerieGenres = [];

          this.series.forEach((serie) => {
            this.seriesID.push(serie.id);
            this.seriesGenreID.push(serie.genre_ids);
          });
          this.series.forEach((serie) => {
            console.log(serie.genre_ids);
            this.allSerieGenres.push(serie.genre_ids);
          });

          this.seriesID.forEach((ID, i) => {
            axios
              .get(`${this.baseURI}/tv/${ID}/credits?api_key=${this.apiKey}`)
              .then((res) => {
                console.log(res.data.cast);
                this.allSerieCasts.push(res.data.cast);
                const cast = this.allSerieCasts[i];
                cast.splice(5);
                console.log(cast);
                this.hasLoaded = true;
                this.query = "";
              });
          });
          this.allSerieGenres.forEach((genreName) => {
            for (let i = 0; i < genreName.length; i++) {
              switch (genreName[i]) {
                case 10759:
                  genreName[i] = "Action & Adventure";
                  break;
                case 16:
                  genreName[i] = "Animation";
                  break;
                case 35:
                  genreName[i] = "Comedy";
                  break;
                case 80:
                  genreName[i] = "Crime";
                  break;
                case 99:
                  genreName[i] = "Documentary";
                  break;
                case 18:
                  genreName[i] = "Drama";
                  break;
                case 10751:
                  genreName[i] = "Family";
                  break;
                case 10762:
                  genreName[i] = "Kids";
                  break;
                case 9648:
                  genreName[i] = "Mistery";
                  break;
                case 10763:
                  genreName[i] = "News";
                  break;
                case 10764:
                  genreName[i] = "Reality";
                  break;
                case 10765:
                  genreName[i] = "Sci-Fi & Fantasy";
                  break;
                case 10766:
                  genreName[i] = "Soap";
                  break;
                case 10767:
                  genreName[i] = "Talk";
                  break;
                case 10768:
                  genreName[i] = "War & Politics";
                  break;
                case 37:
                  genreName[i] = "Western";
                  break;
              }
            }
          });
        });
    },
    filterMovieByGenre() {
      axios
        .get(
          `${this.baseURI}/discover/movie?api_key=${this.apiKey}&with_genres=${this.selected.genreID}`
        )
        .then((res) => {
          this.movies = res.data.results;
          this.hasLoaded = true;
          this.movies.forEach((movie) => {
            this.moviesID.push(movie.id);
            this.moviesGenreID.push(movie.genre_ids);
          });
          this.movies.forEach((movie) => {
            this.allMovieGenres.push(movie.genre_ids);
          });
          this.moviesID.forEach((ID, i) => {
            axios
              .get(`${this.baseURI}/movie/${ID}/casts?api_key=${this.apiKey}`)
              .then((res) => {
                this.allSerieCasts.push(res.data.cast);
                const cast = this.allSerieCasts[i];
                cast.splice(5);
                this.hasLoaded = true;
                this.query = "";
              });
          });

          this.allSerieGenres.forEach((genreName) => {
            for (let i = 0; i < genreName.length; i++) {
              switch (genreName[i]) {
                case 28:
                  genreName[i] = "Action";
                  break;
                case 12:
                  genreName[i] = "Adventure";
                  break;
                case 16:
                  genreName[i] = "Animation";
                  break;
                case 35:
                  genreName[i] = "Comedy";
                  break;
                case 80:
                  genreName[i] = "Crime";
                  break;
                case 99:
                  genreName[i] = "Documentary";
                  break;
                case 18:
                  genreName[i] = "Drama";
                  break;
                case 10751:
                  genreName[i] = "Family";
                  break;
                case 14:
                  genreName[i] = "Fantasy";
                  break;
                case 36:
                  genreName[i] = "History";
                  break;
                case 27:
                  genreName[i] = "Horror";
                  break;
                case 10402:
                  genreName[i] = "Music";
                  break;
                case 9648:
                  genreName[i] = "Mistery";
                  break;
                case 10749:
                  genreName[i] = "Romance";
                  break;
                case 878:
                  genreName[i] = "Science Fiction";
                  break;
                case 10770:
                  genreName[i] = "TV Movie";
                  break;
                case 53:
                  genreName[i] = "Thriller";
                  break;
                case 10752:
                  genreName[i] = "War";
                  break;
                case 37:
                  genreName[i] = "Western";
                  break;
              }
            }
          });
        });
    },
  },
  mounted() {
    axios
      .get(`${this.baseURI}/genre/movie/list?api_key=${this.apiKey}`)
      .then((res) => {
        res.data.genres.forEach((genre) => {
          this.genres.push({ genreName: genre.name, genreID: genre.id });
          console.log(genre);
        });
        console.log(this.genres);
      });
    axios
      .get(`${this.baseURI}/genre/movie/list?api_key=${this.apiKey}`)
      .then((res) => {
        res.data.genres.forEach((genre) => {
          this.TVgenres.push({ genreName: genre.name, genreID: genre.id });
          console.log(this.TVgenres);
        });
        console.log(this.TVgenres);
      });
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
.flag {
  width: 30px;
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
    height: 40%;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
  &:hover .overlay {
    opacity: 1;
  }
}

.form-control,
.form-select {
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
