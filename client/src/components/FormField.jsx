import React from 'react'

const FormField = ({ title, value, type, onChange}) => {
  return (
    <>
      <div style={{ marginBottom: "10px", marginTop: "15px" }}>
        <label style={{ color: "black" }}>
          {title}: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="bg-white input input-bordered w-full text-black"
          style={{ borderColor: "rgb(204, 204, 204)" }}
        />
      </div>
    </>
  )
}

export default FormField