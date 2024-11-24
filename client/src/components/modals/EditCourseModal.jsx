import { RxCross2 } from "react-icons/rx"

const EditCourseModal = ({ form, onChange, onSubmit, onCancel }) => {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>
          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
            <h3 className="font-abril text-black text-lg">Edit Course</h3>
            <button onClick={onCancel} className="btn btn-ghost text-black btn-circle text-lg"><RxCross2 /></button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.courseId);
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
                value={form.courseName}
                onChange={(e) => onChange("courseName", e.target.value)}
              />
            </div>
            <div className="pb-5 flex flex-col">
              <label className="text-black">
                Section: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="bg-white input input-bordered w-full text-black"
                style={{ borderColor: "rgb(204, 204, 204)" }}
                value={form.section}
                onChange={(e) => onChange("section", e.target.value)}
              />
            </div>
            <div className="pb-5 flex flex-col">
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

export default EditCourseModal