import React, { useState } from "react";
import "./style.css";
import { useEffect } from "react";
import { BarChartClass } from "../BarClass";
import {
  StudentCount,
  ModsQuality,
  StudentProblems,
  StudentProjectQuality,
  StudentnextCourse,
  StudentComefrom
} from "../BarClass";

export function SearchBarAnal(
  datauselist,
  data,
  set,
  databydaystudent,
  databydayCourse,
  databydayMods,
  Destroy,
  
) {
  const [sufdata, setsufdata] = useState([]);
  const [filtdata, setfiltdata] = useState([]);
  const [filtdatabydaystudent, setfiltdatabydaystudent] = useState([]);
  const [filtdatabydayCourse, setfiltdatabydayCourse] = useState([]);
  const [filtdatabydayMods, setfiltdatabydayMods] = useState([]);
  const [listgroupbynextCourse, setlistgroupbynextCourse] = useState([]);
  const [listgroupbyComefrom, setlistgroupbyComefrom,] = useState([]);
  const [passdata, setpassdata] = useState([]);
  const [listdayCourse, setlistdayCourse] = useState([]);
  const [listdayMods, setlistdayMods] = useState([]);
  const [listDayStudents, setlistDayStudents] = useState([]);
  const [Suff, setSuff] = useState("");
  const [Dailymod, setDailymod] = useState([]);
  function groupBy1(xs, prop) {
    if (!xs) return;

    var grouped = [];
    for (var i = 0; i < xs.length; i++) {
      var p = xs[i][prop];

      if (!grouped[p]) {
        grouped[p] = [];
      }
      grouped[p].push(xs[i]);
    }

    return grouped;
  }
  function groupBy2(xs, prop) {
    var grouped = [];
    for (var i = 0; i < xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) {
        grouped[p] = [];
      }
      grouped[p].push(xs[i]);
    }
    return grouped;
  }
  useEffect(() => {
    datauselist.datauselist.map((n, i) => {
      let a = n[0].replace("gen", "");
      let b = a.replace("level", "");
      sufdata[i] = b.split("/");
    });

    if (!sufdata || sufdata.length < 1) {
    } else {
      sufdata.map((N, I) => {
        filtdata[I] = datauselist.data.filter(function (n, i) {
          return (
            (n.Course == sufdata[I][0]) &
            (n.Gen == sufdata[I][1]) &
            (n.Level == sufdata[I][2])
          );
        });
      });
      setSuff(sufdata.length);

      // Suff.map((n,i) => {
      //   return console.log(n)
      // })
      // for(let i = 0 ;i<Suff;i++){
      //   setAdd.push(<Component />)
      // }
      // return Add
    }

    filtdata.map((N, I) => {
      console.log(N);
      passdata[I] = [
        average(filtdata[I], "ProblemLevel"),
        average(filtdata[I], "Algorithm"),
        average(filtdata[I], "SolveProblem"),
        average(filtdata[I], "Creative"),
        average(filtdata[I], "Confidence"),
        average(filtdata[I], "Intention"),
        average(filtdata[I], "Communication"),
        average(filtdata[I], "Cooperation"),
      ];
      listgroupbynextCourse[I] = groupBy2(N, "NextCourse");
      listgroupbyComefrom[I]=groupBy2(N, "ComeFrom")
    });

    if (datauselist.datauselist.length > 0) {
      datauselist.datauselist.map((N, I) => {
        filtdatabydaystudent[I] = datauselist.databydaystudent.filter(function (
          n,
          i
        ) {
          return n.Course == datauselist.datauselist[I][0];
        }).sort(function(a, b) {
          return a.Day - b.Day;
      });
        filtdatabydayCourse[I] = datauselist.databydayCourse.filter(function (
          n,
          i
        ) {
          return n.Course == datauselist.datauselist[I][0];
        }).sort(function(a, b) {
          return a.Day - b.Day;
      });
        filtdatabydayMods[I] = datauselist.databydayMods.filter(function (
          n,
          i
        ) {
          return n.Course == datauselist.datauselist[I][0];
        }).sort(function(a, b) {
          return a.Day - b.Day;
      });
      });
    }
    let listDayStudents = [];
    let listDaycourse = [];
    let listDayMods = [];
    if (datauselist.datauselist != undefined) {
      datauselist.datauselist.map((n, i) => {
        if (filtdatabydayCourse[i] != undefined) {
          listDaycourse[i] = filtdatabydayCourse[i].map((N, I) => {
            return "Day" + N.Day;
          });
        }
        if (filtdatabydayMods[i] != undefined) {
          listDayMods[i] = filtdatabydayMods[i].map((N, I) => {
            return "Day" + N.Day;
          });
        }
        if (filtdatabydaystudent[i] != undefined) {
          listDayStudents[i] = filtdatabydaystudent[i].map((N, I) => {
            return "Day" + N.Day;
          });
        }
      });
      let listcourseday = [];
      let liststudentday = [];
      let listmodsday = [];
      listDaycourse.map((n, i) => {
        n.map((N, I) => {
          listcourseday.push(N);
        });
      });
      listDayMods.map((n, i) => {
        n.map((N, I) => {
          listmodsday.push(N);
        });
      });
      listDayStudents.map((n, i) => {
        n.map((N, I) => {
          liststudentday.push(N);
        });
      });
      setlistDayStudents(Array.from(new Set(liststudentday)).sort());
      setlistdayCourse(Array.from(new Set(listcourseday)).sort());
      setlistdayMods(Array.from(new Set(listmodsday)).sort());
      filtdatabydayMods.map((n, i) => {
        Dailymod[i] = groupBy1(filtdatabydayMods[i], "Day");
      });
    }
    // setDailymod(groupBy1(filtdatabydayMods[0],"Day"))
    console.log(Dailymod);
  }, [datauselist.datauselist, databydayCourse]);

  //   passdata.map((n,i)=>{
  //     overalldata[i] = [average = passdata.reduce((total, next) => total + next.risk, 0) / females.length]
  //   })

  // console.log(filtdatabydayCourse[0]);
  // if (!filtdatabydayCoursesProblem || filtdatabydayCoursesProblem <= 0)return

  return (
    <>
    <div class='graphwindow'>
      <div class="blockofoverall">
        <BarChartClass list={datauselist.datauselist} data={passdata} />
      </div>
      <div class="blockofStudentcount">
        <StudentCount
          list={listdayCourse}
          dataCourse={filtdatabydayCourse}
          listchoose={datauselist.datauselist}
        />
        </div>
       
        <div class="blockofoverall">
        <StudentnextCourse list={listDayStudents} data={listgroupbynextCourse} listchoose={datauselist.datauselist} />
        <br/>
        </div>
        <div class="blockofoverall">
        <StudentComefrom list={listDayStudents} data={listgroupbyComefrom} listchoose={datauselist.datauselist} />
        </div>
        
        
        

        </div>
        </>

    
  );
}
function average(dataa, access) {
  let filteredData = dataa.filter(({ nick }) => nick == nick),
    avg =
      filteredData.reduce((r, c) => parseInt(r) + parseInt(c[access] || 0), 0) /
      filteredData.length;
  return avg;
}
{
  /* <BarChartClass list={datauselist.datauselist} data={passdata}/> */
}
