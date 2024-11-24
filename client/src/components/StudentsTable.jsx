import React, { useState } from 'react';
import Axios from '../constants/api';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineStayCurrentLandscape } from "react-icons/md";

const StudentsTable = ({ students, getStudentRecords }) => {
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [editStudentForm, setEditStudentForm] = useState({
    studentId: "",
    name: "",
    dateOfBirth: "",
    email: "",
    phoneNum: ""
  })

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

  const editStudentRecord = (id) => {
    Axios.put(`/api/student/update-student/${id}`, editStudentForm)
      .then(res => {
        console.log(res)

        setEditStudentForm({
          studentId: "",
          name: "",
          dateOfBirth: "",
          email: "",
          phoneNum: ""
        })
        getStudentRecords()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log(`edited student ID: ${id}`)
        setEditModal(false)
      })
  }

  // handle the edit student
  const handleEditStudent = (student) => {
    setEditStudentForm({
      studentId: student.studentId,
      name: student.name,
      dateOfBirth: student.dateOfBirth,
      email: student.email,
      phoneNum: student.phoneNum
    });
    setEditModal(true);
  }

  // handles when you click delete to show modal and get the student id
  const handleDeleteClick = (id) => {
    setSelectedStudent(id)
    setShowModal(true)
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

  // handles user cancellation to delete the record
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
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Action</th>
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

      {showModal && (
        <dialog id="delete_modal" className="modal" open>
          <div className="modal-box bg-white">
            <h3 className="font-bold text-3xl text-black font-abril">Delete Confirmation</h3>
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

      {editModal && (
        <dialog id="edit_modal" className="modal" open>
          <div className="modal-box bg-white w-96">
            <h3 className="font-bold text-3xl pb-5 text-black font-abril">Edit Student</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editStudentRecord(editStudentForm.studentId);
              }}
            >
              <div className="pb-5 flex flex-col">
                <label className="text-black mb-2">Name:</label>
                <input
                  type="text"
                  className="bg-white input input-bordered w-full text-black"
                  style={{ borderColor: "rgb(204, 204, 204)" }}

                  value={editStudentForm.name}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, name: e.target.value })}
                />
              </div>
              <div className="pb-5 flex flex-col">
                <label className="text-black mb-2">Date of Birth:</label>
                <input
                  type="date"
                  className="bg-white input input-bordered w-full text-black"
                  style={{ borderColor: "rgb(204, 204, 204)" }}
                  value={editStudentForm.dateOfBirth}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="pb-5 flex flex-col">
                <label className="text-black mb-2">Email:</label>
                <input
                  type="email"
                  className="bg-white input input-bordered w-full  text-black"
                  style={{ borderColor: "rgb(204, 204, 204)" }}
                  value={editStudentForm.email}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, email: e.target.value })}
                />
              </div>
              <div className="pb-5 flex flex-col">
                <label className="text-black mb-2">Phone:</label>
                <input
                  type="text"
                  className="bg-white input input-bordered w-full text-black"
                  style={{ borderColor: "rgb(204, 204, 204)" }}
                  value={editStudentForm.phoneNum}
                  onChange={(e) => setEditStudentForm({ ...editStudentForm, phoneNum: e.target.value })}
                />
              </div>
              <div className="modal-action gap-44 items-center flex justify-center">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>

      )}

    </>
  );
};

export default StudentsTable;
