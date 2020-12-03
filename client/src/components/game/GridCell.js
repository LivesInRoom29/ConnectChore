import React, { Component } from "react";
import { connect } from "react-redux";
import { dropTile } from "../../actions/gameActions";
import { checkVertical, checkHorizontal, checkDiagonalLeft, checkDiagonalRight, checkAll } from "../../utils/gameHelper";
import "./game.css";

class GridCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: "",
      householdMembers: [],
      board: [],
      gameOver: false,
      message: "",
    };

    // this.playGame = this.playGame.bind(this);
  }


 
  


  handleClick() {
    console.log(`clicked on columns ${this.props.x}`);

    this.props.sendTileDrop(this.props.x, this.props.y);

  //   checkAll(board) {
  //   return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  // }
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
        onClick={() => this.handleClick()}
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
