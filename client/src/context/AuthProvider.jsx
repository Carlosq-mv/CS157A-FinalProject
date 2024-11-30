import { createContext, useState, useEffect } from 'react'
import Axios from '../constants/api'
import { useNavigate } from 'react-router-dom'
import { PiCaretCircleDoubleRightThin } from 'react-icons/pi'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const nav = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAdmin = async () => {
    try {
      const res = await Axios.get("/api/auth/current-user")
      const user = res.data

      if (user) {
        return user
      } else {
        throw Error
      }
    } catch (err) {
      console.log(err.response.data)
      return null
    } 
  }

  const logout = async () => {
    setLoading(true)
    try {
      const res = await Axios.post("/api/auth/logout")
      localStorage.removeItem("admin")
      console.log(res)

      setAdmin(null)
      setIsLoggedIn(false)
      nav("/login")

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchAdmin()
      .then(res => {
        setAdmin(res)
        setIsLoggedIn(true)
      })
      .catch(err => {
        setAdmin(null)
        setIsLoggedIn(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, admin, loading, setIsLoggedIn, setAdmin, setLoading, logout, fetchAdmin }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }