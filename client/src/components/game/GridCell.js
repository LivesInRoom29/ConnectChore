import React, { Component } from "react";
import { connect } from "react-redux";
import { dropTile } from "../../actions/gameActions";
import "./game.css";

class GridCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: "",
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.sendTileDrop(this.props.x, this.props.y);
    this.props.handleClick();
  }


  render() {
    const board = this.props.board;
    const x = this.props.x;
    const y = this.props.y;
    let classes = "cell";

    if (board[x][y] !== undefined) {
      if (board[x][y] === "red") {
        classes += "p2";
      } else {
        classes += "p1";
      }
    }
    return (
      <div
        className={classes}
        style={{
          backgroundColor: this.props.color,
        }}
        onClick={this.clickHandler}
      ></div>
    );
  }
}

const stateToProps = (state) => {
  return {
    board: state.game.board,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    sendTileDrop: (col, row, color) => dispatch(dropTile(col, row.color)),
  };
};

export default connect(stateToProps, dispatchToProps)(GridCell);
