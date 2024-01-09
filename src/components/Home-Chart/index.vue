<template>
  <div class="chart">
    <div class="person" ref="chartDom"></div>
    <div class="Human" ref="HumanDom"></div>
    <div class="project" ref="projectDom"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { nextTick, ref } from "vue";
const chartDom = ref(null);
const HumanDom = ref(null);
const projectDom = ref(null);
nextTick(() => {
  // 柱状图
  const myChart = echarts.init(chartDom.value);
  myChart.setOption({
    title: {
      text: "人员统计图",
    },
    tooltip: {},
    xAxis: {
      data: ["SFT", "RM", "xxx", "xxx", "xxx", "xxx"],
    },
    yAxis: {},
    series: [
      {
        name: "人员",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  // 饼图
  const Human = echarts.init(HumanDom.value);
  Human.setOption({
    title: {
      text: "闲置人力",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "信阳",
          },
          {
            value: 234,
            name: "烟台",
          },
          {
            value: 1548,
            name: "西安",
          },
          {
            value: 220,
            name: "郑州",
          },
          {
            value: 110,
            name: "龙岩",
          },
        ],
      },
    ],
  });

  // 折线图
  const project = echarts.init(projectDom.value);
  project.setOption({
    title: {
      text: "月度项目统计",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          120, 200, 150, 200, 120, 200, 150, 200, 120, 200, 150, 200, 120, 200,
          150, 200,
        ],
        type: "line",
        label: {
          show: true,
          position: "bottom",
          textStyle: {
            fontSize: 12,
          },
        },
      },
    ],
  });
});
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
  padding: 30px 0px 0px 50px;
  // background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  .person {
    width: 40%;
    height: 300px;
  }
  .Human {
    width: 400px;
    height: 300px;
  }
  .project {
    width: 50%;
    height: 300px;
    padding-left: 10%;
  }
}
</style>