import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CourseStudent from "./CourseStudent";
import { ScaleLoader } from "react-spinners";

function Courses({ courses, reload, setReload, isLoading }) {
  const [viewAddCourse, setViewAddCourse] = useState(false);
  const [viewCourseStudents, setViewCourseStudents] = useState(false);
  const [courseId, setCourseId] = useState(null);

  const [courseName, setCourseName] = useState("");
  const [trainer, setTrainer] = useState("");
  const [duration, setDuration] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  const url = "https://courseregistrationbackend-7kgk.onrender.com/";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!courseName || !trainer || !duration) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isNaN(duration) || duration <= 0) {
      toast.error("Duration must be a positive number");
      return;
    }

    setIsAdding(true);

    try {
      let response = await axios.post(url + "addCourse", {
        courseName,
        trainer,
        durationInWeeks: duration,
      });
      if (response.status === 201) {
        setIsAdding(false);
        setCourseName("");
        setTrainer("");
        setDuration("");
        toast.success(response.data);
        setViewAddCourse(false);
        setReload(!reload);
      }
    } catch (error) {
      setIsAdding(false);
      if (Object.is(error.response)) {
        toast.error(error?.response?.data);
      } else {
        toast.error(error?.message);
      }
    }
  }

  function handleViewCourseStudents(clickedCourseId) {
    setViewCourseStudents(true);
    setCourseId(clickedCourseId);
  }

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Trainer</th>
            <th>Duration (weeks)</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6} style={{ position: "relative", height: "80px" }}>
                <ScaleLoader
                  color="#fef8f8"
                  size={50}
                  style={{
                    position: "relative",
                  }}
                />
                <p>
                  Backend is deployed on Free version of Render. It may take a
                  while to respond for the first request.
                </p>
              </td>
            </tr>
          )}
          {!isLoading && !viewAddCourse && courses.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No courses available
              </td>
            </tr>
          )}

          {courses.map((item) => (
            <tr key={item.id}>
              <td
                data-label="ID"
                onClick={() => handleViewCourseStudents(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.id}
              </td>
              <td
                data-label="Course Name"
                onClick={() => handleViewCourseStudents(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.courseName}
              </td>
              <td data-label="Trainer">{item.trainer}</td>
              <td data-label="Duration (weeks)">{item.durationInWeeks}</td>
            </tr>
          ))}

          {viewAddCourse && (
            <tr className="no-label-row">
              {/* First cell blank maybe */}
              <td></td>
              <td>
                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Trainer"
                  value={trainer}
                  onChange={(e) => setTrainer(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Duration (weeks)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={viewAddCourse ? "between-addCourse" : "center-addCourse"}>
        <button
          onClick={() => setViewAddCourse(!viewAddCourse)}
          disabled={isAdding}
        >
          {viewAddCourse ? "Cancel" : "Add Course"}
        </button>
        {viewAddCourse && (
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={isAdding}
          >
            Submit
          </button>
        )}
      </div>
      {viewCourseStudents && (
        <>
          <CourseStudent courseId={courseId} courses={courses} />
          <center>
            <button
              onClick={() => setViewCourseStudents(false)}
              style={{ marginTop: 14, marginBottom: 50 }}
            >
              Close
            </button>
          </center>
        </>
      )}
    </div>
  );
}

export default Courses;
