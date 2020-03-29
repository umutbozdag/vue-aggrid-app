
<template>
  <div class="grid">
    <ag-grid-vue
      id="myGrid"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="multiple"
      pagination="true"
      :paginationPageSize="paginationPageSize"
      :defaultColDef="defaultColDefs"
      :gridOptions="gridOptions"
      headerHeight="48"
      :frameworkComponents="frameworkComponents"
      :context="context"
      :suppressPaginationPanel="true"
      rowHeight="56"
    ></ag-grid-vue>

    <pagination :gridApi="gridApi" :paginationPageSize="paginationPageSize" />
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community";
import "ag-grid-enterprise";
import axios from "axios";
import star from "../assets/star.svg";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import SearchVolumeCell from "./SearchVolumeCell";
import RankCell from "./RankCell";
import RankChangeCell from "./RankChangeCell";
import LandingPageCell from "./LandingPageCell";
import KeywordCell from "./KeywordCell";
import PixelRankChangeCell from "./PixelRankChangeCell";
import CpcCell from "./CpcCell.vue";
import HeaderItem from "./HeaderItem";
import Pagination from "./Pagination";
import PixelRankCell from "./PixelRankCell";

export default {
  name: "Grid",

  components: {
    AgGridVue,
    Pagination
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
    getData() {
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}/api/list_keyword_info_for_domain`,
          {
            firstDate: "2020-02-25",
            lastDate: "2020-02-20",
            domain: "akakce.com",
            limit: "100",
            page: 1
          }
        )
        .then(result => {
          this.rowData = result.data;
        });
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },

  beforeMount() {
    // Columns
    this.columnDefs = [
      {
        headerName: "KEYWORDS",
        field: "keyword",
        cellRendererFramework: KeywordCell,
        width: 300
      },
      {
        headerName: "SEARCH VOLUME",
        field: "avgSearchVolume",
        cellRendererFramework: SearchVolumeCell,
        width: 200
      },
      {
        headerName: "RANK",
        field: "rank",
        cellRendererFramework: RankCell,
        width: 150
      },
      {
        headerName: "CHANGE",
        field: "diffRank",
        cellRendererFramework: RankChangeCell,

        width: 150
      },
      {
        headerName: "PX RANK",
        field: "pixelRank",
        cellRendererFramework: PixelRankCell
      },
      {
        headerName: "CHANGE",
        field: "diffPixelRank",
        cellRendererFramework: PixelRankChangeCell
      },
      {
        headerName: "URL-PAGE",
        field: "landingPage",
        cellRendererFramework: LandingPageCell,
        width: 400
      },
      {
        headerName: "CPC-$",
        field: "cpc",
        cellRendererFramework: CpcCell,
        width: 280
      }
    ];

    this.frameworkComponents = {
      searchVolumeRenderer: SearchVolumeCell,
      rankRenderer: RankCell,
      rankChangeRenderer: RankChangeCell,
      landingPageRenderer: LandingPageCell,
      keywordRenderer: KeywordCell,
      pixelRankChangeRenderer: PixelRankChangeCell,
      cpcRenderer: CpcCell,
      pixelRankCell: PixelRankCell,
      agColumnHeader: HeaderItem
    };

    this.getData();
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
