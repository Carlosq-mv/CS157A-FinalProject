import { useState, useEffect } from "react"

import { PiBookOpenTextBold } from "react-icons/pi"

import Axios from "../constants/api"
import CoursesTable from "../components/tables/CoursesTable"
import AddCourseModal from "../components/modals/AddCourseModal"
import Table from "../components/Table"


const Courses = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    section: "",
    credits: ""
  })

  // get request to get all courses from the database
  const getCourses = () => {
    Axios.get("/api/course/all-courses")
      .then(res => {
        setCourses(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  // post request to add a new course
  const addCourse = (e) => {
    e.preventDefault()

    // change section and credits to type Number
    const payload = {
      ...form,
      section: Number(form.section),
      credts: Number(form.credits)
    }

    Axios.post("/api/course/add-course", payload)
      .then(res => {
        // clear form 
        setForm({
          courseName: "",
          section: "",
          credits: ""
        })
        setErrorMessage("")
        // show the update table
        getCourses()
        // hide the modal
        setShowModal(false)
      })
      .catch(err => {
        // log errors
        console.log(err)
        setErrorMessage(err.response.data)
      })
  }

  // function to toggle modal for adding new course form 
  const toggleModal = () => {
    setShowModal(!showModal)
    if (!showModal) {
      setErrorMessage("")
    }
  }

  // when component mounts, get course records from database
  useEffect(() => {
    getCourses()
  }, [])

  return (
    <>
      <Table
        title={"Courses"}
        icon={<PiBookOpenTextBold className="h-6 w-6 shrink-0 stroke-current" />}
      >
        <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>
          <CoursesTable courses={courses} getCourseRecords={getCourses} />
        </div>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button onClick={toggleModal} className="btn btn-success text-white">Add Course</button>
        </div>

        {showModal && (
          <AddCourseModal
            form={form}
            onSubmit={addCourse}
            toggleModal={toggleModal}
            errorMsg={errorMessage}
            setForm={setForm}
          />
        )}
      </Table>
    </>
  )
}

export default Courses