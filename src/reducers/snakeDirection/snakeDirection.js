import {
  appKeyDown,
  snakeMove,
  largeSnake,
  snakeCrashed,
  getFoodCoordinates
} from "../../action/appKeyDown/appKeyDown";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 96;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
};

const initialSnake = {
  direction: "RIGHT",
  food: getRandomCoordinates(),
  snakeDots: [
    [0, 0],
    [4, 0]
  ]
};

const snakeDirection = (state = initialSnake, action) => {
  switch (action.type) {
    case appKeyDown.toString():
      switch (action.payload) {
        case 38:
          return {
            ...state,
            direction: state.direction !== "DOWN" ? "UP" : "DOWN"
          };
        case 40:
          return {
            ...state,
            direction: state.direction !== "UP" ? "DOWN" : "UP"
          };
        case 37:
          return {
            ...state,
            direction: state.direction !== "RIGHT" ? "LEFT" : "RIGHT"
          };
        case 39:
          return {
            ...state,
            direction: state.direction !== "LEFT" ? "RIGHT" : "LEFT"
          };
        default:
          return state;
      }
    case snakeMove.toString():
      let dots = [...state.snakeDots];
      let head = dots[dots.length - 1];
      switch (state.direction) {
        case "RIGHT":
          head = [head[0] + 4, head[1]];
          if (head[0] > 96) {
            head = [(head[0] = 0), head[1]];
          }
          break;
        case "LEFT":
          head = [head[0] - 4, head[1]];
          if (head[0] < 0) {
            head = [(head[0] = 96), head[1]];
          }
          break;
        case "DOWN":
          head = [head[0], head[1] + 4];
          if (head[1] > 96) {
            head = [head[0], (head[1] = 0)];
          }
          break;
        case "UP":
          head = [head[0], head[1] - 4];
          if (head[1] < 0) {
            head = [head[0], (head[1] = 96)];
          }
          break;
        default:
          return;
      }
      dots.push(head);
      dots.shift();
      return {
        ...state,
        snakeDots: dots
      };
    case largeSnake.toString():
      let newSnake = [...state.snakeDots];
      newSnake.unshift([]);
      return {
        ...state,
        snakeDots: newSnake
      };
    case getFoodCoordinates.toString():
      return {
        ...state,
        food: getRandomCoordinates()
      };
    case snakeCrashed.toString():
      let snake = [...state.snakeDots];
      let headSnake = snake[snake.length - 1];
      let stateSnake = state;
      snake.pop();
      snake.forEach(dot => {
        if (headSnake[0] === dot[0] && headSnake[1] === dot[1]) {
          alert(`Игра окончена, ты набрал ${state.snakeDots.length - 2} очков`);
          stateSnake = initialSnake;
        }
      });
      return stateSnake;
    default:
      return state;
  }
};


export default snakeDirection;
