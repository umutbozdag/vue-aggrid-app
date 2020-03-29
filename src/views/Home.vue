
<template>
  <div class="home">
    <div class="home-top">
      <h1 class="title">Zeo Interview</h1>
      <button @click="toggleMode()">
        <i class="far fa-moon theme-icon"></i>
      </button>
    </div>
    <grid />
    <modal />
  </div>
</template>

<script>
import Grid from "../components/Grid";
import Modal from "../components/Modal";
import { bus } from "../main";
import { changeTheme } from "../helpers/changeTheme";

export default {
  name: "Home",

  components: {
    Grid,
    Modal
  },

  methods: {
    toggleMode() {
      changeTheme();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.home {
  height: 100%;
  margin: 0;
  background: var(--home-bg-color);
  border-radius: 6px;
  margin: 24px;
  box-shadow: 0px 2px 6px rgba(49, 49, 77, 0.04);
  &-top {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .title {
    color: var(--home-title-color);
    margin-left: 24px;
  }

  button {
    margin-right: 24px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--home-title-color);
  }
}
</style>
