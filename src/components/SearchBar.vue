.
<template>
  <div class="searchBar d-flex align-items-center">
    <!-- Search bar -->
    <input
      v-model="query"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      @keyup="emit"
    />
    <!-- Search button -->
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      timeoutID: null,
    };
  },
  props: { placeholder: String, searchMedia: String },
  methods: {
    emit() {
      if (!this.searchMedia) {
        return;
      }
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.$emit(
          "search",
          "search",
          this.searchMedia,
          `&query=${this.query}`
        );
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  height: 80%;
  padding: 0;
}
</style>
