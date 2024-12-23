import React from 'react';

const Food = ({ food, cellSize }) => {
  return (
    <div
      className="absolute bg-red-500"
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        top: `${food.y * cellSize}px`,
        left: `${food.x * cellSize}px`,
      }}
    ></div>
  );
};

export default Food;
