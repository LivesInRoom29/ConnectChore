import React, { Component } from "react";
import { connect } from "react-redux";
import { dropTile } from "../../actions/gameActions";
import { checkVertical, checkAll } from "../../utils/gameHelper";
import "./game.css";

class GridCell extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      player1: {
        color: "red"
      },
      player2: {
        color: "yellow"
      },
      currentPlayer: {
        color: ""
      },
      householdMembers: [],
      board: [],
      gameOver: false,
      winner: null,
      message: ''
    };
    
  }

      
  handleClick() {
    console.log(`clicked on columns ${this.props.x}`);
    
    this.props.sendTileDrop(this.props.x, this.props.y);


     // Check status of board
    let board = this.props.board;


     

     let result = checkAll(board);
     if (result === this.state.player1) {
       this.setState({ board, gameOver: true, message: 'Player 1 (red) wins!' });
     } else if (result === this.state.player2) {
       this.setState({ board, gameOver: true, message: 'Player 2 (yellow) wins!' });
     } else {
     this.setState({ message: 'Game over. Please start a new game.' });
     }
 


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
        style={{ backgroundColor: this.props.color }}
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
    sendTileDrop: (col, row, color) => dispatch(dropTile(col, row. color)),
  };
};

export default connect(stateToProps, dispatchToProps)(GridCell);
 