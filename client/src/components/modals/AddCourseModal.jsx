import Alert from "../Alert"
import Modal from "../Modal"
import FormField from "../FormField"

const AddCourseModal = ({ toggleModal, setForm, onSubmit, form, errorMsg }) => {
  return (
    <>
      <Modal
        title={"Add New Course"}
        toggleModal={toggleModal}
      >
        <form onSubmit={onSubmit}>
          <FormField
            title={"Name"}
            type={"text"}
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
          />
          <FormField
            title={"Section"}
            type={"text"}
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
          />
          
          <div style={{ marginBottom: "10px" }}>
            <label style={{ color: "black" }}>
              Credits: <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={form.credits}
              onChange={(e) => setForm({ ...form, credits: e.target.value})}
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

          {errorMsg && (<Alert message={errorMsg} />)}

          <div style={{ textAlign: "right" }}>
            <button type="submit" className="btn btn-success text-white m-5">
              Add Course
            </button>
            <button type="button" className="btn btn-error " onClick={toggleModal}>
              Cancel
            </button>
          </div>

        </form>
      </Modal>
    </>
  )
}

export default AddCourseModal