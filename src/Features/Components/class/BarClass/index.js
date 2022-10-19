import React, { useEffect, useState } from "react";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import "./style.css";

function groupBy2(xs, prop) {
  var grouped = [];
  for (var i = 0; i < xs.length; i++) {
    var p = xs[i][prop];

    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(xs[i]);
  }
  grouped.shift();

  return grouped;
}
function averageMods(dataa, access1, access2) {
  let filteredData = dataa.filter(({ nick }) => nick == nick),
    avg =
      filteredData.reduce(
        (sum, c) =>
          parseInt(sum) +
          (parseInt(c[access1] || 0) + parseInt(c[access2] || 0)),
        0
      ) / filteredData.length;

  return avg;
}
function average(dataa, access) {
  let filteredData = dataa.filter(({ nick }) => nick == nick),
    avg =
      filteredData.reduce((r, c) => parseInt(r) + parseInt(c[access] || 0), 0) /
      filteredData.length;
  return avg;
}
export function StudentnextCourse(data) {
  let listnextCourse = [];

  let listCourse = data.data.map((n, i) => {
    return Object.keys(n);
  });
  listCourse.map((n, i) => {
    n.map((N, I) => {
      if (!listnextCourse.includes(N)) {
        listnextCourse.push(N);
      }
    });
  });

  let labels = Array.from(new Set(listnextCourse));
  console.log(labels);
  let dataa = {
    labels,
    datasets: data.listchoose.map((nB,iB)=>{
      return{
            label:
              data.listchoose == undefined
                ? "<No Data>"
                : data.listchoose[iB] == undefined
                ? "<No Data>"
                : data.listchoose[iB][0],
            data:
            labels == []
                    ? []
                    : labels.map((n, i) => {
                        return data.data[iB] == undefined
                          ? 0
                          : data.data[iB][n]== undefined?0:data.data[iB][n].length;
                      }),
                      backgroundColor:
          data.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : data.listchoose[iB][1],
        borderColor:
          data.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : data.listchoose[iB][1],
            borderColor: "black",
        borderWidth: 2,
      
    }})
   
  }
  let options = {
    plugins: {
      title: {
        display: true,
        text: "Student's next course",
        font: {
          family: "Comic Sans MS",
          size: 37,
          weight: "bold",
          lineHeight: 1.2,
        },
      },
    },}
  

  return (
    <>
      
      <Bar data={dataa} options={options} />
    </>
  );
}
export function StudentComefrom(data) {
  console.log(data)
  let listnextCourse = [];

  let listCourse = data.data.map((n, i) => {
    return Object.keys(n);
  });
  listCourse.map((n, i) => {
    n.map((N, I) => {
      if (!listnextCourse.includes(N)) {
        listnextCourse.push(N);
      }
    });
  });

  let labels = Array.from(new Set(listnextCourse));
  console.log(labels);
  let dataa = {
    labels,
    datasets: data.listchoose.map((nB,iB)=>{
      return{
            label:
              data.listchoose == undefined
                ? "<No Data>"
                : data.listchoose[iB] == undefined
                ? "<No Data>"
                : data.listchoose[iB][0],
            data:
            labels == []
                    ? []
                    : labels.map((n, i) => {
                        return data.data[iB] == undefined
                          ? 0
                          : data.data[iB][n]== undefined?0:data.data[iB][n].length;
                      }),
                      backgroundColor:
          data.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : data.listchoose[iB][1],
        borderColor:
          data.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : data.listchoose[iB][1],
            borderColor: "black",
        borderWidth: 2,
      
    }})
   
  }
  let options = {
    plugins: {
      title: {
        display: true,
        text: "Come from",
        font: {
          family: "Comic Sans MS",
          size: 37,
          weight: "bold",
          lineHeight: 1.2,
        },
      },
    },}
  

  return (
    <>
      
      <Bar data={dataa} options={options} />
    </>
  );
}
export function StudentProblems(list) {
  let labels = list.list;
  let data = {
    labels,
    datasets: [
      {
        label: "Scatter Dataset",
        data: Array.from(
          {
            length:
              list.dataCourse == undefined
                ? []
                : list.dataCourse[0] == undefined
                ? []
                : list.dataCourse[0].length,
          },
          (n, i) => ({
            x: labels,
            y:
              list.dataCourse == undefined
                ? console
                : list.dataCourse[0] == undefined
                ? console
                : list.dataCourse[0][i].ProblemLevel,
          })
        ),
      },
    ],
  };

  return (
    <>
      <Scatter data={data} />
    </>
  );
}
export function ModsQuality(list) {
  let options = {
    plugins: {
      title: {
        display: true,
        text: "Moderator Quality",
        font: {
          family: "Comic Sans MS",
          size: 37,
          weight: "bold",
          lineHeight: 1.2,
        },
      },
    },
    scales: {
      y: {
        max: 10,
        min: 0,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  let labels = list.list;
  let data = {
    labels,
    datasets: list.listchoose.map((nB,iB)=>{
      return{
        label:
        list.listchoose[iB] == undefined || ""
                ? "<No Data>"
                : list.listchoose[iB][0],
            data:
          list.dataMods[iB] == undefined || ""
            ? []
            : groupBy2(list.dataMods[iB], "Day").map((N, I) => {
                return N == undefined
                  ? 0
                  : averageMods(N, "Teaching_Ability", "Attract_Attention");
              }),
        backgroundColor:
          list.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : list.listchoose[iB][1],
        borderColor:
          list.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : list.listchoose[iB][1],

      }})
   
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}
export function BarChartClass(list, data) {
  if (!list || list.length <= 0) return;

  let labels = [
    "problems",
    "algorithm",
    "solveproblem",
    "creative",
    "confidence",
    "intention",
    "communication",
    "cooperation",
  ];
  //   age < 18 ? "Child" : "Adult"
  let dataa = {
    labels,
    datasets: list.list.map((nB,iB)=>{
      return {
        label: list.list[iB] == undefined || "" ? "<No Data>" : list.list[0][0],
        data: [
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][0],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][1],
          list.data[iB] == undefined
            ? 0
            : list.list[0] == undefined || ""
            ? 0
            : list.data[iB][2],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][3],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][4],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][5],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][6],
          list.data[iB] == undefined
            ? 0
            : list.list[iB] == undefined || ""
            ? 0
            : list.data[iB][7],
        ],
        backgroundColor:
          list.list[iB] == undefined ? "<No Data>" : list.list[iB][1],
        borderColor: "black",
        borderWidth: 2,
      }
    })
      
    
  };
  let options = {
    plugins: {
      plugins: {
        stacked100: { enable: true, replaceTooltipLabel: false },
      },
      title: {
        display: true,
        text: "Status",
        font: {
          family: "Comic Sans MS",
          size: 37,
          weight: "bold",
          lineHeight: 1.2,
          color:'#000000'
        },
      },
    
    },
    legend: {
      labels: {
          fontColor: "blue",
          fontSize: 18
      }
  },

    interaction: {
      intersect: true,
    },
    scales: {
      y: {
        max: 5,
        min: 0,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };
  return (
    <>
      <Bar data={dataa} options={options} />
    </>
  );
}

export function StudentCount(list, dataCourse, listchoose) {
  let options = {
    plugins: {
      title: {
        display: true,
        text: "จำนวนเด็ก",
        font: {
          family: "Comic Sans MS",
          size: 37,
          weight: "bold",
          lineHeight: 1.2,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  let labels = list.list;

  let data = {
    labels,
    datasets: list.listchoose.map((nB,iB)=>{
      return{
      
        label:
          list.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : list.listchoose[iB][0],
        data:
          list.dataCourse[iB] == undefined || ""
            ? []
            : list.dataCourse[iB].map((n, i) => {
                return parseInt(n.NumberStudent) || 0;
              }),
        backgroundColor:
          list.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : list.listchoose[iB][1],
        borderColor:
          list.listchoose[iB] == undefined || ""
            ? "<No Data>"
            : list.listchoose[iB][1],
        borderColor: "black",
        borderWidth: 2,
      
            }
    })
  };
  

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}
//
