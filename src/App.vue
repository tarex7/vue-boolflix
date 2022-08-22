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
          `${this.baseURI}/${searchType}/${mediaType}?api_key=${this.apiKey}${param}&language=it-IT,`
        )
        .then((res) => {
          this.media = res.data.results;
          this.getCast(mediaType);
        });
    },
    getCast(mediaType) {
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
              genreName[i] = "Azione & Avventura";
              break;
            case 28:
              genreName[i] = "Azione";
              break;
            case 12:
              genreName[i] = "Avventure";
              break;

            case 16:
              genreName[i] = "Animazione";
              break;
            case 35:
              genreName[i] = "Commedia";
              break;
            case 80:
              genreName[i] = "Crimine";
              break;
            case 99:
              genreName[i] = "Documentario";
              break;
            case 18:
              genreName[i] = "Drammatico";
              break;
            case 10751:
              genreName[i] = "Famiglia";
              break;
            case 14:
              genreName[i] = "Fantasy";
              break;
            case 10762:
              genreName[i] = "Ragazzi";
              break;
            case 9648:
              genreName[i] = "Mistero";
              break;
            case 36:
              genreName[i] = "Storia";
              break;
            case 27:
              genreName[i] = "Horror";
              break;

            case 10763:
              genreName[i] = "Notizie";
              break;
            case 10402:
              genreName[i] = "Musica";
              break;
            case 10764:
              genreName[i] = "Reality";
              break;
            case 10749:
              genreName[i] = "Romantico";
              break;
            case 10765:
              genreName[i] = "Fantascienza & Fantasy";
              break;
            case 878:
              genreName[i] = "Fantascienza";
              break;
            case 10766:
              genreName[i] = "Soap";
              break;
            case 10767:
              genreName[i] = "Talk";
              break;
            case 10770:
              genreName[i] = "Film TV";
              break;
            case 53:
              genreName[i] = "Thriller";
              break;
            case 10752:
              genreName[i] = "Guerra";
              break;
            case 10768:
              genreName[i] = "Guerra & Politica";
              break;
            case 37:
              genreName[i] = "Western";
          }
        }
      });
    },

    showHome() {
      this.media = [];
      this.search = false;
      this.mediaCasts = [];
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
