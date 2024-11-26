import React, { useState, useEffect } from "react";

import { PiStudentBold } from "react-icons/pi"

import Axios from "../constants/api"
import StudentsTable from "../components/StudentsTable"
import AddStudentModal from "../components/modals/AddStudentModal";
import Table from "../components/Table";


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
    <>
      <Table
        title={"Students"}
        icon={<PiStudentBold className="h-6 w-6 shrink-0 stroke-current" />}
      >

        <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>
          <StudentsTable students={students} getStudentRecords={getStudentRecords} />
        </div>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button onClick={toggleModal} className="btn btn-success text-white">Add New Student</button>
        </div>

        {showModal && (
          <AddStudentModal
            form={studentForm}
            onSubmit={addStudentRecord}
            toggleModal={toggleModal}
            errorMsg={errorMessage}
            setForm={setStudentForm}
          />
        )}
      </Table>
    </>
  );
};

export default Students;


