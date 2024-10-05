import React from 'react'
import Header from '../components/header'

import Story from '../components/story'
import '../styles/story.css' // Optional: CSS for additional styling

const story_page = () => {
  return (
    <div>
        <Header />
        <Story/>
       
    </div>
  )
}

export default story_page