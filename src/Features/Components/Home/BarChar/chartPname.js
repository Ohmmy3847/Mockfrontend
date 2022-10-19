import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Radar } from 'react-chartjs-2';


import "./chartPname.css";

// import { Chart } from 'react-charts'

export function BarChartInfo(dataa) {
 
  if( !dataa || dataa.length <= 0 ) return
  
  let labels = ["Problems", "Ability", "Skill"];
  let data = {
    labels,
    datasets: [
      {
        label: "Status",
        data: [dataa.dataa.Problems, dataa.dataa.Ability, dataa.dataa.Skill],
        backgroundColor: ["#B92323", "#2a71d0", "#59B923"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  let options = {
    scales: {
        y: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        },
        
    }
}
  return (
    <>
      <div className="char_1">
        <Bar data={data} options ={options}/>
      </div>
    </>
  );
}
export function BarChartSkill(dataa) {
  if (!dataa || dataa.length <= 0) return;
  let labels = [
    "Confidence",
    "Intention",
    "Focus",
    "Communication",
    "Cooperation",
  ];
  let data = {
    labels,
    datasets: [
      {
        label: "Skill",
        data: [
          dataa.dataa.Confidence,
          dataa.dataa.Intention,
          dataa.dataa.Focus,
          dataa.dataa.Communication,
          dataa.dataa.Cooperation,
        ],
        backgroundColor: "#59B923",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  let options = {
    scales: {
        y: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        }
    }
}
  return (
    <>
      <div className="char">
        <Bar data={data} options={options}/>
      </div>
    </>
  );
}

export function BarChartAbility(dataa) {
  if (!dataa || dataa.length <= 0) return;
  let labels = ["Algorithm", "Problem Solving", "Creativity"];
  let data = {
    labels,
    datasets: [
      {
        label: "Ability",
        data: [
          dataa.dataa.Algorithm,
          dataa.dataa.Creative,
          dataa.dataa.Solveproblem,
        ],
        backgroundColor: "#2a71d0",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  let options = {
    scales: {
        y: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        }
    }
}
  return (
    <>
      <div className="char">
        <Bar data={data} options={options}/>
      </div>
    </>
  );
}
