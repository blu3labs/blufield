import React from 'react'
import { Helmet } from 'react-helmet'
import "./index.css"

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Blufield</title>
      </Helmet>

      <div className='homeWrapper'>
        Home Page
      </div>
    </>
  )
}

export default Home