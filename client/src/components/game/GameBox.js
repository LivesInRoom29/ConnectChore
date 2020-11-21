// Need for React and Redux
import React, { Component } from "react";
import GridCell from "./GridCell";


class GameBox extends Component {
  render() {
    const cells = [];
    for (let y = 0; y < 6; y++) {
      const row = [];
      for (let x = 0; x < 7; x++) {
        const key = `${x}${y}`;
        cells.push(<GridCell x={x} y={y} key={key} />)
      }

      cells.push(<div className="row">{row}</div>)
    }
    return (
      <div>
        {cells}
      </div>
      
    );
  }
};


export default GameBox;
