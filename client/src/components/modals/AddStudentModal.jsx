import FormField from "../FormField"
import Alert from "../Alert"
import Modal from "../Modal"

const AddStudentModal = ({ form, setForm, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <Modal
        title={"Add Student"}
        toggleModal={toggleModal}
      >
        {/* Form for Adding Students */}
        <form onSubmit={onSubmit}>
          <FormField
            title={"StudentID"}
            type={"text"}
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
          <FormField
            title={"Name"}
            type={"text"}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <FormField
            title={"Date Of Birth"}
            type={"date"}
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
          />
          <FormField
            title={"Email"}
            type={"email"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <FormField
            title={"Phone"}
            type={"text"}
            value={form.phoneNum}
            onChange={(e) => setForm({ ...form, phoneNum: e.target.value })}
          />
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
      </Modal>
    </>
  )
}

export default AddStudentModal