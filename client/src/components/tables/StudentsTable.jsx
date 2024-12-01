import { useState } from 'react';

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import Axios from '../../constants/api';
import DeleteModal from '../modals/DeleteModal';
import EditStudentModal from '../modals/EditStudentModal';


const StudentsTable = ({ students, getStudentRecords }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    dateOfBirth: "",
    email: "",
    phoneNum: ""
  })

  // put request to edit a certain student
  const editStudentRecord = (id) => {
    Axios.put(`/api/student/update-student/${id}`, form)
      .then(res => {
        // clear the from after succcessfull edit
        setForm({
          studentId: "",
          name: "",
          dateOfBirth: "",
          email: "",
          phoneNum: ""
        })
        setErrorMessage("")
        // get the new updated record to be displayed on the table
        getStudentRecords()
        // hide the modal
        setEditModal(false)
      })
      .catch(err => {
        // log errors
        console.log(err)
        setErrorMessage(err.response.data)
      })
  }

  // delete request to delete a certain student by id
  const deleteStudentRecord = (id) => {
    Axios.delete(`/api/student/delete-student/${id}`)
      .then((res) => {
        // upon succesfull deletion, show the updated table
        getStudentRecords()
      })
      .catch((err) => {
        // log error
        console.log(err)
      })
      .finally(() => {
        // hide the delete modal
        setDeleteModal(false)
      })
  }


  // populate the edit modal with the selected student 
  const handleEditStudent = (student) => {
    setForm({
      studentId: student.studentId,
      name: student.name,
      dateOfBirth: student.dateOfBirth,
      email: student.email,
      phoneNum: student.phoneNum
    })
    // show the edit form modal
    setEditModal(true);
  }

  // handles when you click delete to show modal and get the student id
  const handleDeleteClick = (id) => {
    // set the if of the student chosen
    setSelectedStudent(id)
    // show the delete modal
    setDeleteModal(true)
  }

  // handles user confirmation to delete the record
  const handleConfirmDelete = () => {
    if (selectedStudent) {
      // call function that delete reccord
      deleteStudentRecord(selectedStudent)
      // clear selected student
      setSelectedStudent(null)
    }
  }

  // function to hide or show delete modal
  const toggleModal = () => {
    setDeleteModal(!deleteModal);
  }

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>StudentID</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Date Of Birth</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Email</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Phone</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>{student.studentId}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>{student.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>{student.dateOfBirth}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>{student.email}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>{student.phoneNum}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#007bff" }}
                    onClick={() => handleEditStudent(student)}
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#dc3545" }}
                    onClick={() => handleDeleteClick(student.studentId)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteModal && (
        <DeleteModal
          title={"Delete Student"}
          message={"Are you sure you want to delete this student record?"}
          toggleModal={toggleModal}
          onDelete={handleConfirmDelete}
        />
      )}

      {editModal && (
        <EditStudentModal
          form={form}
          onSubmit={editStudentRecord}
          toggleModal={() => {
            setEditModal(false)
            setErrorMessage("")
          }}
          errorMsg={errorMessage}
          setForm={setForm}
        />
      )}

    </>
  );
};

export default StudentsTable;
