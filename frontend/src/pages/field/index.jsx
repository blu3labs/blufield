import React from 'react'
import "./index.css"
import { useParams } from 'react-router-dom'

function Field() {
  const { id } = useParams()


  return (
    <div>{id}</div>
  )
}

export default Field