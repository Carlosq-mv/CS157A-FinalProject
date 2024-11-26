import Alert from "../Alert"
import FormField from "../FormField"
import Modal from "../Modal"

const EditCourseModal = ({ form, setForm, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <Modal
        title={"Edit Course"}
        toggleModal={toggleModal}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.courseId);
          }}
        >
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
              onChange={(e) => setForm({ ...form, credits: e.target.value })}
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


          <div className="modal-action gap-44 items-center flex justify-center">
            <button type="submit" className="btn btn-success text-white">
              Save
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default EditCourseModal