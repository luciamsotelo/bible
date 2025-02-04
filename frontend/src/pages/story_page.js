import React from 'react'
import Header from '../components/header'
import Story from '../components/story'
import '../styles/story.css' // Optional: CSS for additional styling
import Footer from '../components/footer'

const story_page = () => {
  return (
    <div>
        <Header />
        <Story/>
        <Footer />
    </div>
  )
}

export default story_page