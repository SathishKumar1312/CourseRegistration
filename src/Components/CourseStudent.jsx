import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
function CourseStudent({ courseId, courses }) {
  const [students, setStudents] = React.useState([]);

  const url =
    "https://courseregistration-50030584403.development.catalystappsail.in/";

  async function fetchCourseStudents() {
    try {
      const response = await axios.get(`${url}courseStudents/${courseId}`);
      setStudents(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data || error.message || "Something went wrong"
      );
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
          {students.length === 0 && (
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
