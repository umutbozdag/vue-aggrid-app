<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/variables.scss";

#app {
  font-family: "Barlow", sans-serif;
  background: $app-bg-color;
  padding: 4px;
}
body {
  margin: 0;
  padding: 0;
}
</style>
