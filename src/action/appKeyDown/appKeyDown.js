import { createAction } from "redux-actions";

export const appKeyDown = createAction("KEY_DOWN");
export const snakeMove = createAction("SNAKE_MOVE");
export const largeSnake = createAction("LARGE_SNAKE");
export const initialAppState = createAction("INITIAL_APP_STATE");
export const snakeCrashed = createAction("SNAKE_CRASHED");
export const getFoodCoordinates = createAction("GET_FOOD");
