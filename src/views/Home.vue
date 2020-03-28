
<template>
  <div class="home">
    <h1>Zeo Interview</h1>
    <div class="home__container">
      <grid />
    </div>
    <modal />
  </div>
</template>

<script>
import Grid from "../components/Grid";
import Modal from "../components/Modal";

export default {
  name: "Home",

  components: {
    Grid,
    Modal
  },

  methods: {
    openModal() {
      this.showModal = true;
      console.log(this.params, "MODAL");
      axios
        .post("http://95.217.76.23:5454/api/get_specific_search_volume", {
          keyword: this.params.data.keyword,
          country: "tr",
          lang: "tr"
        })
        .then(result => console.log("specific search volume data", result));
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  h1 {
    margin-left: 24px;
    padding-top: 24px;
  }
  background: rgba(49, 49, 77, 0.03);
  border-radius: 6px;
  height: 100%;
  margin: 0;
  &__container {
  }
}
</style>
