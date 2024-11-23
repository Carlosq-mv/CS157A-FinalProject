import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Students = () => {
  const [showModal, setShowModal] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "20px auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Content */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "0 0 5px 5px",
        }}
      >
        {/* Scrollable Table */}
        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "black", // Text color
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  StudentID
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Name
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Date Of Birth
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Email
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Phone
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Data Row */}
              <tr>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>1</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  John Doe
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  1990-01-01
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  john@example.com
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  123-456-7890
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#007bff",
                    }}
                    onClick={() => alert("Edit clicked")}
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#dc3545",
                    }}
                    onClick={() => alert("Delete clicked")}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
              {/* Empty Row */}
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#aaa",
                  }}
                >
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Add New Students Button */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            onClick={toggleModal}
            style={{
              padding: "10px 20px",
              backgroundColor: "#5cb85c",
              color: "black",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Add New Student
          </button>
        </div>
      </div>

      {/* Modal for Adding Students */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "400px",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "10px 10px 0 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
              }}
            >
              <h3 style={{ color: "black", margin: 0 }}>Add New Student</h3>
              <button
                onClick={toggleModal}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "18px",
                  color: "#333",
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                }}
              >
                ×
              </button>
            </div>

            {/* Form for Adding Students */}
            <form>
              <div style={{ marginBottom: "10px", marginTop: "15px" }}>
                <label style={{ color: "black" }}>
                  StudentID: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "5px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Name: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "5px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Date Of Birth: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "5px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Email: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  style={{
                    width: "100%",
                    padding: "5px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ color: "black" }}>
                  Phone: <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  style={{
                    width: "100%",
                    padding: "5px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </div>
              <div style={{ textAlign: "right" }}>
              <button
                  type="button"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#5cb85c",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    alert("Student added!");
                    toggleModal();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;

                 
