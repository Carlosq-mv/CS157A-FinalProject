import { useState } from "react"
import CoursesTable from "../components/CoursesTable"
import { RxCross2 } from "react-icons/rx"
import Axios from "../constants/api"
import { PiBookOpenTextBold } from "react-icons/pi"

const Courses = () => {
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [courses, setCourses] = useState([])
  const [courseForm, setCourseForm] = useState({
    name: "",
    section: "",
    credits: ""
  })

  const addCourse = (e) => {
    e.preventDefault();

    Axios.post("", courseForm)
      .then(res => {
        console.log(res)

        // clear form
        setCourseForm({
          name: "",
          section: "",
          credits: ""
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const toggleModal = () => {
  //   setShowModal(!showModal)
  // }
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  const toggleModal = (modalType) => {
    if (modalType === "showModal") {
      setShowModal(!showModal);
    } else if (modalType === "deleteModal") {
      setDeleteModal(!deleteModal);
    }
  };

  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>

        <div role="alert" className="alert alert-info rounded-md">
          <PiBookOpenTextBold className="h-6 w-6 shrink-0 stroke-current" />
          <span className="font-abril text-xl">Courses</span>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px 5px 5px 5px" }}>

          <div style={{ maxHeight: "620px", overflowY: "auto", border: "1px solid #ddd" }}>
            <CoursesTable courses={courses} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
            <button onClick={() => toggleModal("deleteModal")} className="btn btn-error">Delete Course</button>
            <button onClick={() => toggleModal("showModal")} className="btn btn-success text-white">Add Course</button>
          </div>

          {showModal && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>
                {/* Modal Header */}
                <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
                  <h3 className="font-abril text-black text-lg">Add New Course</h3>
                  <button onClick={() => toggleModal("showModal")} className="btn btn-ghost text-black btn-circle text-lg">
                    <RxCross2 />
                  </button>
                </div>

                <form onSubmit={addCourse}>
                  <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                    <label style={{ color: "black" }}>
                      Name: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={courseForm.name}
                      onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                      style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ color: "black" }}>
                      Section: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={courseForm.section}
                      onChange={(e) => setCourseForm({ ...courseForm, section: e.target.value })}
                      style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ color: "black" }}>
                      Credits: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={courseForm.credits}
                      onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
                      style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                    >
                      <option value="" disabled>
                        Select Credits
                      </option>
                      <option value="1.0">1.0</option>
                      <option value="2.0">2.0</option>
                      <option value="3.0">3.0</option>
                      <option value="4.0">4.0</option>
                    </select>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-success text-white m-5">
                      Add Course
                    </button>
                    <button type="button" className="btn btn-error " onClick={() => toggleModal("showModal")}>
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}
          {deleteModal && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>
                {/* Modal Header */}
                <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
                  <h3 className="font-abril text-black text-lg">Delete Course</h3>
                  <button onClick={() => toggleModal("deleteModal")} className="btn btn-ghost text-black btn-circle text-lg">
                    <RxCross2 />
                  </button>
                </div>

                <form onSubmit={addCourse}>
                  <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                    <label style={{ color: "black" }}>
                      Name: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={courseForm.name}
                      onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                      style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ color: "black" }}>
                      Section: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={courseForm.section}
                      onChange={(e) => setCourseForm({ ...courseForm, section: e.target.value })}
                      style={{ width: "100%", padding: "5px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "3px", backgroundColor: "white", color: "black" }}
                    />
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-error m-5">
                      Delete
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => toggleModal("deleteModal")}>
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}


        </div>
      </div>
    </>
  )
}

export default Courses