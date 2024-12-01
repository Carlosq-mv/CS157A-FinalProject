import { useState } from "react"
import Axios from "../constants/api"
import Table from "../components/Table"
import { FaRegEdit } from "react-icons/fa";
import { PiBooks } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import EditGradeModal from "../components/modals/EditGradeModal";

// courseName: ""
// courseSection: ""
// enrollmentDate: ""
// enrollmentId: ""
// grade: ""
// gradeId: ""
// gradingDate: ""
// studentId: ""
// studentName: ""

const Grades = () => {
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState()
  const [editModal, setEditModal] = useState(false)
  const [form, setForm] = useState({
    grade: "",
    gradeId: "",
    enrollmentId: "",
    gradingDate: ""
  })
  const [selectedDetails, setSelectedDetails] = useState(null)


  const searchStudent = () => {
    if (!email) {
      return;
    }

    Axios.get(`/api/grade/get-details?studentEmail=${email}`)
      .then((res) => {
        setDetails(res.data)
        console.log("Student data:", res.data);

      })
      .catch((err) => {
        console.error("Error fetching student:", err)
      })
  }

  const changeGrade = (id) => {
    Axios.put(`/api/grade/update-grade/${id}`, form)
      .then(res => {
        console.log(res.data)
        searchStudent()
        setEditModal(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleEditCourse = (c) => {
    setSelectedDetails(c)
    setForm({
      grade: c.grade,
      gradeId: c.gradeId,
      enrollmentId: c.enrollmentId,
      gradingDate: c.gradingDate
    })
    setEditModal(true)
  }

  const toggleModal = () => {
    setEditModal(!editModal)
  }
  return (
    <>
      <div className="p-7 w-screen flex flex-col items-center">
        <div className="bg-white card card-compact w-full max-w-7xl shadow-xl">
          <div className="card-body">
            <div className="bg-blue-100 p-5 rounded-lg shadow-md mb-6 flex-col text-center">
              <h1 className="text-3xl font-abril text-blue-800 pb-4">Student Grade Management</h1>
              <p className="text-lg text-gray-700 mt-2">
                Easily search for a student by email, review their enrolled courses, and update their grades.
                Keep academic records accurate and up-to-date with our intuitive grade management system.
              </p>
            </div>
            <figure>
              <img
                src="/images/grade.png"
                alt="Grade"
                className="h-72 w-auto object-contain "
              />
            </figure>

            <div className="sticky top-0  py-4 flex justify-center items-center space-x-2 pb-6">
              <input
                type="text"
                className="p-2 bg-white rounded border text-black border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 w-full max-w-md"
                placeholder="Search Student Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchStudent();
                  }
                }}
              />
              <button
                onClick={searchStudent}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            </div>


            {/* Details Table */}
            {details && (
              <div className="mt-6">
                <Table
                  title={`${details[0].studentName}'s Courses & Grades`}
                  icon={<PiBooks className="h-6 w-6 shrink-0 stroke-current" />}
                >
                  <table className="table-auto w-full text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-b">Student Name</th>
                        <th className="px-4 py-2 border-b">Student ID</th>
                        <th className="px-4 py-2 border-b">Course</th>
                        <th className="px-4 py-2 border-b">Section</th>
                        <th className="px-4 py-2 border-b">Credits</th>
                        <th className="px-4 py-2 border-b">Enrollment Date</th>
                        <th className="px-4 py-2 border-b">Grade</th>
                        <th className="px-4 py-2 border-b">Last Grading Date</th>
                        <th className="px-4 py-2 border-b">Update Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((d, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b text-center">{d.studentName}</td>
                          <td className="px-4 py-2 border-b text-center">{d.studentId}</td>
                          <td className="px-4 py-2 border-b text-center">{d.courseName}</td>
                          <td className="px-4 py-2 border-b text-center">{d.courseSection}</td>
                          <td className="px-4 py-2 border-b text-center">{d.courseCredits}.00</td>
                          <td className="px-4 py-2 border-b text-center">{d.enrollmentDate}</td>
                          <td className="px-4 py-2 border-b text-center">{d.grade}</td>
                          <td className="px-4 py-2 border-b text-center">{d.gradingDate === "1970-01-01" ? "Not Graded Yet" : d.gradingDate}</td>
                          <td className="px-4 py-2 border-b text-center">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleEditCourse(d)}
                            >
                              <FaRegEdit size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {editModal && (
                    <EditGradeModal
                      form={form}
                      setForm={setForm}
                      selectedDetails={selectedDetails}
                      toggleModal={toggleModal}
                      onSubmit={changeGrade}

                    />
                  )}
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default Grades