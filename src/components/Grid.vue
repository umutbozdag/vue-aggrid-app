
<template>
  <div class="grid">
    <ag-grid-vue
      v-on:event-open-modal="deneme($event)"
      id="myGrid"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="multiple"
      pagination="true"
      :paginationPageSize="paginationPageSize"
      :defaultColDef="defaultColDefs"
      :gridOptions="gridOptions"
      @cellClicked="onCellClicked"
      headerHeight="48"
      :frameworkComponents="frameworkComponents"
      :context="context"
      @grid-ready="onGridReady"
      :suppressPaginationPanel="true"
      @pagination-changed="onPaginationChanged"
      :suppressScrollOnNewData="true"
    ></ag-grid-vue>

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
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community";
import axios from "axios";
import star from "../assets/star.svg";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import SearchVolumeRenderer from "./SearchVolumeRenderer";
import RankRenderer from "./RankRenderer";
import RankChangeRenderer from "./RankChangeRenderer";
import LandingPageRenderer from "./LandingPageRenderer";
import KeywordRenderer from "./KeywordRenderer";
import PixelRankChangeRenderer from "./PixelRankChangeRenderer";
import CpcRenderer from "./CpcRenderer.vue";
import CustomHeader from "./CustomHeader";

import {
  setText,
  setLastButtonDisabled,
  setRowData
} from "../helpers/pagination";

export default {
  name: "Grid",

  components: {
    AgGridVue
  },
  data() {
    return {
      paginationPageSize: 20,
      gridOptions: {},
      gridApi: null,
      gridColumnApi: null,
      columnDefs: null,
      rowData: null,
      frameworkComponents: null,
      context: null,

      defaultColDefs: {
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        filter: true,
        unSortIcon: false
      }
    };
  },

  methods: {
    onPageSizeChanged(newPageSize) {
      var value = document.getElementById("page-size").value;
      this.gridApi.paginationSetPageSize(Number(value));
    },

    onPaginationChanged() {
      console.log("onPaginationPageLoaded");
      if (this.gridApi) {
        setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
        setText("#lbPageSize", this.gridApi.paginationGetPageSize());
        setText("#lbCurrentPage", this.gridApi.paginationGetCurrentPage() + 1);
        setText("#lbTotalPages", this.gridApi.paginationGetTotalPages());
        setLastButtonDisabled(!this.gridApi.paginationIsLastPageFound());
      }
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
      this.gridApi.paginationGoToNextPage();
    },
    onBtPrevious() {
      this.gridApi.paginationGoToPreviousPage();
    },
    onCellClicked(event) {
      console.log("clicked", event);
    },

    deneme(event) {
      console.log("myevent", event);
      console.log("deneme");
    },

    onGridReady(params) {
      console.log("on grid ready", params);
    },
    refresh() {
      return true;
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.gridOptions.rowHeight = 56;
  },

  beforeMount() {
    this.columnDefs = [
      {
        headerName: "KEYWORDS",
        field: "keyword",
        cellRendererFramework: KeywordRenderer,
        width: 300
      },
      {
        headerName: "SEARCH VOLUME",
        field: "avgSearchVolume",
        onCellClicked: function() {
          console.log("CLICKED");
        },
        cellRendererFramework: SearchVolumeRenderer,
        cellRendererParams: { showModal: true },
        width: 200
      },
      {
        headerName: "RANK",
        field: "rank",
        cellRendererFramework: RankRenderer,
        width: 150
      },
      {
        headerName: "CHANGE",
        field: "diffRank",
        cellRendererFramework: RankChangeRenderer,

        width: 150
      },
      {
        headerName: "PX RANK",
        field: "pixelRank"
      },
      {
        headerName: "CHANGE",
        field: "diffPixelRank",
        cellRendererFramework: PixelRankChangeRenderer
      },
      {
        headerName: "URL-PAGE",
        field: "landingPage",
        cellRendererFramework: LandingPageRenderer,
        width: 400
      },
      {
        headerName: "CPC-$",
        field: "cpc",
        flex: 1,
        cellRendererFramework: CpcRenderer
      }
    ];
    this.context = { componentParent: this };

    this.frameworkComponents = {
      searchVolumeRenderer: SearchVolumeRenderer,
      rankRenderer: RankRenderer,
      rankChangeRenderer: RankChangeRenderer,
      landingPageRenderer: LandingPageRenderer,
      keywordRenderer: KeywordRenderer,
      pixelRankChangeRenderer: PixelRankChangeRenderer,
      cpcRenderer: CpcRenderer,
      agColumnHeader: CustomHeader
    };

    axios
      .post("http://95.217.76.23:5454/api/list_keyword_info_for_domain", {
        firstDate: "2020-02-25",
        lastDate: "2020-02-20",
        domain: "akakce.com",
        limit: "100",
        page: 1
      })
      .then(result => {
        console.log(result.data);
        this.rowData = result.data;
      });
  }
};
</script>

<style lang="scss">
@import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
@import "../../node_modules/ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham-mixin";
@import "../styles/variables.scss";
@import "../styles/grid.scss";

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-right: 5%;
  font-weight: 600;
  font-size: 16px;
  color: #6b6b99;
  padding: 6px;
}

.options {
  border: 1px solid #e2e1eb;
  padding: 4px;
  border-radius: 4px;
  margin-right: 16px;
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
  color: #6b6b99;
  width: 60px;
}

option {
  appearance: none;
  font-weight: bold;
}

.pagination-icon {
  background: transparent;
  border: 1px solid #e3e3fc;
  padding: 6px;
  border-radius: 4px;
  font-size: 16px;
  width: 20px;
  text-align: center;
  cursor: pointer;
}

.current-page {
  margin: 0 12px;
  border: 1px solid #e2e1eb;
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
