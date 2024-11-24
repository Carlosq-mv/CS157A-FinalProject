import React, { useState, useEffect } from "react";

import Axios from "../constants/api"
import StudentsTable from "../components/StudentsTable"
import { RxCross2 } from "react-icons/rx"
import { PiStudentBold } from "react-icons/pi"


const Students = () => {
  const [showModal, setShowModal] = useState(false)
  const [students, setStudents] = useState([])
  const [studentForm, setStudentForm] = useState({
    studentId: "",
    name: "",
    dateOfBirth: "",
    email: "",
    phoneNum: ""
  })

  // get request to get all students from database
  const getStudentRecords = () => {
    Axios.get("/api/student/all-students")
      .then(res => {
        console.log(res.data)
        // update the students variable state
        setStudents(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // post request to add a new student
  const addStudentRecord = (e) => {
    e.preventDefault();

    Axios.post("/api/student/add-student", studentForm)
      .then(res => {
        console.log(res.data)
        // clear form
        setStudentForm({
          studentId: "",
          name: "",
          dateOfBirth: "",
          email: "",
          phoneNum: ""
        })
        // show the updated table
        getStudentRecords()
      })
      .catch(err => {
        console.log(err)
      })
  }

  // when component mounts, get students records from database
  useEffect(() => {
    getStudentRecords()
  }, [])

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      {/* Content */}
      <div role="alert" className="alert alert-info rounded-md">
        <PiStudentBold className="h-6 w-6 shrink-0 stroke-current" />
        <span className="font-abril text-xl">Students</span>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px 5px 5px 5px" }}>
        {/* Scrollable Table */}
        <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>

          <StudentsTable students={students} getStudentRecords={getStudentRecords} />

        </div>
        {/* Add New Students Button */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button onClick={toggleModal} className="btn btn-success text-white">
            Add New Student
          </button>
        </div>
      </div>

      {/* Modal for Adding Students */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "400px",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "10px 10px 0 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
              }}
            >
              <h3 className="font-abril text-black text-lg">Add New Student</h3>
              <button onClick={toggleModal} className="btn btn-ghost text-black btn-circle text-lg">
                <RxCross2 />
              </button>
            </div>

            {/* Form for Adding Students */}
            <form onSubmit={addStudentRecord}>
              <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                <label style={{ color: "black" }}>
                  StudentID: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={studentForm.studentId}
                  onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })}
                  style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Name: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Date Of Birth: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  value={studentForm.dateOfBirth}
                  onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
                  style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Email: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Phone: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={studentForm.phoneNum}
                  onChange={(e) => setStudentForm({ ...studentForm, phoneNum: e.target.value })}
                  style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  className="btn btn-success text-white m-5"
                >
                  Add Student
                </button>
                <button
                  type="button"
                  className="btn btn-error "
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;


