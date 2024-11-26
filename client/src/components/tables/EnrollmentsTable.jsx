import { useState } from 'react'

import Axios from '../../constants/api';

const EnrollmentsTable = ({ enrollments, getRecords }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [form, setForm] = useState({
    enrollmentId: "",
    studentName: "",
    courseName: "",
    courseSection: "",
    courseCredits: "",
    enrollmentDate: "",
  })
  // form here

  // put request to edit an enrollment record 
  const editEnrollmentRecord = (id) => {
    Axios.put("")
      .then(res => {
        console.log(res)
        // clear the form here
        setForm({
          enrollmentId: "",
          studentName: "",
          courseName: "",
          courseSection: "",
          courseCredits: "",
          enrollmentDate: "",
        })
        setErrorMessage("")
        // get new updated records to be displayed on table
        getRecords()
        // hide the modal
        setEditModal(false)
      })
      .catch(err => {
        // log the error
        console.log(err)
        // set error message
        setErrorMessage(err.response.data)
      })
  }

  // delete request for enrollments
  const deleteEnrollmentRecord = (id) => {
    Axios.delete("")
      .then(res => {
        // upon deletion, show the updated table
        getRecords()
      })
      .catch(err => {
        // log error
        console.log(err)
      })
      .finally(() => {
        // hide the delete modal
        setDeleteModal(false)
      })
  }

  // populate the edit modal with the selected record
  const handleEditEnrollment = (enrollment) => {
    setForm({
      enrollmentId: enrollment.enrollmentId,
      studentName: enrollment.studentName,
      courseName: enrollment.courseName,
      courseSection: enrollment.courseSection,
      courseSection: enrollment.courseSection,
      enrollmentDate: enrollment.enrollmentDate
    })
    // show the moda
    setEditModal(true)
  }

  // handles when the user clicks delete 
  const handleDeleteClick = (id) => {
    // set the id of the chosen record
    setSelectedEnrollment(id)
    // show delete modal
    setDeleteModal(true)
  }

  // handle user confirmation to delete a record
  const handleConfirmDelete = () => {
    if (selectedEnrollment) {
      // call the function to delete that record
      deleteEnrollmentRecord(selectedEnrollment)
      // clear the selected record
      setSelectedEnrollment(null)
    }
  }

  // function to change the form values
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  // hide or show delete modal
  const toggleModal = () => {
    setDeleteModal(!deleteModal)
  }

  return (
    <>


      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Student Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Course Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Course Section</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Course Credits</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Enrollment Date</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrollments && enrollments.length > 0 ? (
            students.map((enrollment, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{enrollment.studentName}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{enrollment.courseName}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{enrollment.courseSection}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{enrollment.courseCredits}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{enrollment.enrollmentDate}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#007bff" }}
                    onClick={() => handleEditEnrollment(enrollment)}
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#dc3545" }}
                    onClick={() => handleDeleteClick(enrollment.enrollmentId)}
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

      {/* {deleteModal && (
        <DeleteModal
          title={"Delete Student"}
          message={"Are you sure you want to delete this student record?"}
          toggleModal={toggleModal}
          onDelete={handleConfirmDelete}
        />
      )}

      {editModal && (
        <EditStudentModal
          form={editStudentForm}
          onChange={handleChange}
          onSubmit={editStudentRecord}
          onCancel={() => {
            setEditModal(false)
            setErrorMessage("")
          }}
          errorMsg={errorMessage}
        />
      )} */}
    </>
  )
}

export default EnrollmentsTable