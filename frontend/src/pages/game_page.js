import React from 'react'
import Header from '../components/header'
import GameCards from '../components/games'
import Footer from '../components/footer'


const game_page = () => {
  return (
    <div>
        <Header />
        <GameCards />
        <Footer />
    </div>
  )
}

export default game_page