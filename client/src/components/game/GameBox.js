import { connect } from "react-redux";
import React, { Component } from "react";
// API calls
import API from "../../utils/API";
import { Button, Container } from "react-bootstrap";
import GridCell from "./GridCell";
import Form from "react-bootstrap/Form";
import { dropTile } from "../../actions/gameActions";
import "./game.css";

class GameBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.initGame = this.initGame.bind(this);
  }

  initGame(){
    this.setState({
      currentPlayer: this.state.player1,
    });
    
  }
 
 
  createCells() {

  
    return this.props.game.box.map((row, rowNum) => (
      // <Container className="game-container">
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
      // </Container>
    ));
    
  }

  selectPlayer = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const selectedPlayer = this.state.householdMembers.find((member) => {
      return event.target.value === member._id
    });
    selectedPlayer.color="player1" === event.target.name ? "red" : "blue";
    this.setState({
      currentPlayer:selectedPlayer
    });
    console.log( selectedPlayer);
    // return this.state.currentPlayer === this.state.player1
    //   ? this.state.player2
    //   : this.state.player1;
    
  }

 
  // handlePlayerChange = (event) => {
  //   let currentPlayerColor= this.state.currentPlayer.color;
  //   let p1Color = this.state.player1.color;
  //   let p2Color = this.state.player2.color;
   
  //   if (currentPlayerColor !== undefined) {
      
  //   }
   
   
  //   // return (this.state.currentPlayer === this.player1) ? this.state.player2: this.state.player1;
    
    
  // };
    
 

  // get the input values and add to state
  //   handlePlayerChange = event => {
  //     event.preventDefault();

  //     this.setState(
  //         {
  //             ...this.state,
  //             [event.target.name]: event.target.value

  //         }
  //     );
  // };

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
    });

    console.log(this.props);
  }
  render() {  
    return (
      <div>
        <Button onClick={this.initGame} className="Start Game">Start Game</Button>
        <Form>
          <Form.Row>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 1:</Form.Label>
              <Form.Control
                as="select"
                name="player1"
                value={this.state.player1._id}
                // placeholder="Wash the dishes"
                onChange={this.selectPlayer}
              >
                {/* Map the household members to the drop-down */}
                {this.state.householdMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 2:</Form.Label>
              <Form.Control
                as="select"
                name="player2"
                value={this.state.player2._id}
                // placeholder="Wash the dishes"
                onChange={this.selectPlayer}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { dropTile })(GameBox);
