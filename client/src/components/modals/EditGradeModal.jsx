import React from 'react'
import Modal from '../Modal'
import FormField from '../FormField'

const EditGradeModal = ({ selectedDetails, form, setForm, onSubmit, toggleModal, errorMsg }) => {
  return (
    <>
      <Modal
        title={"Change Grade"}
        toggleModal={toggleModal}
      >
        <div className="space-y-4 bg-gray-50 p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Student Name:</span>
            <span className="text-gray-800">{selectedDetails.studentName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Student ID:</span>
            <span className="text-gray-800">{selectedDetails.studentId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Course Name:</span>
            <span className="text-gray-800">{selectedDetails.courseName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Course Section:</span>
            <span className="text-gray-800">{selectedDetails.courseSection}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Course Credits:</span>
            <span className="text-gray-800">{selectedDetails.courseCredits}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Grading Date:</span>
            <span className="text-gray-800">{selectedDetails.gradingDate}</span>
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(selectedDetails.gradeId)
        }}
        >
          <FormField
            title={"Grade"}
            type={"text"}
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
          />

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

export default EditGradeModal