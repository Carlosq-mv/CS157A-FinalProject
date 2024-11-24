import React from 'react'

const CoursesTable = ({ courses }) => {
  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Course</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Section</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Credits</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}></td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}></td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </>
  )
}

export default CoursesTable