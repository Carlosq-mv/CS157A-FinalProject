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
    </>
  )
}

export default Enrollments
