<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    // 传递参数，是否为折线图
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
          color: [],
        };
      },
    },
  },
  data() {
    return {
      // 柱状图配置
      axisOption: {
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: { color: "#17b3a3" },
          },
          axisLabel: {
            lineStyle: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: { color: "#17b3a3" },
            },
          },
        ],
        // color: ["#2ec7c9", "#b6a2de"],
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        series: [],
      },
      // 饼图配置
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
          "#5a339d",
        ],
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [],
      },
      echart: null,
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      // 柱状图或折线图
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
        if (this.chartData.color) {
          this.axisOption.color = this.chartData.color;
        }
      } else {
        // 饼图
        this.normalOption.series = this.chartData.series;
      }
    },
  },
};
</script>

<style>
</style>