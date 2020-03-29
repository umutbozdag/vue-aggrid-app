
<template>
  <div class="home">
    <h1 class="title">Zeo Interview</h1>
    <grid />
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
@import "../styles/variables.scss";

.home {
  height: 100%;
  margin: 0;
  background: $home-bg-color;
  border-radius: 6px;
  margin: 24px;
  box-shadow: 0px 2px 6px rgba(49, 49, 77, 0.04);
  .title {
    color: $home-title-color;
    margin-left: 24px;
    padding-top: 24px;
  }
}
</style>
