
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
      paginationPageSize="20"
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

    <div>
      <button v-on:click="onBtFirst()">To First</button>
      <button v-on:click="onBtLast()" id="btLast">To Last</button>
      <button v-on:click="onBtPrevious()">To Previous</button>
      <button v-on:click="onBtNext()">To Next</button>
      <button v-on:click="onBtPageFive()">To Page 5</button>
      <button v-on:click="onBtPageFifty()">To Page 50</button>
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
    onBtFirst() {
      this.gridApi.paginationGoToFirstPage();
    },
    onBtLast() {
      console.log("here");
      this.gridApi.paginationGoToLastPage();
    },
    onBtNext() {
      this.gridApi.paginationGoToNextPage();
    },
    onBtPrevious() {
      this.gridApi.paginationGoToPreviousPage();
    },
    onBtPageFive() {
      this.gridApi.paginationGoToPage(4);
    },
    onBtPageFifty() {
      this.gridApi.paginationGoToPage(49);
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
</style>
