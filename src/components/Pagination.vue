<template>
  <div class="pagination">
    <span class="per-page">Per page:</span>

    <div class="options">
      <select v-on:change="onPageSizeChanged()" id="page-size">
        <option value="20" selected>20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
      </select>
    </div>
    <i v-on:click="onBtPrevious()" class="fas fa-chevron-left pagination-icon"></i>
    <span class="current-page">{{getCurrentPage()}}</span>
    <i v-on:click="onBtNext()" class="fas fa-chevron-right pagination-icon"></i>
    <span class="total-pages">of {{getTotalPages()}}</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["paginationPageSize", "gridApi"],

  methods: {
    onPageSizeChanged(newPageSize) {
      var value = document.getElementById("page-size").value;
      this.gridApi.paginationSetPageSize(Number(value));
    },
    getTotalPages() {
      if (this.gridApi) {
        return this.gridApi.paginationGetTotalPages();
      }
    },
    getCurrentPage() {
      if (this.gridApi) {
        return this.gridApi.paginationGetCurrentPage() + 1;
      }
    },
    onBtNext() {
      if (this.gridApi) {
        this.gridApi.paginationGoToNextPage();
      }
    },
    onBtPrevious() {
      if (this.gridApi) {
        this.gridApi.paginationGoToPreviousPage();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-right: 5%;
  margin: 16px 5% 16px 0;
  font-weight: 600;
  font-size: 16px;
  color: var(--pagination-color);
  padding: 6px;
}

.options {
  border: 1px solid var(--options-border);
  padding: 4px;
  border-radius: 4px;
  margin-right: 16px;
  background: none;
}
select {
  appearance: none;
  user-select: none;
  padding: 10px;
  outline: none;
  -webkit-padding-start: 9px;
  background-image: url("../assets/chevron_down.svg");
  background-size: 18px;
  background-position: center right;
  background-repeat: no-repeat;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  margin: 0;
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 2px;
  color: var(--select-color);
  width: 60px;
  background-color: transparent;
}

option {
  appearance: none;
  font-weight: bold;
}

.pagination-icon {
  background: transparent;
  border: 1px solid var(--pagination-icon-border);
  padding: 6px;
  border-radius: 4px;
  font-size: 16px;
  width: 20px;
  text-align: center;
  cursor: pointer;
}

.current-page {
  margin: 0 12px;
  border: 1px solid var(--current-page-border);
  padding: 4px;
  border-radius: 4px;
  font-size: 16px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.per-page {
  margin-right: 11px;
}
.total-pages {
  margin-left: 12px;
}
</style>