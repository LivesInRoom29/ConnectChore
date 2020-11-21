import React, { Component } from "react";
import { connect } from "react-redux";
import { dropTile } from "../../actions/gameActions";
import "./game.css";


class GridCell extends Component {
  handleClick(){
    console.log(`clicked on columns ${this.props.x}`)

    this.props.sendTileDrop(this.props.x, this.props.y);

  }

    render() {
      const board = this.props.board;
      const x = this.props.x;
      const y = this.props.y;
      let classes = 'cell';

      if (board[x][y] !== undefined) {
        if (board[x][y] === 'red'){
          classes =+ 'p2';
        } else {
          classes =+ 'p1';
        }
      }
      return (
        <div className={classes} style= {{backgroundColor: this.props.color}} onClick={() => this.handleClick()}>
          
        </div>
      )
    }
};


const stateToProps = state => {
  return {
    board: state.game.board,
  };
};

const dispatchToProps = dispatch => {
  return {
    sendTileDrop: (col, row) => dispatch(dropTile(col, row))
    }
};


export default connect(stateToProps, dispatchToProps)(GridCell);



