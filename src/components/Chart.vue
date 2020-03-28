<template>
  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },

  props: ["volumeData"],
  data() {
    return {
      volumeSeries: [],
      volumeCategories: []
    };
  },
  mounted() {
    this.trying();
  },
  data() {
    return {
      options: {
        chart: {
          id: "searchVolumeChart"
        },
        xaxis: {
          categories: [
            "2018-07-01",
            "2018-08-01",
            "2018-09-01",
            "2018-10-01",
            "2018-11-01",
            "2018-12-01",
            "2019-01-01",
            "2019-02-01",
            "2019-03-01",
            "2019-04-01",
            "2019-05-01",
            "2019-06-01"
          ]
        }
      },
      series: [
        {
          name: "search-volume",
          data: this.volumeSeries
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>