import React from 'react'
import { useParams } from 'react-router-dom'

export const ErrorPage = () => {
  const { responseCode } = useParams();
  return (
    <div className="content">
      <h1>Something went wrong!</h1>
      {responseCode === "2" &&
        <h1>User was not found.</h1>
      }
      {responseCode === "3" &&
        <h1>User is over 10 years old.</h1>
      }
      {responseCode === "4" &&
        <h1>Was not able to create user.</h1>
      }
    </div>
  )
}
