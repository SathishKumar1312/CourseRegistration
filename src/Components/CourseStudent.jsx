import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
function CourseStudent({ courseId, courses }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url =
    "https://courseregistrationbackend-7kgk.onrender.com/";

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
              <td colSpan={4} style={{ position: "relative", height: "80px" }}>
                <ScaleLoader
                  color="#fef8f8"
                  size={50}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </td>
            </tr>
          )}
          {!isLoading && students.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No students enrolled
              </td>
            </tr>
          )}
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default CourseStudent;
