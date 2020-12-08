import React, { Component } from "react";
import { connect } from "react-redux";
// API calls
import API from "../../utils/API";
// Bootstrap
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import GridCell from "./GridCell";
import SubNav from "../layout/SubNav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { resetGame } from "../../actions/gameActions";
import filterDeleted from "../../utils/filterDeleted";
import "./game.css";
import $ from "jquery";
import Confetti from "../confetti/confetti";


class GameBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 1,
      player2: 2,
      player1Id: "",
      player2Id: "",
      currentPlayer: "",
      householdMembers: [],
      board: [],
      startGame: false,
      gameOver: false,
      message: "",
      winner: null,
    };
    this.selectPlayer = this.selectPlayer.bind(this);
    this.playGame = this.playGame.bind(this);
    this.initGame = this.initGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.playGame();
  }
  initGame() {
    this.props.initGame();
    this.setState(
      {
        currentPlayer: this.state.player1,
        gameOver: false,
        startGame: true,
        message: "",
      }
    );
  }

  componentDidMount() {
    const { user } = this.props.auth;

    var promisetwo = new Promise((resolve, reject) => {
      API.getHouseholdMembers(user.id)
        .then((res) => resolve(res))
        .catch((err) => reject(Error("API failed")));
    });

    promisetwo.then((result) => {
      const undeletedHMs = filterDeleted(result.data);
      const firstHouseholdMember = undeletedHMs[0] ? undeletedHMs[0]._id : "";

     this.setState({
        householdMembers: undeletedHMs,
        player1Id: firstHouseholdMember,
        player2Id: firstHouseholdMember,
      });

    });
  }

  togglePlayer() {
    return this.state.currentPlayer === this.props.player1
      ? this.props.player2
      : this.props.player1;
  }

  playGame(x) {
    if (!this.state.gameOver) {
     
      let board = this.props.game.box;     
      let result = this.checkAll(board);
 
      if (result === this.state.player1) {
        this.setState({
          board,
          gameOver: true,
          winner: this.state.player1,
          message: "Player 1 (red) wins!",
        });
      } else if (result === this.state.player2) {
        this.setState({
          board,
          gameOver: true,
          winner: this.state.player2,
          message: "Player 2 (yellow) wins!",
        });
      } else {
        this.setState({
          board,
          currentPlayer: this.togglePlayer(),
        });
      }
    } else {
      this.setState({
        gameOver: true,
        message: "Game over. Please start a new game.",
      });
    }
  }

  checkLine = (a, b, c, d) => {
    const firstNotNull = a.color !== "white";
    const secondEqual = b.color === a.color;
    const thirdEqual = c.color === a.color;
    const fourthEqual = d.color === a.color;

     return firstNotNull && secondEqual && thirdEqual && fourthEqual;
  };

  checkHorizontal = (board) => {
    let winner = null;

    const rows = board.length;
    const [column] = board;
    const columns = column.length;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns - 3; column++) {
       
        if (
          this.checkLine(
            board[row][column],
            board[row][column + 1],
            board[row][column + 2],
            board[row][column + 3]
          )
        ) {
          
          if (board[row][column].color === "red") {
            winner = 1;
          } else {
            winner = 2;
          }
          return winner;
        }
      }
    }
  };

  checkVertical = (board) => {
    let winner = null;

    const rows = board.length;
    const [column] = board;
    const columns = column.length;

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows - 3; row++) {
        
        if (
          this.checkLine(
            board[row][column],
            board[row + 1][column],
            board[row + 2][column],
            board[row + 3][column]
          )
        ) {
          
          if (board[row][column].color === "red") {
            winner = 1;
          } else {
            winner = 2;
          }
          return winner;
        }
      }
    }
  };
  checkDiagonalRight = (board) => {
    let winner = null;

    const rows = board.length;
    const [column] = board;
    const columns = column.length;

    for (let row = 3; row < rows; row++) {
      for (let column = 0; column < columns - 3; column++) {
     
        if (
          this.checkLine(
            board[row][column],
            board[row - 1][column + 1],
            board[row - 2][column + 2],
            board[row - 3][column + 3]
          )
        ) {

          if (board[row][column].color === "red") {
            winner = 1;
          } else {
            winner = 2;
          }
          return winner;
        }
      }
    }
  };
  checkDiagonalLeft = (board) => {
    let winner = null;

    const rows = board.length;
    const [column] = board;
    const columns = column.length;

    for (let row = 3; row < rows; row++) {
      for (let column = 3; column < columns; column++) {
   
        if (
          this.checkLine(
            board[row][column],
            board[row - 1][column - 1],
            board[row - 2][column - 2],
            board[row - 3][column - 3]
          )
        ) {
         
          if (board[row][column].color === "red") {
            winner = 1;
          } else {
            winner = 2;
          }
          return winner;
        }
      }
    }
  };
  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board)
    );
  }

  createCells() {

    if (this.state.startGame) {
      return this.props.game.box.map((row, rowNum) => (
        
        <div className="game-row" key={rowNum}>
          {row.map((cell, cellNum) => (
            <GridCell
              color={cell.color}
              x={cellNum}
              y={rowNum}
              key={`${cellNum}${rowNum}`}
              currentPlayer={this.state.currentPlayer}
              gameOver={this.state.gameOver}
              startGame={this.state.startGame}
              message={this.state.message}
              playGame={this.playGame}
              togglePlayer={this.togglePlayer}
              handleClick={this.handleClick}
            />
          ))}
        </div>
     
      ));
    } else {
      return null;
    }
  }

  selectPlayer(event) {
    event.preventDefault();

    try {
      this.setState(
        {
          [event.target.name]: event.target.value,
        }
      );
    } catch {
      console.error("error");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.box !== this.props.game.box) {
      this.playGame();
    }
  }
  render() {
    return (
      <>
        <SubNav />
        <Container fluid style={{ height: "100%" }}>
          <div>
            <br />
            <br />
      
            <center>
              <Container>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group controlId="formHouseholdMember">
                        <Form.Label>Player 1:</Form.Label>
                        <Form.Control
                          as="select"
                          name="player1Id"
                          value={this.state.player1Id}
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
                    </Form>
                  </Col>
                  <Col>
                    <Form>
                      <Form.Group controlId="formHouseholdMember">
                        <Form.Label>Player 2:</Form.Label>
                        <Form.Control
                          as="select"
                          name="player2Id"
                          value={this.state.player2Id}
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
                    </Form>
                  </Col>
                </Row>
              </Container>
            </center>
            <center>
              <Button
                as={Col}
                md="3"
                onClick={this.initGame}
                className="Start Game"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "200px",
                  height: "50px",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  borderRadius: "30px",
                  border: "none",
                  padding: "12px",
                  backgroundColor: "#00adef",
                  color: "white",
                  letterSpacing: "1.5px",
                  textAlign: "center",
                }}
              >
                New Game
              </Button>
            </center>
            <br />
            <p className="message">{this.state.message}</p>
            <div className="message">{<Confetti />}</div>
           
            <div className="grid">
              <div>{this.createCells()}</div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </Container>
      </>
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

