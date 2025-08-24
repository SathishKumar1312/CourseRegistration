import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

function Register({ courses, reload, setReload }) {
  const [studentName, setStudentName] = useState("");
  const [mailId, setMailId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url =
    "https://courseregistrationbackend-7kgk.onrender.com/";

  // Convert your course list into react-select options
  const courseOptions = courses.map((c) => ({
    value: c.courseName,
    label: c.courseName,
  }));

  const resetForm = () => {
    setStudentName("");
    setMailId("");
    setSelectedCourse(null);
  };

  const customStyles = {
    container: (base) => ({
      ...base,
      width: "85%", // fixed width
      marginTop: "2px",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1e1e1e",
      borderColor: state.isFocused ? "#4f46e5" : "#333",
      boxShadow: state.isFocused ? "0 0 0 2px #4f46e5" : "none",
      color: "#fff",
      paddingLeft: "8px",
      borderRadius: "8px",
      minHeight: "40px",
      "&:hover": {
        borderColor: "#4f46e5",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2b2b2b",
      color: "#fff",
      borderRadius: "8px",
      marginTop: "4px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
        ? "#3b3b3b"
        : "transparent",
      color: "#fff",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "6px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#aaa",
    }),
    input: (base) => ({
      ...base,
      color: "#fff", // 👈 makes typed text white
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = studentName.trim();
    const email = mailId.trim();
    const course = selectedCourse?.value;

    if (!name || !email || !course) {
      toast.error("All fields are required");
      return;
    }

    const found = courses.find((c) => c.courseName === course);
    if (!found) {
      toast.error("Course not found");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      toast.error("Invalid email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(url + "addStudent", {
        name,
        email,
        courseName: course,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Student Registered Successfully");
        resetForm();
        setReload(!reload);
      } else {
        toast.error(`Unexpected status: ${res.status}`);
      }
    } catch (err) {
      toast.error(err?.response?.data || err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <h2>Register for a Course</h2>

      <input
        type="text"
        placeholder="Enter your name"
        name="name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        autoComplete="name"
      />

      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        value={mailId}
        onChange={(e) => setMailId(e.target.value)}
        autoComplete="email"
      />

      {/* React-select single select */}
      <Select
        options={courseOptions}
        value={selectedCourse}
        onChange={(opt) => setSelectedCourse(opt)}
        placeholder="Select a course..."
        noOptionsMessage={() => "No course found"}
        isClearable
        styles={customStyles}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
