import axios from "axios";
// import { StudentCard } from "../student_card";

import React, { useEffect, useState } from "react";
// import MyChart from "../BarChar"
import SearchBar from "./filter_selecter";
import "./style.css";
import logo from "../../../true_Logo.png";

export function HomeSceen() {
  const [ready, setready] = useState("");
  const [likedCount, setLikedCount] = useState("Loading...");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState("");
  const [data, setdata] = useState("");

  const getStudent = async () => {
    const response = await axios.get(
      "https://backend-of-hamsterhub.herokuapp.com/D_STUDENTS/"
    );

    const data = await response.data;

    // setStudents(JSON.parse(JSON.stringify(data)));
    setStudents(JSON.parse(JSON.stringify(data)));
    setLikedCount("");
    setready("ready");
    // console.log(JSON.stringify(data));
  };

  useEffect(() => {
    //  getData();
    getStudent();
  }, []);

  const [fileredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFIlter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = students.filter((value) => {
      return value.nick.includes(searchWord);
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");

    // let get_Data = JSON.stringify(students)
  };
  return (
    <>
      <SearchBar placehover="Search Name" data={students} />
      <div>
        {likedCount != "" ? (
          <img src={logo} class="rotate" width="120" height="100" />
        ) : (
          ""
        )}
        <h2>{likedCount}</h2>
      </div>
    </>
  );
}
