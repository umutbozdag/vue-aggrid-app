
<template>
  <div class="home">
    <h1>Zeo Interview</h1>
    <div class="home__container">
      <grid />
    </div>
  </div>
</template>

<script>
import Grid from "../components/Grid";

export default {
  name: "Home",

  components: {
    Grid
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
