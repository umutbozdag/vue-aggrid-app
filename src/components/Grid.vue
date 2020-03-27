
<template>
  <div class="grid">
    <ag-grid-vue
      id="myGrid"
      style="width: 500px; height: 500px;"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="multiple"
      pagination="true"
      paginationPageSize="20"
      :defaultColDef="defaultColDefs"
      :gridOptions="gridOptions"
      :cellClicked="onCellClicked"
      headerHeight="38"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";
import star from "../assets/star.svg";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import opportunity from "../assets/icon-opportunity.svg";
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

      defaultColDefs: {
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        filter: true,
        unSortIcon: false,
        icons: {
          sortAscending: `<i class="fas fa-sort-up"></i>`,
          sortDescending: `<i class="fas fa-sort-down"></i>`
        }
      }
    };
  },

  methods: {
    onCellClicked() {
      console.log("clicked");
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.gridOptions.rowHeight = 48;
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: "KEYWORDS", field: "keyword", width: 300 },
      {
        headerName: "SEARCH VOLUME",
        field: "avgSearchVolume",
        cellRenderer: function(params) {
          return ` <div class="cell-with-icon"> <img class="opportunity-icon" src=${opportunity} /> ${params.value} </div>`;
        },
        width: 200
      },
      {
        headerName: "RANK",
        field: "rank",
        cellRenderer: function(params) {
          return ` <div class="cell-with-icon"> ${params.value} <img class="star-icon" width='20px' src=${star} /> </div>  `;
        },
        width: 150
      },
      {
        headerName: "CHANGE",
        field: "diffRank",
        cellRenderer: params => {
          return params.value > 0 ? `+${params.value}` : `${params.value}`;
        },
        cellStyle: params => {
          if (params.value > 0) {
            return {
              color: "#21D99B",
              borderRadius: "12px",
              backgroundColor: "rgba(33, 217, 155, 0.1)",
              textAlign: "center"
            };
          } else if (params.value == 0) {
            return { textAlign: "center" };
          } else {
            return {
              color: "#FF4D79",
              backgroundColor: "rgba(255, 77, 121, 0.1)",
              borderRadius: "12px",
              textAlign: "center"
            };
          }
        },
        width: 150
      },
      {
        headerName: "PX RANK",
        field: "pixelRank"
      },
      {
        headerName: "CHANGE",
        field: "diffPixelRank",
        cellRenderer: params => {
          return params.value > 0 ? `+${params.value}` : `${params.value}`;
        },
        cellStyle: params => {
          if (params.value > 0) {
            return {
              color: "#21D99B",
              borderRadius: "12px",
              backgroundColor: "rgba(33, 217, 155, 0.1)",
              textAlign: "center"
            };
          } else if (params.value == 0) {
            return { textAlign: "center" };
          } else {
            return {
              color: "#FF4D79",
              backgroundColor: "rgba(255, 77, 121, 0.1)",
              borderRadius: "12px",
              textAlign: "center"
            };
          }
        }
      },
      {
        headerName: "URL-PAGE",
        field: "landingPage",
        width: 450,
        cellRenderer: params => {
          console.log("params", params);
          return `<a class="cell-link" href=${params.value}> ${params.value}</a>`;
        },
        cellStyle: function() {
          return {
            color: "#7373FF"
          };
        }
      },
      { headerName: "CPC-$", field: "cpc" }
    ];

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

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
}

#myGrid {
  width: 100% !important;
  height: 750px !important;
}
</style>
