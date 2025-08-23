import React, { useState, useEffect } from "react";
import "./homePage.css";
import axios from "axios";
import Courses from "../Components/Courses";
import Students from "../Components/Students";
import Register from "../Components/Register";

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [viewCourse, setViewCourse] = useState(false);
  const [students, setStudents] = useState([]);
  const [viewStudent, setViewStudent] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);

  const [reload, setReload] = useState(false);

  async function fetchCourses() {
    const res = await axios.get("http://localhost:8080/courses");
    setCourses(res.data);
  }

  async function fetchStudents() {
    const res = await axios.get("http://localhost:8080/students");
    setStudents(res.data);
  }

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, [reload]);

  return (
    <React.Fragment>
      <div className="homePage">
        <h1>Course Registration System</h1>
        <div className="button-container">
          <button
            onClick={() => {
              setViewCourse(!viewCourse);
              setViewStudent(false);
              setViewRegister(false);
            }}
          >
            View Available Courses
          </button>
          <button
            onClick={() => {
              setViewRegister(!viewRegister);
              setViewCourse(false);
              setViewStudent(false);
            }}
          >
            Register Course
          </button>
          <button
            onClick={() => {
              setViewStudent(!viewStudent);
              setViewCourse(false);
              setViewRegister(false);
            }}
          >
            View Enrolled Students
          </button>
        </div>

        <section>
          {viewCourse && (
            <Courses courses={courses} reload={reload} setReload={setReload} />
          )}
          {viewStudent && (
            <Students
              students={students}
              reload={reload}
              setReload={setReload}
            />
          )}
          {viewRegister && (
            <Register courses={courses} reload={reload} setReload={setReload} />
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
