import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
function CourseStudent({ courseId, courses }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://courseregistrationbackend-7kgk.onrender.com/";

  async function fetchCourseStudents() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}courseStudents/${courseId}`);
      setStudents(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data || error.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const courseName =
    courses?.find((c) => c.id === courseId)?.courseName || "Unknown Course";

  useEffect(() => {
    fetchCourseStudents();
  }, [courseId]);

  return (
    <React.Fragment>
      <h2 style={{ marginTop: 30, textAlign: "center" }}>
        {courseName} Course Students
      </h2>
      <table border={1} style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="loading">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ScaleLoader color="#36d7b7" size={30} />
                </div>
              </td>
            </tr>
          )}
          {!isLoading && students.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="loading"
                style={{ height: "100px", fontSize: "20px" }}
              >
                No students enrolled
              </td>
            </tr>
          )}
          {!isLoading &&
            students.length > 0 &&
            students.map((student) => (
              <tr key={student.id}>
                <td data-label="ID">{student.id}</td>
                <td data-label="Name">{student.name}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Enrolled Date">{student.startDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default CourseStudent;
