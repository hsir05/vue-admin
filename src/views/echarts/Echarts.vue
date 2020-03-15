<template>
  <section>
    <div class="wrap">
      <div class="chart" ref="chart" id="chart"></div>
      <div class="chart" ref="charts" id="charts"></div>
      <div class="chart" ref="chart1" id="chart1"></div>
    </div>
    <div class="wrap">
      <div class="chart" ref="chart2" id="chart2"></div>
    </div>
  </section>
</template>

<script>
import echarts from "echarts";

export default {
  name: "Ecahrts",
  data() {
    return {};
  },
  mounted() {
    this.pieChart();
    this.lineChart();
    this.gaugeChart();
  },
  methods: {
    pieChart() {
      const myChart = echarts.init(document.getElementById("chart"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          // type: "scroll",
          // orient: "vertical",
          left: 10,
          bottom: 0,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart.setOption(option, true);
    },
    gaugeChart() {
      let myChart = echarts.init(document.getElementById("chart1"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      };
      myChart.setOption(option, true);
    },
    lineChart() {
      let myChart = echarts.init(document.getElementById("charts"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style scoped>
.chart {
  width: 33.3%;
  height: 300px;
}
.wrap {
  display: flex;
  justify-content: space-between;
}
</style>
