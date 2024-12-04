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
      <div className="p-7 w-screen flex flex-col items-center">
        <div className="bg-white card card-compact w-full max-w-7xl shadow-xl">
          <div className="card-body">
            <div className="bg-blue-100 p-5 rounded-lg shadow-md mb-6 flex-col text-center">
              <h1 className="text-3xl font-abril text-blue-800 pb-4">Course Management</h1>
              <p className="text-lg text-gray-700 mt-2">
                The <strong>Courses Page</strong> provides an intuitive interface to manage course offerings. Here, you can:
              </p>
              <ul className="text-lg text-gray-700 mt-4 text-left">
                <li><strong>View All Courses:</strong> Access a detailed list of available courses, including descriptions and key details.</li>
                <li><strong>Add New Courses:</strong> Create new course offerings to keep your curriculum updated and relevant.</li>
                <li><strong>Edit Course Details:</strong> Update course information such as schedules, instructors, or prerequisites.</li>
                <li><strong>Remove Courses:</strong> Maintain an accurate catalog by removing outdated or discontinued courses.</li>
              </ul>
            </div>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses