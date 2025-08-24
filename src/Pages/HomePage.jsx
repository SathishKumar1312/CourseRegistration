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

  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const url =
    "https://courseregistration-50030584403.development.catalystappsail.in/";

  async function fetchCourses() {
    try {
      setIsLoading(true);
      const res = await axios.get(url + "courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchStudents() {
    try {
      setIsLoading(true);
      const res = await axios.get(url + "students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
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
            <Courses
              courses={courses}
              reload={reload}
              setReload={setReload}
              isLoading={isLoading}
            />
          )}
          {viewStudent && (
            <Students
              students={students}
              reload={reload}
              setReload={setReload}
              isLoading={isLoading}
            />
          )}
          {viewRegister && (
            <Register
              courses={courses}
              reload={reload}
              setReload={setReload}
              isLoading={isLoading}
            />
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
