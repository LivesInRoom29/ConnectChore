import { connect } from "react-redux";
import React, { Component } from "react";
import GridCell from "./GridCell";
import { dropTile } from "../../actions/gameActions";
import "./game.css";

class GameBox extends Component {
  constructor (props){
    super(props);
    this.state={
      player1Color: 'red',
      player2Color: 'blue',
      currentPlayer: 'player1'
    }
  };

  // setPlayerColor() {
  //   return this.props.user.{}
  // };


  createCells() {
    return this.props.game.box.map((row, rowNum) => (
      <div className="row" key={rowNum}>
        {row.map((cell, cellNum) => (
          <GridCell color={cell.color} x={cellNum} y={rowNum} key={`${cellNum}${rowNum}`} />
        ))}
      </div>
    ));
  }

  componentDidMount() {

    console.log(this.props);
  }
  render() {    
    return <div>{this.createCells()}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { dropTile })(GameBox);
