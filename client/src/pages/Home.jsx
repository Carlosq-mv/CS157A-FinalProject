import React, { useEffect, useState } from 'react'

import { FaCircleUser } from "react-icons/fa6";
import { PiBookOpenTextLight } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import Axios from "../constants/api"

const Home = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getStats = () => {
    setLoading(true)
    Axios.get("/api/home/details")
      .then(res => {
        console.log(res)
        setData(res.data)
      })

      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getStats()
  }, [])
  return (
    <>
      <div className="p-7 w-screen items-center flex-col flex">
        <div className="bg-white card card-compact w-full max-w-7xl shadow-xl">
          <div className="card-body">
            <div className="bg-blue-100 p-5 rounded-lg shadow-md">
              <h1 className="text-3xl font-abril  text-blue-800">Welcome to the Student Center Dashboard!</h1>
              <p className="text-lg text-gray-700 mt-2">
                Manage student enrollments, track grades, and oversee courses with ease.
                Empower your institution with streamlined administrative tools!
              </p>
            </div>
            <figure>
              <img
                src="/images/education.png"
                alt="Education"
                className="h-[34rem] w-auto object-contain "
              />
            </figure>
            {!loading ? (
              <div className="flex justify-around items-center h-full">
                <div className="flex flex-col items-center">
                  <span className="text-lg text-black font-black pb-6">Total Students</span>
                  <FaCircleUser className="text-8xl text-black pb-6" />
                  <span className="text-lg text-black font-black pb-6">{data?.students || 0}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg text-black font-black pb-6">Total Courses</span>
                  <PiBookOpenTextLight className="text-8xl text-black pb-6" />
                  <span className="text-lg text-black font-black pb-6">{data?.courses || 0}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg text-black font-black pb-6">Total Enrollments</span>
                  <IoStatsChart className="text-8xl text-black pb-6" />
                  <span className="text-lg text-black font-black pb-6">{data?.enrollments || 0}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-around items-center h-full">
                <span className="loading loading-lg loading-spinner text-secondary"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home