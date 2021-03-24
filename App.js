import React from "react";
import { connect } from "react-redux";
import {
  appKeyDown,
  snakeMove,
  largeSnake,
  initialAppState,
  snakeCrashed
} from "./action/appKeyDown/appKeyDown";
import { getFoodCoordinates } from "./action/food/food";

import "./App.scss";
import Snake from "./components/snake/snake";
import Food from "./components/food/food";

const initialState = {
  speed: 300
};

class App extends React.Component {
  state = initialState;

  componentDidMount() {
    this.moveInterval = setTimeout(
      () => this.speedInterval(),
      this.speedInterval
    );
    document.onkeydown = this.onKeyDown;
  }

  speedInterval() {
    setInterval(this.moveSnake, this.state.speed);
  }

  componentDidUpdate(prevProps, prevState) {
    const { snakeCrashed } = this.props;
    snakeCrashed();
    this.checkIfEat();
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval);
  }

  onKeyDown = e => {
    const { appKeyDown } = this.props;
    appKeyDown(e.keyCode);
  };

  moveSnake = () => {
    const { snakeMove } = this.props;
    snakeMove();
  };

  checkIfEat() {
    const {
      getFoodCoordinates,
      foodCoordinates,
      snakeDirection,
      largeSnake
    } = this.props;
    let head = snakeDirection.snakeDots[snakeDirection.snakeDots.length - 1];
    let food = foodCoordinates.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      getFoodCoordinates();
      largeSnake();
    }
  }

  render() {
    const { foodCoordinates, snakeDirection } = this.props;
    return (
      <div className="App">
        <div className="game-field">
          <Snake snakeDots={snakeDirection.snakeDots} />
          <Food dot={foodCoordinates.food} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    snakeDirection: state.snakeDirection,
    foodCoordinates: state.foodCoordinates
  };
};

const mapDispatchToProps = {
  appKeyDown,
  snakeMove,
  largeSnake,
  initialAppState,
  getFoodCoordinates,
  snakeCrashed
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
