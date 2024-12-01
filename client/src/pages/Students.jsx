import React, { useState, useEffect } from "react";

import { PiStudentBold } from "react-icons/pi"

import Axios from "../constants/api"
import StudentsTable from "../components/tables/StudentsTable"
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
      <div class="p-7 w-screen flex flex-col items-center">
        <div class="bg-white card card-compact w-full max-w-7xl shadow-xl">
          <div class="card-body">
            <div class="bg-blue-100 p-5 rounded-lg shadow-md mb-6 flex-col text-center">
              <h1 class="text-3xl font-abril text-blue-800 pb-4">Student Record Management</h1>
              <p class="text-lg text-gray-700 mt-2">
                The <strong>Students Page</strong> serves as the central hub for managing student records. Here, you can:
              </p>
              <ul class="text-lg text-gray-700 mt-4 text-left">
                <li><strong>View All Students:</strong> Easily browse a list of all enrolled students.</li>
                <li><strong>Edit Student Details:</strong> Update information like enrolled courses or grades to keep records accurate and up-to-date.</li>
                <li><strong>Remove Students:</strong> Clean up your records by removing students no longer active in the system.</li>
              </ul>
            </div>

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;


