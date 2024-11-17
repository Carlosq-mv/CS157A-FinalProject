import React, { useEffect, useState } from 'react'
import Axios from '../constants/api'

// example component for reference
import ExampleComponent from '../components/ExampleComponent'

// example page for reference
const ExamplePage = () => {
  // state to store and set the message from the backend
  const [message, setMessage] = useState('')
  const [dbMessage, setDbMessage] = useState('')


  // function to fetch data form the backend using Axios instance (see constants/api)
  const getInfo = () => {
    Axios.get("/api/hello") // sending a GET request to /api/hello 
      .then(res =>  {
        setMessage(res.data) // storing the response in state
        console.log(res)  // logging the complete response message
      })
      .catch(err => {
        console.log(err)  // logging any error response
      })
  }

  const isDbConnected = () => {
    Axios.get("/api/db")
      .then(res => {
        console.log(res)
        setDbMessage(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // useEffect to trigger the getInfo function when the component mounts
  useEffect(() => {
    getInfo()
    isDbConnected()
  }, [])

  return (
    <>
      <h1 className="font-bold text-3xl text-blue-500">This is an example page.</h1>

     {/* Rendering the imported ExampleComponent */}
      <ExampleComponent />

      {/* Displaying the message fetched from the backend */}
      <p>{message}</p>
      <p>Is db connected: {dbMessage}</p>
    </>
  )
}

export default ExamplePage