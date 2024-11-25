import React, { useState, useEffect } from "react";

import { PiStudentBold } from "react-icons/pi"

import Axios from "../constants/api"
import StudentsTable from "../components/StudentsTable"
import AddStudentModal from "../components/modals/AddStudentModal";


const Students = () => {
  const [showModal, setShowModal] = useState(false)
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
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
        setErrorMessage("")
        // show the updated table
        getStudentRecords()
        // hide modal
        setShowModal(false)
      })
      .catch(err => {
        // log errors
        console.log(err.response.data)
        setErrorMessage(err.response.data)
      })
  }
  // function to change the form values
  const handleChange = (key, value) => {
    setStudentForm({ ...studentForm, [key]: value });
  }

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal)
    if (!showModal) {
      setErrorMessage("") // clear error message when closing modal
    }
  }

  // when component mounts, get students records from database
  useEffect(() => {
    getStudentRecords()
  }, [])

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

      {showModal && (
        <AddStudentModal
          form={studentForm}
          onSubmit={addStudentRecord}
          onChange={handleChange}
          toggleModal={toggleModal}
          errorMsg={errorMessage}
        />
      )}

    </div>
  );
};

export default Students;


