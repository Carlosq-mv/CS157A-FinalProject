import React from 'react'

import { FaCircleUser } from "react-icons/fa6";
import { PiBookOpenTextLight } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";

const Home = () => {
  return (
    <>
      <div className="p-7 w-screen flex">
        <div className="bg-white card card-compact w-full h-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-black">Student Center Stats:</h2>
            
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

      <div className="w-screen flex">
        <div className="card card-compact w-full">
          <figure>
            <img
              src="/images/library.jpg"
              alt="Library"
              className="h-96 w-auto rounded-xl shadow-xl"
            />
          </figure>

        </div>
      </div>

    </>
  )
}

export default Home