import React from "react";
import ReactEcharts from "echarts-for-react";

/**
 *
 * option 값은 https://echarts.apache.org/en/option.html#title 참고
 *
 * @constructor
 */
export const SalesByPeriodChart = () => {
  const option = {
    grid: {
      zlevel: 0,
      x: 30,
      x2: 30,
      y: 10,
      y2: 50,
      borderWidth: 0,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(0,0,0,0)",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    // 다운로드 및 표 형식으로 변환
    // toolbox: {
    //   orient: "center",
    //   left: 0,
    //   top: 20,
    //   feature: {
    //     dataView: { readOnly: !1, title: "Data View" },
    //     magicType: {
    //       type: ["line", "bar"],
    //       title: { line: "For line chart", bar: "For bar chart" },
    //     },
    //     restore: { title: "restore" },
    //     saveAsImage: { title: "Download Image" },
    //   },
    // },FC6C00 757575 E0E0E0 FC6C00
    color: ["#FC6C00", "#E0E0E0", "#757575", "#E0E0E0"],
    legend: {
      data: ["전체", "회원", "로밍회원", "현장결제"],
      textStyle: { color: "#858d98" },
      bottom: 0,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "YYYY-MM",
          "YYYY-MM",
          "YYYY-MM",
          "YYYY-MM",
          "YYYY-MM",
          "YYYY-MM",
          "YYYY-MM",
        ],
        axisPointer: {
          type: "shadow",
        },
        axisLine: {
          lineStyle: {
            color: "#858d98",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        min: 0,
        max: 100,
        interval: 20,
        axisLine: {
          lineStyle: {
            color: "#858d98",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(133, 141, 152, 0.1)",
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      // {
      //   type: "value",
      //   name: "",
      //   min: 0,
      //   max: 25,
      //   interval: 5,
      //   axisLine: {
      //     lineStyle: {
      //       color: "#858d98",
      //     },
      //   },
      //   splitLine: {
      //     lineStyle: {
      //       color: "rgba(133, 141, 152, 0.1)",
      //     },
      //   },
      //   axisLabel: {
      //     formatter: "{value}",
      //   },
      // },
    ],
    series: [
      {
        name: "전체",
        type: "line",
        data: [42.0, 82.2, 3.3, 6.3, 94.5, 20.3, 60.3],
      },
      {
        name: "회원",
        type: "bar",
        data: [44.0, 84.9, 7.0, 25.6, 93.2, 40.6, 65.2],
      },
      {
        name: "로밍회원",
        type: "bar",
        data: [42.6, 85.9, 9.0, 28.7, 96.4, 42.6, 65.2],
      },
      {
        name: "현장결제",
        type: "bar",
        data: [42.6, 85.9, 9.0, 28.7, 96.4, 42.6, 65.2],
      },
    ],
  };

  return <ReactEcharts style={{ height: "350px" }} option={option} />;
};

export default SalesByPeriodChart;
