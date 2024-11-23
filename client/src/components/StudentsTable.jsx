import React, { useState } from 'react';
import Axios from '../constants/api';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from './ConfirmationModal';

const StudentsTable = ({ students, getStudentRecords }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // delete request to delete a certain student by id
  const deleteStudentRecord = (id) => {
    Axios.delete(`/api/student/delete-student/${id}`)
      .then((res) => {
        console.log(res)
        // upon succesfull deletion, show the updated table
        getStudentRecords()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log(`deleted student ID: ${id}`)
        setShowModal(false)
      })
  }

  // handles when you click delete to show modal and get the student id
  const handleDeleteClick = (id) => {
    setSelectedStudent(id)
    setShowModal(true)
  }

  // handles user confirmation to delete the recorc
  const handleConfirmDelete = () => {
    if (selectedStudent) {
      // call function that delete reccord
      deleteStudentRecord(selectedStudent)
      // clear selected student
      setSelectedStudent(null)
    }
  }

  // handles user cancelation to delete the record
  const handleCancelDelete = () => {
    // hide modal
    setShowModal(false)
    // clear selected student
    setSelectedStudent(null)
  }

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>StudentID</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Date Of Birth</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{student.studentId}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{student.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{student.dateOfBirth}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{student.email}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{student.phoneNum}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#007bff" }}
                    onClick={() => alert("Edit clicked")}
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

      {showModal && (
        <dialog id="delete_modal" className="modal" open>
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-black">Delete Confirmation</h3>
            <p className="py-4 text-black">Are you sure you want to delete this student record?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleConfirmDelete}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default StudentsTable;
