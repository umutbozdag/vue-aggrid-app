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
import { bus } from "../main";

export default Vue.extend({
  name: "SearchVolumeCell",
  data() {
    return {
      showModal: false
    };
  },
  mounted() {},
  methods: {
    openModal() {
      console.log("MODAL", this.params);
      bus.$emit("open-modal", this.params);
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