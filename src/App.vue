<template>
  <div>
    <BaseHeader
      :genres="genres"
      :TVgenres="TVgenres"
      @search="getMediaData"
      @selection="setSearchMedia"
      @home="showHome"
      @selectedGenre="getMediaData"
    />
    <TheMain
      :media="media"
      :mediaCasts="mediaCasts"
      :movieTrendings="movieTrendings"
      :serieTrendings="serieTrendings"
      :search="search"
    />
  </div>
</template>

<script>
import axios from "axios";
import BaseHeader from "./components/BaseHeader.vue";
import TheMain from "./components/TheMain.vue";

export default {
  name: "BoolFlix",
  data() {
    return {
      baseURI: "https://api.themoviedb.org/3",
      apiKey: "8f030f64cafc8883928f433bfac05217",

      media: [],
      mediaID: [],
      mediaCasts: [],
      mediaGenres: [],
      mediaGenreID: [],

      movieTrendings: [],
      serieTrendings: [],

      genres: [],
      TVgenres: [],
      movieGenres: [],

      search: false,
    };
  },
  components: { BaseHeader, TheMain },
  methods: {
    getMediaData(searchType, mediaType, param) {
      this.media = [];
      this.mediaID = [];
      this.mediaCasts = [];
      this.mediaGenres = [];
      this.mediaType = mediaType;

      this.search = true;
      axios
        .get(
          `${this.baseURI}/${searchType}/${mediaType}?api_key=${this.apiKey}${param},`
        )
        .then((res) => {
          this.media = res.data.results;

          this.media.forEach((movie) => {
            this.mediaID.push(movie.id);
          });

          this.media.forEach((movie) => {
            this.mediaGenres.push(movie.genre_ids);
          });

          this.mediaID.forEach((ID, i) => {
            let cast = "casts";
            if (mediaType === "tv") {
              cast = "credits";
            }
            axios
              .get(
                `${this.baseURI}/${mediaType}/${ID}/${cast}?api_key=${this.apiKey}`
              )
              .then((res) => {
                this.mediaCasts.push(res.data.cast);
                const cast = this.mediaCasts[i];
                if (cast && cast.length > 5) {
                  cast.splice(5);
                }
              });
          });
          this.mediaGenres.forEach((genreName) => {
            for (let i = 0; i < genreName.length; i++) {
              switch (genreName[i]) {
                case 10759:
                  genreName[i] = "Action & Adventure";
                  break;
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
                case 10762:
                  genreName[i] = "Kids";
                  break;
                case 9648:
                  genreName[i] = "Mistery";
                  break;
                case 36:
                  genreName[i] = "History";
                  break;
                case 27:
                  genreName[i] = "Horror";
                  break;

                case 10763:
                  genreName[i] = "News";
                  break;
                case 10402:
                  genreName[i] = "Music";
                  break;
                case 10764:
                  genreName[i] = "Reality";
                  break;
                case 10749:
                  genreName[i] = "Romance";
                  break;
                case 10765:
                  genreName[i] = "Sci-Fi & Fantasy";
                  break;
                case 878:
                  genreName[i] = "Science Fiction";
                  break;
                case 10766:
                  genreName[i] = "Soap";
                  break;
                case 10767:
                  genreName[i] = "Talk";
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
                case 10768:
                  genreName[i] = "War & Politics";
                  break;
                case 37:
                  genreName[i] = "Western";
              }
            }
          });
        });
    },

    showHome() {
      this.media = [];
      this.search = false;
    },
    fetchGenres(media, array) {
      axios
        .get(`${this.baseURI}/genre/${media}/list?api_key=${this.apiKey}`)
        .then((res) => {
          res.data.genres.forEach((genre) => {
            array.push({ genreName: genre.name, genreID: genre.id });
          });
        });
    },
    fetchTrendings(media, array) {
      axios
        .get(`${this.baseURI}/trending/${media}/week?api_key=${this.apiKey}`)
        .then((res) => {
          res.data.results.forEach((movie) => {
            array.push(movie);
          });
          this.mediaGenres = [];
        });
    },

    setSearchMedia(selected) {
      this.genres = this.movieGenres;
      if (selected.genreName === "Serie TV") this.genres = this.TVgenres;
    },
  },
  mounted() {
    this.fetchGenres("movie", this.movieGenres);
    this.fetchGenres("tv", this.TVgenres);
    this.fetchTrendings("movie", this.movieTrendings);
    this.fetchTrendings("tv", this.serieTrendings);
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
body {
  background-color: #313131;
  height: 100vh;
}

li {
  list-style: none;
  font-size: 0.7rem;
}
</style>
