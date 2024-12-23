import React from 'react';

const Snake = ({ snake, cellSize }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            top: `${segment.y * cellSize}px`,
            left: `${segment.x * cellSize}px`,
          }}
        ></div>
      ))}
    </>
  );
};

export default Snake;
