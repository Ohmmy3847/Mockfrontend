import axios from "axios";

// import { StudentCard } from "../student_card";
import logo from "../../../true_Logo.png";
import React, { useEffect, useState } from "react";
// import MyChart from "../BarChar"

// import { BarChartClass } from "./BarClass";

import "./style.css";
import { SearchBarAnal } from "./Classserch";
// import { StackedBar100Chart } from "../BarClass"

export function ClassSceen() {
  const [students, setStudents] = useState([]);
  const [Bydaystudents, setBydaystudents] = useState([]);
  const [BydayMods, setBydayMods] = useState([]);
  const [BydayCourse, setBydayCourse] = useState([]);
  const [numberEntered, setnumberEntered] = useState(0);
  const [searchCourse, setsearchCourse] = useState("");
  const [sufdata, setsufdata] = useState([]);
  const [filtdata, setfiltdata] = useState([]);
  const [useClass, setuseClass] = useState([]);
  const [classesset, setclassesset] = useState([]);
  const [userow, setuserow] = useState("");
  const path = window.location.pathname;
  const [To_Top_State, set_To_Top_State] = useState(false);
  const [DestroyChart, setDestroyChart] = useState(true);
  const [likedCount, setLikedCount] = useState(0);

  const getStudent = async () => {
    const response = await axios.get(
      "https://backend-of-hamsterhub.herokuapp.com/D_STUDENTS/"
    );
    const data = await response.data;

    // setStudents(JSON.parse(JSON.stringify(data)));
    setStudents(JSON.parse(JSON.stringify(data)));
    setLikedCount((likedCount) => likedCount + 12.5);
    // console.log(JSON.stringify(data));
  };
  const getBydaystudent = async () => {
    const responseBydaystudent = await axios.get(
      "https://backend-of-hamsterhub.herokuapp.com/Students"
    );
    const datagetBydaystudent = await responseBydaystudent.data;

    // setStudents(JSON.parse(JSON.stringify(data)));
    setBydaystudents(JSON.parse(JSON.stringify(datagetBydaystudent)));
    // console.log(JSON.stringify(data));
    setLikedCount((likedCount) => likedCount +  12.5);
  };
  const getBydayMods = async () => {
    const responseBydayMods = await axios.get(
      "https://backend-of-hamsterhub.herokuapp.com/Mods"
    );
    const datagetBydayMods = await responseBydayMods.data;

    // setStudents(JSON.parse(JSON.stringify(data)));
    setBydayMods(JSON.parse(JSON.stringify(datagetBydayMods)));
    setLikedCount((likedCount) => likedCount +  12.5); // console.log(JSON.stringify(data));
  };
  const getBydayCourse = async () => {
    const responseBydayCourse = await axios.get(
      "https://backend-of-hamsterhub.herokuapp.com/Course"
    );

    const datagetBydayMods = await responseBydayCourse.data;

    // setStudents(JSON.parse(JSON.stringify(data)));
    setBydayCourse(JSON.parse(JSON.stringify(datagetBydayMods)));
    setLikedCount((likedCount) => likedCount + 12.5);

    // console.log(JSON.stringify(data));
  };
  useEffect(() => {
    getStudent();
    getBydaystudent();
    getBydayMods();
    getBydayCourse();
  }, []);

  let Rawcourse = BydayCourse.map((d, index) => {
    return d.Course;
  });

  let Sets_course = Array.from(new Set(Rawcourse)).sort();
  const [nearCourse, setnearCourse] = useState(Sets_course);
  useEffect(() => {
    setnearCourse(
      Sets_course.filter(function (i, n) {
        if (!i.includes(searchCourse) || searchCourse == "") {
          return i;
        } else if (i == searchCourse) {
          return i;
        } else {
          return i.includes(searchCourse);
        }
      })
    );
    setsearchCourse("");
  }, [searchCourse, userow]);

  if (!Bydaystudents || Bydaystudents.length <= 0) return;

  const To_The_Top = () => {
    if (window.scrollY >= 400) {
      set_To_Top_State(true);
      setDestroyChart(false);
    } else {
      set_To_Top_State(false);
      setDestroyChart(true);
    }
  };

  window.addEventListener("scroll", To_The_Top);

  let Raw = students.map((d, index) => {
    return d.Course + "/gen" + d.Gen + "/level" + d.Level;
  });

  let SetofClass = Array.from(new Set(Raw)).sort();

  function handleFIlter(event, index) {
    setsearchCourse(event.target.value);
    setuserow(index);
    useClass[index] = [event.target.value, colorArray[index]];
  }

  const rows = [];
  for (var i = 0; i < 4; i++) {
    rows.push(i);
  }

  var colorArray = [
    "#B92323",
    "#2a71d0",
    "#FF33FF",
    "#008000 ",
    "#00B3E6",
    "#E6B333",
  ];

  let res = useClass.filter(function (cItem, i) {
    return SetofClass.find(function (aItem, index) {
      return cItem[0] == aItem;
    });
  });

  res.map((n, i) => {
    let a = n[0].replace("gen", "");
    let b = a.replace("level", "");
    sufdata[i] = b.split("/");
  });
  if (!sufdata || sufdata.length < 1) {
  } else {
    sufdata.map((N, I) => {
      filtdata[I] = students.filter(function (n, i) {
        return (
          (n.Course == sufdata[I][0]) &
          (n.Gen == sufdata[I][1]) &
          (n.Level == sufdata[I][2])
        );
      });
    });
  }

  return (
    <>
      
      
        {likedCount < 100 ? (
          <>
            <img src={logo} class="rotate" width="120" height="100" />
            <h2>Loading {likedCount}%</h2>
          </>
        ) : <>
        
        
        <div
        id="box_compare_class"
        className={To_Top_State ? "box_compare_class Top" : "box_compare_class"}
      >
        <h1>Course Comparison</h1>

        {rows.map((i) => {
          return (
            <div className="PutInline">
              <div
                className="colorS"
                style={{ backgroundColor: colorArray[i] }}
              ></div>
              <form>
                <input
                  className="inputStlYe"
                  autocomplete="off"
                  key={"item" + i}
                  type="text"
                  list="listclass"
                  id={"getloopclass" + i}
                  placeholder={Sets_course[i] || "NSC/gen1/level2"}
                  // value= {  }
                  onChange={(e) => handleFIlter(e, i)}
                />{" "}
                <datalist id="listclass">
                  {nearCourse.map((n, i) => {
                    return <option value={n}></option>;
                  })}
                </datalist>
                {/* <input type="reset" value="X" /> */}
              </form>
              <br />
            </div>
            
          );
        })}
        {res.map((N, I) => {
          return (
            <>
              <h3 style={{marginLeft:'2%', textAlign:"left"}}>{I + 1 + ". " + N[0] + " " + filtdata[I].length + "คน"} </h3>
            </>
          );
        })}
      </div>

      {/* <div
        className={To_Top_State ? "NumberOfStudents Top" : "NumberOfStudents"}
      >
        {res.map((N, I) => {
          return (
            <>
              <p>{I + 1 + ". " + N[0] + " " + filtdata[I].length + "คน"} </p>
            </>
          );
        })}
      </div> */}

      

      <SearchBarAnal
        datauselist={res}
        data={students}
        set={SetofClass}
        databydaystudent={Bydaystudents}
        databydayMods={BydayMods}
        databydayCourse={BydayCourse}
        Destroy={DestroyChart}
      />
        
        
        
        
        
        
        
        </>}
     
    </>
  );
}
