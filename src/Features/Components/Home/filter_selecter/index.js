import React, { useEffect, useState } from "react";
import "./style.css";
import { MakeTable } from "../table";


function SearchBar({ placehover, data }) {
  
  const [fileredData, setFilteredData] = useState([]);
  const [name, setname] = useState("");
  const [navbarState, setNavbarState] = useState(false);
  const [usecourse, setusecourse] = useState("All Course");
  const [uselevel, setuselevel] = useState("All Level");
  const [usegen, setusegen] = useState("All Gen");
  useEffect(() => {
    setusegen(
      document.getElementById("genID") == null
        ? "All Gen"
        : document.getElementById("genID").value
    );
    setuselevel(
      document.getElementById("levelID") == null
        ? "All Level"
        : document.getElementById("levelID").value
    );
    console.log(usegen);
  }, [usecourse]);
  useEffect(() => {
    setuselevel(
      document.getElementById("levelID") == null
        ? "All Level"
        : document.getElementById("levelID").value
    );
    console.log(usegen);
  }, [usegen]);

  if (!data || data.length <= 0) return;
  let Rawcourse = data.map((d, index) => {
    return d.Course;
  });

  let F_course = Array.from(new Set(Rawcourse)).sort();

  if (usecourse == "All Course") {
    var filter_to_gen = data.filter(function (i, n) {
      return i;
    });
  } else {
    var filter_to_gen = data.filter(function (i, n) {
      return i.Course === usecourse;
    });
  }

  let Rawgen = filter_to_gen.map((d, index) => {
    return d.Gen;
  });
  let F_gen = Array.from(new Set(Rawgen)).sort();

  if (usegen == "All Gen") {
    var filter_to_level = filter_to_gen.filter(function (i, n) {
      return i;
    });
  } else {
    var filter_to_level = filter_to_gen.filter(function (i, n) {
      return i.Gen === usegen;
    });
  }

  let Rawlevel = filter_to_level.map((d, index) => {
    return d.Level;
  });

  let F_level = Array.from(new Set(Rawlevel)).sort();
  console.log(F_course);

  const Changebg = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 80) {
      setNavbarState(true);
    } else {
      setNavbarState(false);
    }
  };

  window.addEventListener("scroll", Changebg);

  const handleFIlter = (event) => {
    const searchWord = event.target.value;

    setname(searchWord);
    const newFilter = data.filter((value) => {
      return value.nick.includes(searchWord);
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <>
      
        
        
      
      <div className="To_navvBar">
        <div className="search">
          <div className={navbarState ? "searchInputs active" : "searchInputs"}>
            <form>
              <input
                id="getname"
                type="text"
                placeholder={placehover}
                value={name}
                onChange={handleFIlter}
                autoComplete="off"
              />
              <input type="submit" hidden />
            </form>
          </div>
        </div>

        <div className="searchC">
          <div className="Select_Couse">
            <form>
              <select
                id="courseID"
                className={navbarState ? "searchSEA active" : "searchSEA"}
                onChange={(e) => setusecourse(e.target.value)}
              >
                <option value={"All Course"} selected="selected">
                  All Course
                </option>
                {F_course.map((F, index) => {
                  return <option value={F}>{F}</option>;
                })}
              </select>
            </form>
          </div>
        </div>

        <div className="searchG">
          <div className="Select_Gen">
            <form>
              <select
                id="genID"
                className={navbarState ? "searchGEN active" : "searchGEN"}
                onChange={(e) => setusegen(e.target.value)}
              >
                <option value={"All Gen"} selected="selected">
                  All Gen
                </option>
                {F_gen.map((F, index) => {
                  return <option value={F}>{F}</option>;
                })}
              </select>
            </form>
          </div>
        </div>
        <div className="searchL">
          <div className="Select_Lvl">
            <form>
              <select
                id="levelID"
                className={navbarState ? "searchLVL active" : "searchLVL"}
                onChange={(e) => {
                  setuselevel(e.target.value);
                }}
              >
                <option value={"All Level"} selected="selected">
                  All Level
                </option>
                {F_level.map((F, index) => {
                  return <option value={F}>{F}</option>;
                })}
              </select>
            </form>
          </div>
        </div>
      </div>

      <MakeTable
        data_get={data}
        name={name}
        course={usecourse}
        gen={usegen}
        level={uselevel}
      />
    </>
  );
}

export default SearchBar;
