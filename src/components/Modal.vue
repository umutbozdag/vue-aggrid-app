<template>
  <div>
    <div @keypress.esc="deneme()" v-if="openModal" id="myModal" class="modal">
      <div class="modal-content">
        <h2 class="modal-title">
          Search Volume
          <span @click="closeModal()" class="close">
            <i class="fas fa-times close"></i>
          </span>
        </h2>
        <p class="modal-keyword">{{keyword}}</p>

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
      console.log("i am working");
      this.openModal = false;
    },
    deneme() {
      console.log("denemee");
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

.modal-title,
.modal-keyword {
  align-self: flex-start;
  margin-left: 5%;
}
.modal-title {
  color: #9999cc;
  padding: 0;
  margin-top: 3%;
  margin-bottom: 0;
}
.modal-keyword {
  color: #6b6b99;
}

.modal-content {
  flex-direction: column;
  background-color: #fefefe;
  margin: 13% auto;
  padding: 12px 24px;
  width: 40%;
  position: relative;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
  overflow-y: scroll;
}

.close {
  font-size: 24px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 3%;
  margin-right: 24px;
  color: #9999cc;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 1440px) {
  .modal-title {
    margin-top: 5%;
  }
  .modal-keyword {
    margin-bottom: 5%;
  }

  .close {
    margin-top: 6%;
  }

  .modal-content {
    width: 50%;
  }
}

@media only screen and (max-width: 1200px) {
  .modal-title {
    margin-top: 7%;
  }

  .close {
    margin-top: 7%;
  }
  .modal-keyword {
    margin-bottom: 10%;
  }
  .modal-content {
    width: 70%;
  }
}

@media only screen and (max-width: 800px) {
  .modal-content {
    width: 90%;
  }
}
</style>