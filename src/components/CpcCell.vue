<template>
  <span>{{this.params.value.toFixed(2)}}</span>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "CpcCell"
});
</script>

<style lang="scss" scoped>
span {
  margin-left: 24px;
}
</style>