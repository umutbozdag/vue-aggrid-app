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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
}

.star-icon {
  margin: 0 12px;
}
</style>