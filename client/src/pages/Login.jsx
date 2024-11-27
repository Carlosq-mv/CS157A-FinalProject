import Axios from '../constants/api'
import { useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import Alert from "../components/Alert"

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
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
        setErrorMessage(err.response.data)
      })
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-base-100 w-full sm:w-2/5 shadow-xl rounded-lg" style={{ backgroundColor: '#2C3539' }}>
          <div className="pt-2 flex justify-center">
            <h2 className=" text-white text-3xl font-bold font-abril py-2 px-4">
              Student Center
            </h2>
          </div>
          <figure className="px-8 pt-8">
            <img
              src="/images/work-time.png"
              alt="work-time"
              className="h-96 w-auto rounded-2xl object-contain"
            />
          </figure>

          <div className="p-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                <span className="font-semibold text-blue-600">Securely log in</span> to streamline student data, manage courses, and oversee academic progress.
                <br />
                Take control of essential operations with <span className="font-semibold text-blue-600">ease and efficiency</span>.
              </p>
            </div>

            <form className="pt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold text-white">Admin ID</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter Admin ID"
                  value={form.adminId}
                  onChange={(e) => setForm({ ...form, adminId: e.target.value })}
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold text-white">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>
              {errorMessage && (<Alert message={errorMessage} />)}
              <div className="pt-6 text-center">
                <button type="submit" className="btn btn-success text-lg w-[calc(100%-350px)]">
                  Login<FaArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login