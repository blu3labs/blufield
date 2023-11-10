import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import "./index.css"

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Blufield</title>
      </Helmet>

      <div className='homeWrapper'>
      



        <Link to='/create/field'>
          Create Field
        </Link>

        <Link to='/edit/field'>
          Edit Field
        </Link>

        <Link to="/create/text">
          Create Text
        </Link>

        <Link to="/create/video">
          Create Video
        </Link>

        <Link to="/create/audio">
          Create Audio
        </Link>

      </div>
    </>
  )
}

export default Home