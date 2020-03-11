<template>
  <section class="">
    <div class="chart" ref="chart" id="chart"></div>
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
          orient: "vertical",
          left: 10,
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
      myChart.hideLoading();
    },
    lineChart(titleText, initData) {
      let legendData = [];
      let date = [];
      let data = [];
      date = Object.keys(initData);
      data = Object.values(initData);
      legendData = date;

      let myChart = echarts.init(document.getElementById("chart"));

      let option = {
        title: {
          text: `浏览/检索结果按${titleText}分布图`,
          top: "top",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
          // formatter(params){
          //     return params[0].name + '<br/>' + params[0].value + '(篇)'
          // }
        },
        legend: {
          data: legendData,
          bottom: "5"
        },
        grid: {
          left: 35,
          top: 70,
          right: 25,
          bottom: 60
        },
        toolbox: {
          show: true,
          right: "10",
          y: "top",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
            // myTool1: {
            //     show: true,
            //     title: 'WORD',
            //     icon: `path://${this.iconWord}`,
            //     onclick: () => {
            //        this.download()
            //     }
            // },
            // myTool2: {
            //     show: true,
            //     title: 'EXCEL',
            //     icon: `path://${this.iconEXCEL}`,
            //     onclick: () => {
            //        this.download()
            //     }
            // },
            // myToolPPT: {
            //     show: true,
            //     title: 'PPT',
            //      icon: `path: ${this.iconPPT}`,
            //     onclick: () => {
            //        this.download()
            //     }
            // },
          }
        },
        xAxis: {
          type: "category",
          data: date,
          axisLabel: {
            interval: 0,
            rotate: 45,
            formatter: function(value) {
              return value.length >= 8 ? value.substring(0, 8) + "..." : value;
            }
          }
        },
        yAxis: [
          {
            type: "value",
            splitArea: { show: true }
          }
        ],
        series: {
          data: data,
          type: "bar",
          // name: '篇',
          barWidth: 25,
          itemStyle: {
            normal: {
              label: {
                formatter: "{c}",
                show: true,
                position: "top"
              }
            }
          }
        }
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style scoped>
.chart {
  width: 500px;
  height: 400px;
}
</style>
