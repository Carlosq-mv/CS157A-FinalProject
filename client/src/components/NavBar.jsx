import React from 'react'

// TODO: add all links when pages are complete
const NavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100" style={{ backgroundColor: '#606060' }}>
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
              <li><a>Students</a></li>
              <li><a>Courses</a></li>
              <li><a>Enrollments</a></li>
              <li><a>Grades</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl font-abril">Student Center</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-10 font-black text-sm">
              {/*TODO: add links*/}
              <li><a>Students</a></li>
              <li><a>Courses</a></li>
              <li><a>Enrollments</a></li>
              <li><a>Grades</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <a className="btn bg-red-700 font-black hover:bg-red-800">Logout</a>
        </div>
      </div>
    </>


  )
}

export default NavBar