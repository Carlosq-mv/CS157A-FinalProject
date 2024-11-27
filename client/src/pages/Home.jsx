import React from 'react'

import { FaCircleUser } from "react-icons/fa6";
import { PiBookOpenTextLight } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";

const Home = () => {
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

            <div className="flex justify-around items-center h-full">

              <div className="flex flex-col items-center">
                <span className="text-lg text-black font-black pb-6">Total Students:</span>
                <FaCircleUser className="text-8xl text-black pb-6" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-black font-black pb-6">Total Courses:</span>
                <PiBookOpenTextLight className="text-8xl text-black pb-6" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-black font-black pb-6">Stats</span>
                <IoStatsChart className="text-8xl text-black pb-6" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <div className="w-screen flex">
        <div className="card card-compact w-full">
          <figure>
            <img
              src="/images/library.jpg"
              alt="Library"
              className="h-96 w-auto rounded-xl shadow-xl"
            />
          </figure>

        </div>
      </div> */}

    </>
  )
}

export default Home