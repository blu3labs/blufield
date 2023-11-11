import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import "./index.css"
import SubscriptionModal from '../../components/modals/subscription'
import DonateModal from '../../components/modals/donate'

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Blufield</title>
      </Helmet>

      <div className='homeWrapper'>
      
        <span>
          Hello
        </span>


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

        <SubscriptionModal />

        <DonateModal />
      </div>
    </>
  )
}

export default Home