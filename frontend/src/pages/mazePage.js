import React from 'react';
import Maze from '../components/maze';
import Header from '../components/header';

const MazePage = () => {
  return (
    <div>
      <Header />
      <h1>Bible Maze Game</h1>
      <p>Help the player reach the goal! Use arrow keys to move.</p>
      <Maze />
    </div>
  );
};

export default MazePage;
