<template>
  <!-- Header -->
  <header class="d-flex justify-content-between align-items-center">
    <!-- Logo -->
    <img
      @click="$emit('home')"
      src="../assets/netflix-logo.png"
      alt="logo"
      id="logo"
    />

    <div class="input-group">
      <!-- Select media to search-->
      <BaseSelect
        v-on="$listeners"
        @selection="setSearchMedia"
        :genres="selectedMedia"
        selectedOption="Cerca in..."
      />
      <!-- Select genres -->
      <BaseSelect
        :searchMedia="searchMedia"
        searchType="discover"
        @selection="set"
        :genres="genres"
        selectedOption="Seleziona genere..."
      />

      <!-- Search media-->
      <SearchBar
        :searchMedia="searchMedia"
        placeholder="Cerca..."
        v-on="$listeners"
        class="ms-2"
      ></SearchBar>
    </div>
  </header>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import BaseSelect from "../components/BaseSelect.vue";
export default {
  name: "BaseHeader",
  data() {
    return {
      selected: "Seleziona un genere",
      query: "",
      selectedMedia: [{ genreName: "Serie TV" }, { genreName: "Film" }],
      searchMedia: "",
    };
  },
  props: {
    genres: Array,
    TVgenres: Array,
  },
  components: { SearchBar, BaseSelect },
  methods: {
    setSearchMedia(selected) {
      selected.genreName === "Film"
        ? (this.searchMedia = "movie")
        : (this.searchMedia = "tv");
    },
    set(selected) {
      this.$emit(
        "selectedGenre",
        "discover",
        this.searchMedia,
        `&with_genres=${selected.genreID}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 50px;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  padding: 0;
}

#logo {
  width: 5%;
  cursor: pointer;
  margin-left: 35px;
}

.input-group {
  width: 70%;
  display: flex;
  justify-content: end;
  padding-right: 10px;
  height: 30px;
}
</style>
