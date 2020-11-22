import React, { Component } from "react";

import GridCell from "./GridCell";

class GameBox extends Component {
    render () {
        const cells = [];

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                const key = `${x}${y}`;
                cells.push(<GridCell x={x} y={y} key={key}/>)
            }
        }

        return (
            <div>
                {cells}
            </div>
        )
    }
}

export default GameBox;

