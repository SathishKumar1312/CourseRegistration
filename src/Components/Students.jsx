import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./students.css";

function Students({ students, reload, setReload }) {
  const [editId, setEditId] = useState(-1);
  const [updateName, setUpdateName] = useState("");
  const [updateMail, setUpdateMail] = useState("");
  const [updateCourse, setUpdateCourse] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editId !== -1) {
      const student = students.find((item) => item.id === editId);
      if (student) {
        setUpdateName(student.name);
        setUpdateMail(student.email);
        setUpdateCourse(student.courseName);
      }
    } else {
      setUpdateName("");
      setUpdateMail("");
      setUpdateCourse("");
    }
  }, [editId, students]);

  async function handleUpdate(id) {
    if (updateName == "" || updateMail == "" || updateCourse == "") {
      toast.error("Field Cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      let response = await axios.put("http://localhost:8080/updateStudent", {
        id,
        name: updateName,
        email: updateMail,
        courseName: updateCourse,
      });
      setIsLoading(false);
      setReload(!reload);
      setEditId(-1);
      toast.success(response.data);
    } catch (error) {
      setIsLoading(false);
      if (Object.is(error.response)) {
        toast.error(error.response.data);
      } else {
        toast.error(error?.message);
      }
    }
  }

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      let response = await axios.delete(
        `http://localhost:8080/deleteStudent/${id}`
      );
      setIsLoading(false);
      setReload(!reload);
      toast.success(response.data);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  }
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Mail ID</th>
          <th>Course Enrolled</th>
          <th>Weeks Left</th>
          <th colSpan={2}>Modify</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>No students enrolled</td>
          </tr>
        )}
        {students.map((item) => (
          <tr key={item.id}>
            {editId === item.id && (
              <>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    name="updateName"
                    placeholder="Enter the name"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="updateMail"
                    placeholder="Enter the Mail"
                    value={updateMail}
                    onChange={(e) => setUpdateMail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="updateCourse"
                    placeholder="Enter the Course"
                    value={updateCourse}
                    onChange={(e) => setUpdateCourse(e.target.value)}
                  />
                </td>
                <td>{item.weeksLeft}</td>
                <td>
                  <button onClick={() => handleUpdate(item.id)} disabled={isLoading}>Update</button>
                </td>
                <td>
                  <button onClick={() => setEditId(-1)} disabled={isLoading}>Cancel</button>
                </td>
              </>
            )}
            {editId !== item.id && (
              <>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.courseName}</td>
                <td>{item.weeksLeft}</td>
                <td>
                  <button onClick={() => setEditId(item.id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Students;
