.
<template>
  <div class="baseSelect">
    <!-- Select -->
    <select
      v-model="selected"
      @change="
        $emit('selection', selected, 'discover', searchMedia, '&with_genres=')
      "
      class="form-select me-3"
    >
      <option selected>{{ selectedOption }}</option>
      <option v-for="genre in genres" :key="genre.name" :value="genre">
        {{ genre.genreName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      selected: this.selectedOption,
    };
  },
  props: {
    genres: Array,
    selectedOption: String,
    searchMedia: String,
    searchType: String,
  },
};
</script>

<style lang="scss" scoped>
.form-select {
  height: 80%;
  padding: 0;
  width: 200px;
  margin-top: 3px;
}
</style>
