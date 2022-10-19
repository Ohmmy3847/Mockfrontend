import React, { useState } from "react";
import "./style.css";
import mainTotu from "./mainTuto.mp4";
import MyChart, { BarChartAbility, BarChartSkill } from "../BarChar/chartPname";
import { BarChartInfo } from "../BarChar/chartPname";
// import lineChart from "../BarChar/chartPname";
import { Chart as ChartJS } from "chart.js/auto";
import image from "./Image_not_available.png"
// import { getData } from "../Home/index" JSON.parse(data_get
import { useEffect } from "react";
export function MakeTable(data_get, name, course, gen, level) {
  const [getevent, setgetevent] = useState("");
  const [getindex, setgetindex] = useState(0);
  const [Column, setColumn] = useState(0);
  const [viewdata, setviewdata] = useState([]);
  const [access, setaccess] = useState(false);

  var objAbility = {};
  var objSkill = {};
  var objInfo = {};

  if (data_get.name == "") {
    var s = data_get.data_get.filter(function (i, n) {
      return i;
    });
  } else {
    var s = data_get.data_get.filter(function (i, n) {
      return i.Nick.includes(data_get.name);
    });
  }
  if (data_get.course == "All Course") {
    var as = s.filter(function (i, n) {
      return i;
    });
  } else {
    var as = s.filter(function (i, n) {
      return i.Course == data_get.course;
    });
  }
  if (data_get.gen == "All Gen") {
    var dasb = as.filter(function (i, n) {
      return i;
    });
  } else {
    var dasb = as.filter(function (i, n) {
      return i.Gen == data_get.gen;
    });
  }
  if (data_get.level == "All Level") {
    var das = dasb.filter(function (i, n) {
      return i;
    });
  } else {
    var das = dasb.filter(function (i, n) {
      return i.Level == data_get.level;
    });
  }

  for (let i = 0; i < viewdata.length; i++) {
    objAbility[i] = {
      Algorithm: parseInt(viewdata[i].Algorithm),
      Solveproblem: parseInt(viewdata[i].SolveProblem),
      Creative: parseInt(viewdata[i].Creative),
    };
    objSkill[i] = {
      Confidence: parseInt(viewdata[i].Confidence),
      Intention: parseInt(viewdata[i].Intention),
      Focus: parseInt(viewdata[i].Focus),
      Communication: parseInt(viewdata[i].Communication),
      Cooperation: parseInt(viewdata[i].Cooperation),
    };
    objInfo[i] = {
      Problems: parseInt(viewdata[i].ProblemLevel),
      Ability:
        ((parseInt(viewdata[i].Algorithm) +
          parseInt(viewdata[i].SolveProblem) +
          parseInt(viewdata[i].Creative)) /
          15) *
        5,
      Skill:
        ((parseInt(viewdata[i].Confidence) +
          parseInt(viewdata[i].Intention) +
          parseInt(viewdata[i].Focus) +
          parseInt(viewdata[i].Communication) +
          parseInt(viewdata[i].Cooperation)) /
          25) *
        5,
    };

    viewdata[i].maxAbility = Object.entries(objAbility[i]).sort(
      (x, y) => y[1] - x[1]
    )[0];
    viewdata[i].maxSkill = Object.entries(objSkill[i]).sort(
      (x, y) => y[1] - x[1]
    )[0];
  }

  //{ student_table }
  // var as=data_get.data_get.filter(function (i,n){return i.nick==nameInput});
  // console.log(as)

  // document.write(" <table border=2px solid black>")
  // for (let rows = 0; rows <= student_table.length; rows++) {

  // }
  // {this.state.data.map(( getData, index ) => {

  // JSON.deserializeUntyped(),Object.values(data_get)

  useEffect(() => {
    setgetindex(0);

    setColumn(0);
    setviewdata(das);
    console.log("hello");
  }, [data_get.name, data_get.course, data_get.gen, data_get.level]);
  return (
    <>
      <div class="maintable">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Problems</th>
            <th>Ability</th>
            <th>Skill</th>
            <th>ผลงาน</th>
          </tr>

          {viewdata.map((daata, index) => {
            return (
              <>
                <tr>
                  <td className="FirstBar">{daata.Id || "<No Data>"}</td>
                  <td
                    key={"nick" + String(index)}
                    onClick={(event) => {
                      setgetindex(index);
                      setColumn(1);
                    }}
                  >
                    {daata.Nick || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(2);

                      setgetindex(index);
                    }}
                  >
                    {daata.Course || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setgetindex(index);
                      setColumn(3);
                      // console.log(Column);
                    }}
                  >
                    {daata.Problem==undefined?"<No Data>":daata.Problem.slice(0, 12)}
                    
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(4);

                      setgetindex(index);
                    }}
                  >
                    {daata.maxAbility[0] || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(5);

                      setgetindex(index);
                    }}
                  >
                    {daata.maxSkill[0] || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(6);

                      setgetindex(index);
                    }}
                  >
                    {daata.ProjectName || "<No Data>"}
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
      <div id="box_value" className="box_value">
        {(() => {
          if (Column == 1) {
            return (
              <>
                {/* <h1>
                  {JSON.stringify(viewdata[getindex].nick).replace(
                    /['"]+/g,
                    ""
                  )}
                  's General Information
                </h1> */}
                <h3 style={{ marginTop: -70 }}>
                  Name :{" "}
                  {JSON.stringify(
                    viewdata[getindex].FullName || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: -20 }}>
                  Nick Name :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +30 }}>
                  Age/School Class :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Age || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  /
                  {JSON.stringify(
                    viewdata[getindex].ClassInSchool || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                {/* </div> */}
                <h3 style={{ marginTop: -70, marginLeft: +300 }}>
                  Phone :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Mobile || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: -20, marginLeft: +300 }}>
                  Line :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Line || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>

                <h3 style={{ marginTop: +30, marginLeft: +300 }}>
                  Email :{" "}
                  <Mailto
                    email={JSON.stringify(
                      viewdata[getindex].Email || "<No Data>"
                    ).replace(/['"]+/g, "")}
                  ></Mailto>
                </h3>
                <div className="BarChartN1" style={{ marginTop: +190 }}>
                  <BarChartInfo dataa={objInfo[getindex]} />
                </div>
              </>
            );
          } else if (Column == 2) {
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Course
                </h1>
                <h3 style={{ marginTop: +1 }}>
                  Current :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Course || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +50 }}>
                  Gen :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Gen || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +100 }}>
                  Level :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Level || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +150 }}>
                  Interest :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Interest || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +1, marginLeft: +300 }}>
                  From :{" "}
                  {JSON.stringify(
                    viewdata[getindex].ComeFrom || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +50, marginLeft: +300 }}>
                  Experience :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Experience || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +100, marginLeft: +300 }}>
                  Goal :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Goal || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
              </>
            );
          } else if (Column == 3) {
            if (!viewdata[getindex] || viewdata[getindex].length <= 0) return;
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Problems
                </h1>
                <h3 style={{ marginTop: +1 }}>เกิดจาก :</h3>
                <h3 style={{ marginTop: +30, marginLeft: +20 }}>
                  {JSON.stringify(
                    viewdata[getindex].CauseProblem || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +150 }}>ผลกระทบ :</h3>
                <h3 style={{ marginTop: +180, marginLeft: +20 }}>
                  {JSON.stringify(
                    viewdata[getindex].Effect || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: +300 }}>แนวทางแก้ไขที่แนะนำ :</h3>
                <h3 style={{ marginTop: +330, marginLeft: +20 }}>
                  {JSON.stringify(
                    viewdata[getindex].Solution || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
              </>
            );
          } else if (Column == 4) {
            if (!viewdata[getindex] || viewdata[getindex].length <= 0) return;
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Ability
                </h1>
                <h3 style={{ marginTop: +300 }}>Description : </h3>
                <h3 style={{ marginTop: +330, marginLeft: +20 }}>
                  {JSON.stringify(
                    viewdata[getindex].Description || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <BarChartAbility dataa={objAbility[getindex]} />
              </>
            );
          } else if (Column == 5) {
            if (!viewdata[getindex] || viewdata[getindex].length <= 0) return;
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Skill
                </h1>
                <h3 style={{ marginTop: +270, marginLeft: -10 }}>
                  Description :{" "}
                </h3>
                <h3 style={{ marginTop: +300, marginLeft: -10 }}>
                  {JSON.stringify(
                    viewdata[getindex].Reason || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <div className="BarChartN1">
                  <BarChartSkill dataa={objSkill[getindex]} />
                </div>
              </>
            );
          } else if (Column == 6) {
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].Nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Project
                </h1>
                <img
                  src={viewdata[getindex].ImgProject == undefined?image:JSON.stringify(
                    viewdata[getindex].ImgProject 
                  ).replace(/['"]+/g, "")}
                />{" "}
                <h3 style={{ marginTop: +300 }}>
                  Project Name :{" "}
                  {JSON.stringify(
                    viewdata[getindex].ProjectName || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                
                <h3 style={{ marginTop: +330 }}>Description : </h3>
                <h3 style={{ marginTop: +360, marginLeft: +20 }}>
                  {JSON.stringify(
                    viewdata[getindex].ProjectDescription || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                {/* <h3 style={{ marginTop: +330 }}>
                  {JSON.stringify(viewdata[getindex].projectdescription).replace(
                    /['"]+/g,
                    ""
                  )}
                </h3> */}
              </>
            );
          } else if (Column == 0) {
            return (
              <>
                <h1>Tutorial</h1>
                <h3 style={{ marginTop: +0 }}>
                  {" "}
                  1. พิมพ์ชื่อและเลือกข้อมูลนักเรียนได้บนหัวตาราง
                </h3>
                <h3 style={{ marginTop: +40 }}>
                  {" "}
                  2.
                  คลิกที่ตารางแต่ละช่องเพื่อดูรายละเอียดข้อมูลนักเรียนเพิ่มเติมได้
                </h3>
                <h3 style={{ marginTop: +90 }}>
                  {" "}
                  3. คลิกที่มุมขวาบนเพื่อไปหน้าอื่นกดที่ Hamster Hub
                  ที่มุมซ้ายบนเพื่อกลับหน้าแรก
                </h3>
                <h4 style={{ marginTop: +190  ,marginRight:'50%',color:'red'}}> ##ข้อมูลนี้ไม่ใช่ข้อมูลจริง</h4>
                <video
                  loop
                  autoPlay
                  muted
                  width="70%"
                  style={{ marginTop: +10 }}
                >
                  <source src={mainTotu} type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </>
            );
          }
        })()}
      </div>
    </>
  );
} // )}}a
function Mailto(email) {
  return <a href={`mailto:${email.email}`}>{email.email}</a>;
}
