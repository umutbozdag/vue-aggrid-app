<template>
  <div class="cell-with-icon">
    {{this.params.value}}
    <img class="star-icon" width="18px" src="../assets/star.svg" />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.cell-with-icon {
  width: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: center;
}

.star-icon {
  margin: 0 12px;
}
</style>