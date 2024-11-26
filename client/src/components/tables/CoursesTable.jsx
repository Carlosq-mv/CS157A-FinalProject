import { useState } from 'react';

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import Axios from '../../constants/api';
import DeleteModal from '../modals/DeleteModal';
import EditCourseModal from '../modals/EditCourseModal';


const CoursesTable = ({ courses, getCourseRecords }) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    section: "",
    credits: ""
  })

  // put request to edit a certain course
  const editCourseRecord = (id) => {
    Axios.put(`/api/course/update-course/${id}`, form)
      .then(res => {
        // clear the form after successfull edit
        setForm({
          courseId: "",
          courseName: "",
          section: "",
          credits: ""
        })
        setErrorMessage("")
        // get the new updated record to display on table
        getCourseRecords()
        // hide the modal
        setEditModal(false)
      })
      .catch(err => {
        // log errors
        console.log(err)
        setErrorMessage(err.response.data)
      })
  }

  // delete request to delete a certain course 
  const deleteCourseRecord = (id) => {
    Axios.delete(`/api/course/delete-course/${id}`)
      .then(res => {
        // after successfull deletion, display the new table
        getCourseRecords()
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

  // populate the edit form modal with the selected course
  const handleEditCourse = (course) => {
    setForm({
      courseId: course.courseId,
      courseName: course.courseName,
      section: course.section,
      credits: course.credits
    })
    // show the edit form modal
    setEditModal(true)
  }

  // function that handles when you select a certain course to delete
  const handleDeleteClick = (id) => {
    // set the id of the course chosen
    setSelectedCourse(id)
    // show the delete modal
    setDeleteModal(true)
  }

  // function to confirm a deletion of a course
  const handleConfirmDelete = () => {
    if (selectedCourse) {
      // delete the course
      deleteCourseRecord(selectedCourse)
      setSelectedCourse(null)
    }
  }

  // function to hide or show deleteModal
  const toggleModal = () => {
    setDeleteModal(!deleteModal)
  }

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Course</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Section</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Credits</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{(course.courseName).toUpperCase()}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{course.section}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{course.credits + ".00"}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#007bff" }}
                    onClick={() => handleEditCourse(course)}
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    style={{ background: "transparent", border: "none", cursor: "pointer", margin: "0 5px", color: "#dc3545" }}
                    onClick={() => handleDeleteClick(course.courseId)}
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
          title={"Delete Course"}
          message={"Are you sure you want to delete this course?"}
          toggleModal={toggleModal}
          onDelete={handleConfirmDelete}
        />
      )}

      {editModal && (
        <EditCourseModal
          form={form}
          setForm={setForm}
          onSubmit={editCourseRecord}
          toggleModal={() => {
            setEditModal(false)
            setErrorMessage("")
          }}
          errorMsg={errorMessage}
        />
      )}
    </>
  )
}

export default CoursesTable