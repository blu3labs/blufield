import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

function TextContent({data}) {
  return (
    <Link to="/text/2" className="fieldTextContent">
   
    <img src={data.banner} alt="banner" draggable="false" />
    <div className="fieldTextContentTitle">
      Lorem ipsum dolor sit amet.
    </div>
    <div className="fieldTextContentShortText">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae hic vero voluptate?
    </div>
     <div className="fieldTextContentDate">
      11 November, 23:40 
    </div>
  </Link>
  )
}

export default TextContent