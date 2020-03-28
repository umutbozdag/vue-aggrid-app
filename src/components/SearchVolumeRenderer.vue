<template>
  <div>
    <div class="cell-with-icon">
      <img
        role="button"
        @click="openModal()"
        class="opportunity-icon"
        src="../assets/icon-opportunity.svg"
      />
      {{this.params.value.toFixed(1)}}
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  components: {},
  data() {
    return {
      showModal: false
    };
  },
  mounted() {},
  methods: {
    openModal() {
      console.log("MODAL", this.params);
      this.$emit("event-open-modal", true);
    }
  }
});
</script>

<style lang="scss">
.cell-with-icon {
  margin-left: 12px;
  display: flex;
  align-items: center;
  .opportunity-icon {
    margin-right: 12px;
    cursor: pointer;
  }
  .star-icon {
    margin-left: 12px;
  }
}
</style>