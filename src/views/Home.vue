
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

  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  h1 {
    margin-left: 24px;
    padding-top: 24px;
  }
  border-radius: 6px;
  height: 100%;
  margin: 0;
}
</style>
