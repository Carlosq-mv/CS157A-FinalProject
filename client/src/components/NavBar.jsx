import React, { useState, useEffect } from 'react'
import { GoHomeFill } from "react-icons/go";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

import Axios from '../constants/api';

const NavBar = () => {
  const nav = useNavigate()
  const { logout } = useContext(AuthContext)
  const [course, setCourse] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null)

  const goToCoursePage = (c) => {
    // redirect to course link
    nav(`/course/${c.courseId}`)
  }

  const handleSearch = () => {
    if (course.trim() === "") {
      setResults([])
      setShowDropdown(false)
      return
    }

    Axios.post(`/api/home/search?course=${course}`)
      .then(res => {
        setResults(res.data)
        setShowDropdown(true)
      })
      .catch(err => {
        console.log(err)
        setResults([])
        setShowDropdown(false)
      })
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="navbar bg-base-100" style={{ backgroundColor: '#2C3539' }}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {/*TODO: add links*/}
              <li><a href="/students">Students</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/enrollments">Enrollments</a></li>
              <li><a href="/grades">Grades</a></li>
            </ul>
          </div>
          <a href="/home" className="btn btn-ghost text-2xl font-abril"><GoHomeFill />Student Center</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-10 font-black text-lg">
              {/*TODO: add links*/}
              <li><a href="/students">Students</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/enrollments">Enrollments</a></li>
              <li><a href="/grades">Grades</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <div className="flex-none gap-4">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search Courses"
                className="input input-bordered w-24 md:w-auto"
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setShowDropdown(true)
                    handleSearch() // Trigger search on input change
                  } else {
                    setShowDropdown(false)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              {showDropdown && (
                <div className="relative">
                  <ul className="absolute rounded-lg z-[10] w-52 p-2 bg-white shadow-lg border border-gray-300">
                    {results.length > 0 ? (
                      results.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 rounded-lg hover:bg-gray-100 text-black cursor-pointer"
                          onClick={() => goToCoursePage(item)}
                        >
                          {item.courseName}: Section {item.section}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No results found</li>
                    )}
                    <li className="p-2 rounded-lg text-gray-600 text-xs italic cursor-default">
                      Press <span className="font-semibold">Esc</span> to close the dropdown
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button onClick={logout} className="btn bg-red-700 font-black hover:bg-red-800 ml-10">Logout</button>
        </div>
      </div>
    </>
  )
}

export default NavBar