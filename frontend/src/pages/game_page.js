import React from 'react';
import Header from '../components/header';
import GameCards from '../components/games';

const game_page = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <GameCards />
      </div>
    </div>
  );
};

export default game_page;
