import React, { useState, useRef, useEffect } from 'react';
import { useInterval } from './useInterval';
import CONSTS from './constants';

const App = () => {
  const {
    CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS
  } = CONSTS;

  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) => ( // только стрелки
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  );

  const newApple = () => (
    apple.map((_, i) => Math.floor((Math.random() * CANVAS_SIZE[i]) / SCALE))
  );

  // скушали яблоко?
  const isApple = (piece) => (piece[0] === apple[0] && piece[1] === apple[1]);

  // врезались в границу?
  const isBorder = (piece) => (
    piece[0] * SCALE >= CANVAS_SIZE[0]
      || piece[1] * SCALE >= CANVAS_SIZE[1]
      || piece[0] < 0 || piece[1] < 0
  );

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = 'pink';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'blue';
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver, SCALE, CANVAS_SIZE]);

  // шаг игры
  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    if (isBorder(newSnakeHead)) endGame();
    if (isApple(newSnakeHead)) {
      setApple(newApple());
    } else {
      snakeCopy.pop(); // удалить хвост
    }
    snakeCopy.unshift(newSnakeHead); // добавить голову
    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: '1px solid grey' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && (<div>GameOver!</div>)}
      <button onClick={startGame} type="button">
        Start Game
      </button>
    </div>
  );
};

export default App;
