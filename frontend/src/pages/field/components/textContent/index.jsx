import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

function TextContent({data}) {
  return (
    <Link to="/text/2" className="fieldTextContent">
    <div className="fieldTextContentHeader">
      <span>Text</span>
      <span>|</span>
      <span>16 mins ago</span>
    </div>
    <img src={data.banner} alt="banner" draggable="false" />
    <div className="fieldTextContentTitle">
      Lorem ipsum dolor sit amet.
    </div>
    <div className="fieldTextContentShortText">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae hic vero voluptate?
    </div>
  </Link>
  )
}

export default TextContent