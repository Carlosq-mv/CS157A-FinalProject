import { useState, useEffect } from "react"

import { PiBookOpenTextBold } from "react-icons/pi"

import Axios from "../constants/api"
import CoursesTable from "../components/CoursesTable"
import AddCourseModal from "../components/modals/AddCourseModal"


const Courses = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [courseForm, setCourseForm] = useState({
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
      ...courseForm,
      section: Number(courseForm.section),
      credts: Number(courseForm.credits)
    }

    Axios.post("/api/course/add-course", payload)
      .then(res => {
        // clear form 
        setCourseForm({
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

  // function to change the form values
  const handleChange = (key, value) => {
    setCourseForm({ ...courseForm, [key]: value });
  }
  
  // function to toggle modal for adding new course form 
  const toggleModal = () => {
    setShowModal(!showModal)
    if(!showModal) {
      setErrorMessage("")
    }
  }

  // when component mounts, get course records from database
  useEffect(() => {
    getCourses()
  }, [])

  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>

        <div role="alert" className="alert alert-info rounded-md">
          <PiBookOpenTextBold className="h-6 w-6 shrink-0 stroke-current" />
          <span className="font-abril text-xl">Courses</span>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px 5px 5px 5px" }}>

          <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>
            <CoursesTable courses={courses} getCourseRecords={getCourses} />
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button onClick={toggleModal} className="btn btn-success text-white">Add Course</button>
          </div>

          {showModal && (
            <AddCourseModal
              form={courseForm}
              onSubmit={addCourse}
              onChange={handleChange}
              toggleModal={toggleModal}
              errorMsg={errorMessage}
            />
          )}

        </div>
      </div>
    </>
  )
}

export default Courses