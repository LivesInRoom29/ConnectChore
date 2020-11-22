import { connect } from "react-redux";
import React, { Component } from "react";
// API calls
import API from "../../utils/API";
import { Container } from "react-bootstrap";
import GridCell from "./GridCell";
import Form from 'react-bootstrap/Form';
import { dropTile } from "../../actions/gameActions";
import "./game.css";

class GameBox extends Component {
  constructor (props){
    super(props);
    this.state={
      player1: 'red',
      player2: 'blue',
      currentPlayer: 'player1',
      householdMembers: []
    }
  };

  // setPlayerColor() {
  //   return this.props.user.{}
  // };


  createCells() {
    return this.props.game.box.map((row, rowNum) => (
      // <Container className="game-container">
      <div className="game-row" key={rowNum}>
        {row.map((cell, cellNum) => (
          <GridCell color={cell.color} x={cellNum} y={rowNum} key={`${cellNum}${rowNum}`} />
        ))}
      </div>
      // </Container>
      
    ));
  }

  componentDidMount() {

    const {user} = this.props.auth;
    
    var promisetwo = new Promise((resolve, reject) => {
      API.getHouseholdMembers(user.id)
          .then(res => resolve(res))
          .catch(err => reject(Error("API failed")));
  })

  promisetwo.then(result => {
      this.setState(
          {
              householdMembers: result.data
          }
      )
  });



    console.log(this.props);
  }
  render() {

    return (
      <div>
    <Form>
      <Form.Row>
        <Form.Group controlId="formHouseholdMember">
            <Form.Label>Pick someone:</Form.Label>
            <Form.Control
                as="select"
                name="player1"
                value={this.state.player1}
                // placeholder="Wash the dishes" 
                onChange={this.handleInputChange}
            >
                {/* Map the household members to the drop-down */}
                {
                    this.state.householdMembers.map(member => (
                        <option
                            key={member._id}
                            value={member._id}
                        >
                            {member.name}
                        </option>
                    ))
                }
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="formHouseholdMember">
            <Form.Label>Pick someone:</Form.Label>
            <Form.Control
                as="select"
                name="player2"
                value={this.state.player2}
                // placeholder="Wash the dishes" 
                onChange={this.handleInputChange}
            >
                {/* Map the household members to the drop-down */}
                {
                    this.state.householdMembers.map(member => (
                        <option
                            key={member._id}
                            value={member._id}
                        >
                            {member.name}
                        </option>
                    ))
                }
            </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>

    <div>{this.createCells()}</div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { dropTile })(GameBox);
