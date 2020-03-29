<template>
  <div>
    <div
      v-if="(params.column.colId != 'keyword' && params.column.colId != 'landingPage')"
      class="header-items"
    >
      <div class="header-item">
        <div class="sort-icons">
          <i
            v-if="params.enableSorting"
            @click="onSortRequested('desc', $event)"
            :class="descSort"
            class="fas fa-sort-up icon"
          ></i>
          <i
            v-if="params.enableSorting"
            @click="onSortRequested('asc', $event)"
            :class="ascSort"
            class="customSortDownLabel fas fa-sort-down icon"
          ></i>
        </div>
        <div class="customHeaderLabel">{{params.displayName}}</div>
      </div>
    </div>
    <div class="customHeaderLabel" v-else>{{params.displayName}}</div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "HeaderItem",
  data() {
    return {
      ascSort: null,
      descSort: null,
      noSort: null
    };
  },
  beforeMount() {},
  mounted() {
    this.params.column.addEventListener("sortChanged", this.onSortChanged);
    this.onSortChanged();
  },
  methods: {
    onMenuClicked() {
      this.params.showColumnMenu(this.$refs.menuButton);
    },

    onSortChanged() {
      this.ascSort = this.descSort = this.noSort = "inactive";
      if (this.params.column.isSortAscending()) {
        this.ascSort = "active";
      } else if (this.params.column.isSortDescending()) {
        this.descSort = "active";
      } else {
        this.noSort = "active";
      }
    },

    onSortRequested(order, event) {
      this.params.setSort(order, event.shiftKey);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.header-item {
  display: flex;
  align-items: center;
}

.unsortable {
  cursor: default;
}

.sort-icons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  margin-right: 7px;
  i {
    margin-top: -16px;
    font-size: 20px;
    cursor: pointer;
  }
}
.active {
  color: var(--header-item-active);
}
.inactive {
  color: var(--header-item-inactive);
}
.customHeaderLabel {
  color: var(--custom-header-label);
}
</style>