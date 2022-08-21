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
            Titolo originale: {{ movie.original_title }}
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
                'text-warning': i < Math.ceil(movie.vote_average / 2),
              }"
            ></i>
          </li>
        </div>
      </div>
      <!-- Backdrop end -->
      <!-- Movie poster -->
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
        alt=""
      />
      <img
        v-else
        :src="`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`"
        alt=""
      />
      <!--Movie Overlay -->
      <div v-if="search" class="overlay text-white">
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
        <!-- Year -->
        <li v-if="movie.release_date" class="m-0">
          <strong>Anno:</strong>
          {{ movie.release_date.split("-")[0] }}
        </li>
        <li v-if="movie.first_air_date" class="m-0">
          <strong>Anno:</strong>
          {{ movie.first_air_date.split("-")[0] }}
        </li>
        <!-- Genre -->
        <li class="m-0">
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
          <span v-for="(actor, i) in mediaCasts[i]" :key="i" class="m-0">
            {{ actor.name }},
          </span>
        </div>
        <!-- Overview -->
        <p class="m-0" v-if="movie.overview"><strong>Overview:</strong></p>
        <div class="overview">
          <p class="m-0">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: { movie: Object, i: Number, mediaCasts: Array, search: Boolean },
};
</script>

<style lang="scss" scoped>
.flag {
  width: 30px;
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

.debug {
  border: 1px red solid;
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
  &:hover .overlay2 {
    opacity: 1;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 290px;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.8);
  padding: 20px;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.8s;
  overflow: scroll;
  height: 100%;
  word-break: break-all;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.backdrop {
  filter: opacity(0.3);
  min-width: 290px;
}
</style>
