import Alert from "../Alert";
import Modal from "../Modal";
import FormField from "../FormField";

const EditStudentModal = ({ form, setForm, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <Modal
        title={"Edit Student"}
        toggleModal={toggleModal}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.studentId);
          }}
        >
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

export default EditStudentModal