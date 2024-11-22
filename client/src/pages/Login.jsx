import Axios from '../constants/api'
import { useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";

const Login = () => {
  // state to manage form inputs
  const [form, setForm] = useState({
    adminId: "",
    password: ""
  })

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // change adminId to type Number
    const payload = {
      ...form,
      adminId: Number(form.adminId),
    };

    // send post request to backend api
    Axios.post("/api/auth/login", payload)
      .then(res => {
        console.log(res)
        // clear form upon successfull submission
        setForm({
          adminId: "",
          password: ""
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-base-100 w-full sm:w-2/5 shadow-xl " style={{ backgroundColor: '#606060' }}>
          <figure className="px-8 pt-8">
            <img
              src="/images/college.jpg"
              alt="College"
              className="rounded-2xl"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl pb-10 font-abril">Student Center</h2>
            <form onSubmit={handleSubmit}>
              <label className="form-control w-full max-w-xs pb-6">
                <div className="label">
                  <span className="label-text font-black">AdminID</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-96"
                  placeholder="Enter Admin ID"
                  value={form.adminId}
                  onChange={(e) => setForm({ ...form, adminId: e.target.value })}
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-black">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-96 "
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <div className="pt-10">
                <button type="submit" className="btn btn-success text-lg">Login <FaArrowRight /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login