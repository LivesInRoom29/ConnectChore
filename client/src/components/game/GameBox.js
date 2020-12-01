import React, { Component } from "react";
import { connect } from "react-redux";
// API calls
import API from "../../utils/API";
import { Button } from "react-bootstrap";
import GridCell from "./GridCell";

import Form from "react-bootstrap/Form";
import {  resetGame } from "../../actions/gameActions";
import {createDefaultBoard} from "../../utils/gameHelper";
import "./game.css";

class GameBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1_id: "",
      player2_id: {},
      currentPlayer: {},
      householdMembers: [],
      box: createDefaultBoard(),
      gameOver: false,
      message: "",
    };
    // this.initGame = this.initGame.bind(this);
  }

  
  // initGame() {
    
  //   console.log("init game", this.props.resetGame());
    
  //     // this.props.resetGame()
  // }

  createCells() {
    console.log("props" , this.props);
    return this.props.game.box.map((row, rowNum) => (
      //  <Container className="game-container">
      <div className="game-row" key={rowNum}>
        {row.map((cell, cellNum) => (
          <GridCell
            color={cell.color}
            x={cellNum}
            y={rowNum}
            key={`${cellNum}${rowNum}`}
          />
        ))}
      </div>
      //  {/* </Container> */}
    ));
  }

  selectPlayer1 = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const selectedPlayer1 = this.state.householdMembers.find((member) => {
      return event.target.value === member._id;
    });
    selectedPlayer1.color = "player1" === event.target.name ? "red" : "yellow";
    this.setState({
      player1_id: selectedPlayer1,
    });
    // console.log("player is ", selectedPlayer1);
  };

  selectPlayer2 = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    let selectedPlayer2 = this.state.householdMembers.find((member) => {
      return event.target.value === member._id;
    });
    // selectedPlayer2 = "player2._id" === event.target.name;
    try {
      this.setState({
        player2_id: selectedPlayer2,
      });
    } catch {
      console.error("error");
    };
    
    console.log("player is ", selectedPlayer2);
    console.log("player 2 is ", this.state.player2_id);
  };

  componentDidMount() {
    const { user } = this.props.auth;

    var promisetwo = new Promise((resolve, reject) => {
      API.getHouseholdMembers(user.id)
        .then((res) => resolve(res))
        .catch((err) => reject(Error("API failed")));
    });

    promisetwo.then((result) => {
      this.setState({
        householdMembers: result.data,
      });
      
  console.log(this.state.householdMembers);
    });

    

    console.log(this.state);
  }


  render() {
    return (
      <div>
        <Button onClick={() => {this.props.initGame()}} className="Start Game">
          New Game
        </Button>
        <Form>
          <Form.Row>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 1:</Form.Label>
              <Form.Control
                as="select"
                name="player1._id"
                value={this.state.player1_id}
                // placeholder="Wash the dishes"
                onChange={this.selectPlayer1}
              >
                {/* Map the household members to the drop-down */}
                {this.state.householdMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br>
            </br>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 2:</Form.Label>
              <Form.Control
                as="select"
                name="player2._id"
                value={this.state.player2_id}
                // placeholder="Wash the dishes"
                onChange={this.selectPlayer2}
              >
                {/* Map the household members to the drop-down */}
                {this.state.householdMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
        <div className="grid">
          <div>{this.createCells()}</div>
        </div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const dispatchToProps = (dispatch) => {
  return {
    initGame: () => dispatch(resetGame()),
  };
};

export default connect(mapStateToProps, dispatchToProps)(GameBox);

// 