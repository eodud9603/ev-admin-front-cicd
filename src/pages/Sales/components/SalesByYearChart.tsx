import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

export const SalesByYearChart = () => {
  const option = {
    grid: {
      zlevel: 0,
      x: 50,
      x2: 50,
      y: 30,
      y2: 30,
      borderWidth: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    color: ["#FC6C00", "#757575", "#E0E0E0"],
    legend: {
      data: ["2023", "2022", "2021"],
      textStyle: { color: "#858d98" },
      bottom: 0,
    },
    // legend: {
    //   data: ["Evaporation", "Precipitation", "Average temperature"],
    //   textStyle: { color: "#858d98" },
    //   top: 0,
    // },
    textStyle: {
      color: ["#74788d"],
    },
    xAxis: {
      type: "category",
      data: ["1분기", "2분기", "3분기", "4분기"],
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "",
      min: 0,
      max: 10000,
      interval: 2000,
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    series: [
      {
        data: [1800, 2400, 2500, 3200],
        type: "line",
        name: "2021",
      },
      {
        data: [3000, 2600, 5000, 8000],
        type: "line",
        name: "2022",
      },
      {
        data: [8000, 8200, 8400, 9000],
        type: "line",
        name: "2023",
      },
    ],
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={option} />
    </React.Fragment>
  );
};
export default SalesByYearChart;
