import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFoodCoordinates } from "../../action/appKeyDown/appKeyDown";

import "./food.scss";

function Food(props) {
  const { snakeDirection } = props;

  const [food, setFood] = useState({
    left: `${snakeDirection.food[0]}%`,
    top: `${snakeDirection.food[1]}%`
  });

  useEffect(() => {
      const style = {
        left: `${snakeDirection.food[0]}%`,
        top: `${snakeDirection.food[1]}%`
      }
      setFood(style);

  }, [snakeDirection.food])

  return <div className="snake-food" style={food}></div>;
}

const mapDispatchToProps = {
  getFoodCoordinates
};

const mapStateToProps = state => {
  return {
    snakeDirection: state.snakeDirection
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
