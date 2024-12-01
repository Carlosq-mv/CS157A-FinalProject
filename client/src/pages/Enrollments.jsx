import { useEffect, useState } from "react"
import Table from "../components/Table"
import { BsClipboardData } from "react-icons/bs"
import Axios from "../constants/api"
import AddEnrollmentModal from "../components/modals/AddEnrollmentModal"
import EnrollmentsTable from "../components/tables/EnrollmentsTable"

const Enrollments = () => {
  const [showModal, setShowModal] = useState(false)
  const [enrollments, setEnrollments] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  const [form, setForm] = useState({
    studentId: "",
    courseName: "",
    courseSection: ""
  })

  const toggleModal = () => {
    setShowModal(!showModal)
    if (!showModal) {
      setErrorMessage("")
    }
  }

  const getEnrollments = () => {
    Axios.get("/api/enrollment/enrollment-details")
      .then(res => {
        console.log(res)
        setEnrollments(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const addEnrollment = (e) => {
    e.preventDefault();
    console.log(form)
    Axios.post("/api/enrollment/add-enrollment", form)
      .then((res) => {
        console.log(res)
        // TODO: 1. clear the form
        setForm({
          studentId: "",
          courseName: "",
          courseSection: ""
        })
        getEnrollments()
        // 2. clear the error messages
        setErrorMessage("")
        // 3. hide modal
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err.response.data)
      })
  }

  useEffect(() => {
    getEnrollments()
  }, [])

  return (
    <>
      <div className="p-7 w-screen flex flex-col items-center">
        <div className="bg-white card card-compact w-full max-w-7xl shadow-xl">
          <div className="card-body">
            <div className="bg-blue-100 p-5 rounded-lg shadow-md mb-6 flex-col text-center">
              <h1 className="text-3xl font-abril text-blue-800 pb-4">Student Enrollment Management</h1>
              <p className="text-lg text-gray-700 mt-2">
                The <strong>Enrollment Page</strong> is your central platform for managing student enrollments. Here, you can:
              </p>
              <ul className="text-lg text-gray-700 mt-4 text-left">
                <li><strong>View Enrolled Students:</strong> Easily access a comprehensive list of all currently enrolled students.</li>
                <li><strong>Enroll New Students:</strong> Add students to courses and ensure their information is properly recorded.</li>
                <li><strong>Remove Enrollments:</strong> Manage records by removing outdated or invalid enrollments.</li>
              </ul>
            </div>
            <Table
              title={"Enrollments"}
              icon={<BsClipboardData className="h-6 w-6 shrink-0 stroke-current" />}
            >
              <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>
                <EnrollmentsTable enrollments={enrollments} getRecords={getEnrollments} />
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button onClick={toggleModal} className="btn btn-success text-white">
                  Add Enrollment
                </button>
              </div>
              {showModal && (
                <AddEnrollmentModal
                  form={form}
                  setForm={setForm}
                  onSubmit={addEnrollment}
                  toggleModal={toggleModal}
                  errorMsg={errorMessage}
                />
              )}
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Enrollments
