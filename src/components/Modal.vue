<template>
  <div>
    <div v-if="openModal" id="myModal" class="modal">
      <div class="modal-content">
        <h2>Search Volume</h2>
        <p>{{keyword}}</p>
        <span @click="closeModal()" class="close">&times;</span>

        <chart :volumeData="volumeData"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";
import axios from "axios";
import Chart from "./Chart";

export default {
  name: "Modal",
  components: {
    Chart
  },

  created() {
    bus.$on("open-modal", data => {
      this.keyword = data.data.keyword;
      this.openModal = true;
      axios
        .post("http://95.217.76.23:5454/api/get_specific_search_volume", {
          keyword: data.data.keyword,
          country: "tr",
          lang: "tr"
        })
        .then(result => {
          this.volumeData = result.data;
          console.log(result);
        });
    });
  },

  data() {
    return {
      openModal: false,
      volumeData: [],
      keyword: ""
    };
  },
  methods: {
    closeModal() {
      this.openModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 12px 24px;
  border: 1px solid rgb(12, 12, 12);
  width: 55%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 48px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 24px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>