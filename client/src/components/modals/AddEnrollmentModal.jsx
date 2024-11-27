import Modal from "../Modal"
import FormField from "../FormField"

const AddEnrollmentModal = ({ form, setForm, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <Modal title={"Add Enrollment"} toggleModal={toggleModal}>
        <form onSubmit={onSubmit}>
          <FormField
            type={"text"}
            title={"Student Name"}
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
          />
          <FormField
            type={"text"}
            title={"Course Name"}
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
          />
          <FormField
            type={"text"}
            title={"Course Section"}
            value={form.courseSection}
            onChange={(e) => setForm({ ...form, courseSection: e.target.value })}
          />
          <FormField
            type={"text"}
            title={"Course Credits"}
            value={form.courseCredits}
            onChange={(e) => setForm({ ...form, courseCredits: e.target.value })}
          />
          <FormField
            type={"date"}
            title={"Enrollment Date"}
            value={form.enrollmentDate}
            onChange={(e) => setForm({ ...form, enrollmentDate: e.target.value })}
          />

          {errorMsg && (<Alert message={errorMsg} />)}

          <div style={{ textAlign: "right" }}>
            <button type="submit" className="btn btn-success text-white m-5">
              Add Student
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
export default AddEnrollmentModal
