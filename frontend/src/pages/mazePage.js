import React from 'react';
import Maze from '../components/maze';

const MazePage = () => {
  return (
    <div>
      <h1>Bible Maze Game</h1>
      <p>Help the player reach the goal! Use arrow keys to move.</p>
      <Maze />
    </div>
  );
};

export default MazePage;
