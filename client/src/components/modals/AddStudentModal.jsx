import { RxCross2 } from "react-icons/rx"
import Alert from "../Alert"

const AddStudentModal = ({ form, onChange, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>

          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
            <h3 className="font-abril text-black text-lg">Add New Student</h3>
            <button onClick={toggleModal} className="btn btn-ghost text-black btn-circle text-lg">
              <RxCross2 />
            </button>
          </div>

          {/* Form for Adding Students */}
          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: "10px", marginTop: "15px" }}> <label style={{ color: "black" }}>
                StudentID: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={form.studentId}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                onChange={(e) => onChange("studentId", e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={form.name}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Date Of Birth: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                value={form.dateOfBirth}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                onChange={(e) => onChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Email: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                value={form.email}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "black" }}>
                Phone: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={form.phoneNum}
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                onChange={(e) => onChange("phoneNum", e.target.value)}
              />
            </div>
            {errorMsg && (<Alert message={errorMsg} />)}
            <div style={{ textAlign: "right" }}>
              <button
                type="submit"
                className="btn btn-success text-white m-5"
              >
                Add Student
              </button>
              <button
                type="button"
                className="btn btn-error "
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddStudentModal