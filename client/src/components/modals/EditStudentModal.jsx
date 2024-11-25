import { RxCross2 } from "react-icons/rx"
import Alert from "../Alert";

const EditStudentModal = ({ form, onChange, onSubmit, onCancel, errorMsg }) => {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>
          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
            <h3 className="font-abril text-black text-lg">Edit Student</h3>
            <button onClick={onCancel} className="btn btn-ghost text-black btn-circle text-lg"><RxCross2 /></button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.studentId);
            }}
          >
            <div className="pb-5 pt-5 flex flex-col">
              <label className="text-black">
                Name: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div className="pb-5 flex flex-col">
              <label className="text-black">
                Date of Birth: <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                value={form.dateOfBirth}
                onChange={(e) => onChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="pb-5 flex flex-col">
              <label className="text-black">
                Email: <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                className="bg-white input input-bordered w-full  text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            <div className="pb-5 flex flex-col">
              <label className="text-black">
                Phone: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                value={form.phoneNum}
                onChange={(e) => onChange("phoneNum", e.target.value)}
              />
            </div>
            {errorMsg && (<Alert message={errorMsg} />)}
            <div className="modal-action gap-44 items-center flex justify-center">
              <button type="submit" className="btn btn-success text-white">
                Save
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={onCancel}
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

export default EditStudentModal