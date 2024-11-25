import { RxCross2 } from "react-icons/rx"

const AddCourseModal = ({ toggleModal, onSubmit, form, onChange }) => {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>

          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
            <h3 className="font-abril text-black text-lg">Add New Course</h3>
            <button onClick={toggleModal} className="btn btn-ghost text-black btn-circle text-lg">
              <RxCross2 />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: "10px", marginTop: "15px" }}>
              <label style={{ color: "black" }}>
                Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={form.courseName}
                onChange={(e) => onChange("courseName", e.target.value)}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Section: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={form.section}
                onChange={(e) => onChange("section", e.target.value)}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Credits: <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={form.credits}
                onChange={(e) => onChange("credits", e.target.value)}
                className="select select-bordered w-full bg-white text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
              >
                <option value="" disabled>
                  Select Credits
                </option>
                <option value="1">1.0</option>
                <option value="2">2.0</option>
                <option value="3">3.0</option>
                <option value="4">4.0</option>
              </select>
            </div>

            <div style={{ textAlign: "right" }}>
              <button type="submit" className="btn btn-success text-white m-5">
                Add Course
              </button>
              <button type="button" className="btn btn-error " onClick={toggleModal}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddCourseModal