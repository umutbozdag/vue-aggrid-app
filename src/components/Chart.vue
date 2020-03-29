<template>
  <div class="chart-container">
    <apexchart width="700px" height="300px" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import ApexCharts from "apexcharts";
import { monthNames } from "../helpers/monthNames";

export default {
  name: "Chart",
  components: {
    apexchart: VueApexCharts
  },

  props: ["volumeData"],
  mounted() {
    this.setData();
  },
  data() {
    return {
      volumeSeries: [],
      volumeCategories: [],
      plotOptions: {
        bar: {
          barHeight: "100%"
        }
      },
      options: {
        type: "bar",
        dataLabels: {
          enabled: false
        },
        colors: ["#9999CC"],
        chart: {
          foreColor: "#9999CC",
          id: "searchVolumeChart"
        },
        xaxis: {
          labels: {
            style: {
              colors: ["#9999CC"],
              fontFamily: "Barlow, sans-serif"
            }
          },

          categories: [],
          labels: {
            formatter: function(value, timestamp) {
              const date = new Date(timestamp);
              return monthNames[date.getMonth()];
            }
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function(value) {
                return value;
              },
              style: {
                colors: "#9999CC",
                fontFamily: "Barlow, sans-serif",
                fontSize: "12"
              }
            }
          }
        ],
        responsive: [
          {
            breakpoint: 1024,
            options: {
              dataLabels: {
                enabled: false
              }
            }
          }
        ]
      },
      series: [
        {
          name: "value",
          data: []
        }
      ]
    };
  },

  methods: {
    setData() {
      this.volumeSeries = this.volumeData.map(el => el.volume);
      this.volumeCategories = this.volumeData.map(el => el.date);
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
  }
};
</script>

<style lang="scss" scoped>
</style>