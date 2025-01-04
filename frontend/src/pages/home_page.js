import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import biblePicture from '../images/bible.jpg'
import MemoryVerse from '../components/memory_verse'
import { Image } from 'react-bootstrap'

const home_page = () => {
  return (
    <div>
        <Header />
        <MemoryVerse/>
        <div className="text-center" >
          <Image className='rounded' src={biblePicture} alt="Bible" fluid style={{height: "50vh", marginBottom:'13vh'}} />
        </div>
        
        <Footer />
    </div>
  )
}

export default home_page

