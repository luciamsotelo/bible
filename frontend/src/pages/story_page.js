import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Story from '../components/story'
import '../styles/story.css' // Optional: CSS for additional styling

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