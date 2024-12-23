import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Food from './Food';

const GameBoard = () => {
  // إعدادات اللعبة
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  
  // لتحديد حجم اللوحة بناءً على حجم الشاشة
  const boardSize = 20;
  const cellSize = 20;
  const width = Math.floor(window.innerWidth / cellSize);
  const height = Math.floor(window.innerHeight / cellSize);

  // تحريك التعبان
  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    newSnake.unshift(head);
    // إزالة آخر جزء من الجسم بعد التحرك (الحركة مع إزالة الجزء الأخير)
    if (head.x !== food.x || head.y !== food.y) {
      newSnake.pop(); // فقط إذا لم يأكل الطعام
    }
    setSnake(newSnake);
  };

  // فحص التصادم
  const checkCollision = () => {
    let head = snake[0];
    // التصادم مع الجدران
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      setGameOver(true);
    }
    // التصادم مع نفسه
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
      }
    }
  };

  // فحص الطعام
  const checkFood = () => {
    let head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      // إعادة تعيين الطعام في مكان عشوائي بعد أكله
      setFood({ x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) });
      // إضافة جزء جديد إلى التعبان
      setSnake([...snake, snake[snake.length - 1]]);
    }
  };

  // تحريك اللعبة
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveSnake();
      checkCollision();
      checkFood();
    }, 100);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  // التعامل مع ضغط المفاتيح
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
  };

  // الاستماع لمفاتيح لوحة المفاتيح
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  return (
    <div className={`relative bg-gray-900 rounded-md`} style={{ width: `${width * cellSize}px`, height: `${height * cellSize}px` }}>
      <Snake snake={snake} cellSize={cellSize} />
      <Food food={food} cellSize={cellSize} />
      {gameOver && <div className="absolute inset-0 flex justify-center items-center text-white text-xl">Game Over!</div>}
    </div>
  );
};

export default GameBoard;
