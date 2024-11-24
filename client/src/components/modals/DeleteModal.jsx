import React from 'react'
import { RxCross2 } from "react-icons/rx"
const DeleteModal = ({ toggleModal, title, message, onDelete }) => {

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ backgroundColor: "#fff", width: "400px", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", position: "relative" }}>
          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc" }}>
            <h3 className="font-abril text-black text-lg">{title}</h3>
            <button onClick={toggleModal} className="btn btn-ghost text-black btn-circle text-lg">
              <RxCross2 />
            </button>
          </div>
          <div style={{ marginBottom: "10px", marginTop: "15px" }}>
            <p className="text-black text-lg pt-5 pb-5">{message}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <button type="submit" className="btn btn-error m-5" onClick={onDelete}>
              Delete
            </button>
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default DeleteModal