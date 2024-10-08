import { BarController } from "chart.js";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

function Barchar(props) {
  const { datasetcom, data } = props;

  let label = [];
  for (let i = 0; i < datasetcom.length; i++) {
    label.push(datasetcom[i].name);
  }
  // console.log();
  // console.log(datasetcom);
  // console.log(datasetcom);
  // console.log(label);
  // const data = {
  //   labels: ["first", "second", "third", "4th"],
  //   datasets: [
  //     {
  //       label: "",
  //       data: [1, 2, 4, 8],
  //       backgroundColor: ["#FA943E", "#89FAF4", "#3EC5FA", "#FFE28C"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const datas = {
    labels: label,
    datasets: [
      {
        label: "",
        data: data,
        backgroundColor: ["#FA943E", "#89FAF4", "#3EC5FA", "#FFE28C"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        // display: true,
        text: "Chart.js Line Chart",
      },
    },
    // scales: {
    //   xAxes: [
    //     {
    //       barPercentage: 0.2,
    //       maxBarThickness: 10, // number (pixels)
    //     },
    //   ],
    // },
    // scales: {
    //   xAxes: [
    //     {
    //       gridLines: {
    //         display: true,
    //         drawBorder: false,
    //         borderDash: [3, 3],
    //         zeroLineColor: "blue",
    //       },
    //       categoryPercentage: 0.7,
    //       barPercentage: 0.9,
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    //   yAxes: [
    //     {
    //       display: false,
    //       gridLines: {
    //         display: false,
    //         zeroLineColor: "transparent",
    //       },
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div style={{ width: "100%", height: 360 }}>
      <Bar width="200" height="200" data={datas} options={options} />
    </div>
  );
}

export default Barchar;
