import React from 'react';
import GameBoard from './GameBoard';
import './App.css';

const App = () => {
  return (
    <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
      <GameBoard />
    </div>
  );
};

export default App;
