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

  };

  const endGame = () => {

  };

  const moveSnake = () => {

  };

  const newApple = () => {

  };

  const getApple = () => {

  };

  const getBad = () => {

  };

  const gameLoop = () => {

  };

  useEffect(() => {

  }, [snake, apple, gameOver]);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{border: "1px solid grey"}}
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
