import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className="content">
      <h1>404 Page Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  )
}
