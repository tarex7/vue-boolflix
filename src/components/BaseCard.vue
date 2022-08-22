.
<template>
  <div class="row">
    <!-- Card -->
    <div class="card h-100" @click="$emit('clicked')">
      <!-- Backdrop -->
      <div
        class="d-flex flex-column justify-content-between h-100"
        v-if="!movie.backdrop_path && !movie.poster_path"
      >
        <!-- Backdrop image -->
        <div>
          <img
            src="../assets/movie-reel.webp"
            alt="backdrop-image"
            class="img-fluid backdrop"
          />
        </div>
        <!--Backdrop Movie title -->
        <div class="p-3">
          <strong>{{ movie.title }} </strong>
          <strong>{{ movie.name }} </strong>

          <li class="my-2" v-if="movie.original_title !== movie.title">
            Titolo originale: <br />
            {{ movie.original_title }}
          </li>
          <!--Backdrop Original language -->
          <li class="my-2" v-if="!movie.original_language">
            <!-- Original Language -->
            Lingua originale:
            <!-- Flag image -->
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
          <!-- Vote -->
          <li class="my-2">
            Voto:
            <i
              v-for="(star, i) in 5"
              :key="star.id"
              class="fa-solid fa-star ms-1"
              :class="{
                'text-warning': i < vote,
              }"
            ></i>
          </li>
        </div>
      </div>
      <!-- Backdrop end -->
      <!-- Movie poster -->
      <img
        v-if="movie.poster_path"
        :src="`${imgBaseURL}${movie.poster_path}`"
        :alt="title"
      />
      <img v-else :src="`${this.imgBaseURL}${movie.backdrop_path}`" alt="" />
      <!--Movie Overlay -->
      <div class="overlay text-white">
        <!-- Movie  -->
        <!-- Movie title -->
        <h5 class="m-0">{{ movie.title }}</h5>
        <h5 class="m-0">{{ movie.name }}</h5>
        <!-- Original title -->
        <li v-if="movie.original_title != movie.title" class="m-0">
          <strong>Titolo originale:</strong> {{ movie.original_title }}
        </li>
        <!-- Original language -->
        <li class="m-0 d-flex align-items-center">
          <strong>Lingua originale: </strong>

          <!-- Flags image -->
          <img
            v-if="
              (movie.original_language,
              movie.original_language === 'en' ||
                movie.original_language === 'it')
            "
            :src="require(`../assets/flags/${movie.original_language}.png`)"
            :alt="movie.original_language"
            class="flag"
          />

          <!-- Original language -->
          <p class="ms-1" v-else>
            {{ movie.original_language }}
          </p>
        </li>
        <strong v-if="movie.origin_country">Paese d'origine: </strong>
        <span v-if="movie.origin_country" :class="`fi fi-${countryFlag}`">
        </span>
        <!-- Year -->
        <li v-if="movie.release_date" class="m-0">
          <strong>Anno:</strong>
          {{ movieDate }}
        </li>
        <li v-if="movie.first_air_date" class="m-0">
          <strong>Anno:</strong>
          {{ serieDate }}
        </li>
        <!-- Genre -->
        <li class="m-0" v-if="search">
          <strong>Genere:</strong>
          <span class="m-0" v-for="(genre, i) in movie.genre_ids" :key="i">
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
              'text-warning': i < vote,
            }"
          ></i
          ><br />
          <!-- Total votes -->
          <strong>Voti totali:</strong> {{ movie.vote_count }}
        </li>
        <div class="m-0">
          <p v-if="movie.cast" class="m-0"><strong>Cast:</strong></p>
          <!-- Cast -->
          <span v-for="(actor, i) in mediaCasts[i]" :key="i" class="m-0">
            {{ actor.name }},
          </span>
        </div>
        <!-- Overview -->
        <p class="m-0" v-if="movie.overview && search">
          <strong>Trama:</strong>
        </p>
        <div class="overview">
          <p class="m-0" v-if="movie.overview && search">
            {{ movie.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";
export default {
  name: "BaseCard",
  data() {
    return {
      imgBaseURL: "https://image.tmdb.org/t/p/w342",
    };
  },
  component: { CountryFlag },
  props: {
    movie: Object,
    i: Number,
    mediaCasts: Array,
    search: Boolean,
    mediaType: String,
  },
  computed: {
    vote() {
      return Math.ceil(this.movie.vote_average / 2);
    },
    movieDate() {
      return this.movie.release_date.split("-")[0];
    },
    serieDate() {
      return this.movie.first_air_date.split("-")[0];
    },
    title() {
      if (this.movie.title) return this.movie.title;
      return this.movie.name;
    },
    countryFlag() {
      return this.movie.origin_country[0].toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.flag {
  width: 20px;
  margin-left: 5px;
}

img {
  border-radius: 5px;
}

p {
  margin: 0;
}

.col {
  max-width: 200px;
  padding: 0;

  .reel {
    margin: 35px 0;
  }
}
ul {
  list-style: none;
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

.overlay {
  position: relative;
  top: -100%;
  left: -0;
  min-width: 200px;
  background-color: rgba($color: #000, $alpha: 0.8);
  padding: 10px;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.8s;
  overflow: scroll;
  min-height: 100%;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.backdrop {
  filter: opacity(0.3);
  min-width: 290px;
}

h5 {
  font-size: 0.9rem;
}
</style>
