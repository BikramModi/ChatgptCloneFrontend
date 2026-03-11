import React from 'react'
import SingleProductDescriptionCardList from '../components/landingComponents/SingleProductDescriptionCardList'
import ReviewPage from './ReviewPage'
import ReviewCreationPage from './ReviewCreationPage'

const SingleProductPage = () => {
  return (
    <div className='bg-indigo-300'>

        <SingleProductDescriptionCardList />
        <ReviewPage />
        <ReviewCreationPage />

    </div>
  )
}

export default SingleProductPage