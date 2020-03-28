<template>
  <div class="chart-container">
    <apexchart width="700px" height="300px" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import ApexCharts from "apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },

  props: ["volumeData"],
  mounted() {
    this.trying();
  },
  data() {
    return {
      volumeSeries: [],
      volumeCategories: [],
      options: {
        type: "bar",
        dataLabels: {
          enabled: false
        },
        colors: ["#9999CC"],
        chart: {
          id: "searchVolumeChart"
        },
        xaxis: {
          categories: [],
          labels: {
            formatter: function(value, timestamp) {
              var monthNames = [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC"
              ];

              const date = new Date(timestamp); // The formatter function overrides format property
              return monthNames[date.getMonth()];
            }
          }
        },
        yaxis: {
          show: true,
          labels: {
            style: {
              colors: ["#9999CC"]
            }
          }
        },
        responsive: [
          {
            breakpoint: 1024,
            options: {
              dataLabels: {
                enabled: true
              }
            }
          }
        ]
      },
      series: [
        {
          name: "",
          data: []
        }
      ]
    };
  },

  methods: {
    trying() {
      this.volumeSeries = this.volumeData.map(el => el.volume);
      this.volumeCategories = this.volumeData.map(el => el.date);
      console.log(this.volumeSeries);
      console.log(this.volumeCategories);
      this.series = [
        {
          data: this.volumeSeries
        }
      ];
      ApexCharts.exec("searchVolumeChart", "updateOptions", {
        xaxis: {
          categories: this.volumeCategories
        }
      });
    }
  },

  formatDate(value, timestamp) {}
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
@media only screen and (max-width: 1440px) {
  .chart-container {
    width: 900px !important;
    height: 200px !important;
  }
}
</style>