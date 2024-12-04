import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Axios from '../constants/api'
import Table from '../components/Table'

const Course = () => {
  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState(null)
  const [students, setStudents] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCourseDetails = async () => {
    try {
      const res = await Axios.get(`/api/course/get-course/${courseId}`)
      console.log(res.data)
      setCourseDetails(res.data)
      setStudents(res.data.students)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  // const getCourseDetails = () => {
  //   setLoading(true)
  //   Axios.get(`/api/course/get-course/${courseId}`)
  //     .then(res => {
  //       console.log(res)
  //       setCourseDetails(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }


  useEffect(() => {
    getCourseDetails()
  }, [courseId])

  return (
    <>
      {loading ? (
        <div className="p-7 w-screen items-center flex-col flex">
          <p className="text-xl text-white font-semibold">Loading course details...</p>
          <div className="loading loading-dots loading-lg"></div>
        </div>
      ) : (

        <div className="p-7 w-screen items-center flex-col flex">
          <div className="bg-white card card-compact w-full max-w-7xl shadow-xl">
            <div className="card-body">
              <div className="bg-blue-100 p-5 rounded-lg shadow-md">
                <h1 className="text-3xl font-abril  text-blue-800">{courseDetails?.courseName} Section: {courseDetails?.section}</h1>
                <p className="text-lg text-gray-700 mt-2">
                  Explore detailed information about your selected course.
                  Stay updated with essential course details at a glance.
                </p>
              </div>

              <div className="mt-5 bg-gray-50 p-5 rounded-lg shadow-md w-full">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-abril font-semibold text-gray-800">Course Details</h2>
                    <p className="text-lg text-gray-600 mt-4">
                      Name: <span className="font-medium">{courseDetails?.courseName}</span>
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                      Section: <span className="font-medium">{courseDetails?.section}</span>
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                      Credits: <span className="font-medium">{courseDetails?.credits}</span>
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-abril font-semibold text-gray-800">Enrollment Detail</h2>
                    <p className="text-lg text-gray-600 mt-4">
                      Total Students Enrolled: <span className="font-medium">{students?.length}</span>
                    </p>
                  </div>
                </div>
              </div>


              <Table
                title={"Students Enrolled"}
              >
                <table className="table-auto w-full text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border-b">Student Name</th>
                      <th className="px-4 py-2 border-b">Student ID</th>
                      <th className="px-4 py-2 border-b">Student Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students && students.length > 0 ? (
                      students.map((s, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b text-center">{s.name}</td>
                          <td className="px-4 py-2 border-b text-center">{s.studentId}</td>
                          <td className="px-4 py-2 border-b text-center">{s.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>
                          No enrollments
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Course