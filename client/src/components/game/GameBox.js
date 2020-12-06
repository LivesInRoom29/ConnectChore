import React, { Component } from "react";
import { connect } from "react-redux";
// API calls
import API from "../../utils/API";
// Bootstrap
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap";
import GridCell from "./GridCell";
import SubNav from "../layout/SubNav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { resetGame } from "../../actions/gameActions";
// import {createDefaultBoard} from "../../utils/gameHelper";
import filterDeleted from "../../utils/filterDeleted";
import "./game.css";
// import { each } from "immer/dist/internal";
// import {
//   createDefaultBoard,
//   checkVertical,
//   checkHorizontal,
//   checkDiagonalLeft,
//   checkDiagonalRight,
//   checkAll,
// } from "../../utils/gameHelper";

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
    // const box = [];
    // for (let y = 5; y >= 0; y--) {
    //   const row = [];
    //   for (let x = 0; x < 7; x++) {
    //     row.push({
    //       color: "white",
    //     });
    //   }

    //   box.push(row);
    // }
    // console.log("box is ", box);
    // console.log("current player ", this.state.player1);
    this.props.initGame();
    this.setState(
      {
        currentPlayer: this.state.player1,
        gameOver: false,
        startGame: true,
        message: "",
      },
      () => {
        console.log("state is", this.state);
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

      // set the householdMembers state to be the undeletedHMs and
      // the assignedto state to be the first household member in that array
      this.setState({
        householdMembers: undeletedHMs,
        player1Id: firstHouseholdMember,
        player2Id: firstHouseholdMember,
      });

      console.log(this.state.householdMembers);
    });
  }

  togglePlayer() {
    return this.state.currentPlayer === this.props.player1
      ? this.props.player2
      : this.props.player1;
  }

  playGame(x) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.props.game.box;

      console.log("current player", this.state.currentPlayer);

      // Check status of board
      let result = this.checkAll(board);
      console.log("result is", result);
      console.log("board is...", board);
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
    const secondEqual = b.color == a.color;
    const thirdEqual = c.color == a.color;
    const fourthEqual = d.color == a.color;

    // console.log("a b c d", a, b, c, d );
    // console.log("check 1", firstNotNull, "check 2", secondEqual, "check 3", thirdEqual, "check 4", fourthEqual);
    return firstNotNull && secondEqual && thirdEqual && fourthEqual;


  }

  checkHorizontal = (board) => {
    let winner = null;

    const rows = board.length;
    const [column] = board;
    const columns = column.length;


    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns - 3; column++) {
        // console.log(`row ${row} column ${column}`, board[row][column]);
        if (this.checkLine(
          board[row][column],
          board[row][column + 1],
          board[row][column + 2],
          board[row][column + 3])
        ) {
          // console.log("horizontal check", board[row][column]);
          if (
            board[row][column].color === "red"
          ) {
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
        // console.log(`row ${row} column ${column}`, board[row][column]);
        if (this.checkLine(
          board[row][column],
          board[row + 1][column],
          board[row + 2][column],
          board[row + 3][column])
        ) {
          // console.log("verticle check", board[row][column]);
          if (
            board[row][column].color === "red"
          ) {
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
        // console.log(`row ${row} column ${column}`, board[row][column]);
        if (this.checkLine(
          board[row][column],
          board[row - 1][column + 1],
          board[row - 2][column + 2],
          board[row - 3][column + 3])
        ) {
          // console.log("horizontal check", board[row][column]);
          if (
            board[row][column].color === "red"
          ) {
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
        console.log(`row ${row} column ${column}`, board[row][column]);
        if (this.checkLine(
          board[row][column],
          board[row - 1][column - 1],
          board[row - 2][column - 2],
          board[row - 3][column - 3])
        ) {
          console.log("diag left check", board[row][column]);
          if (
            board[row][column].color === "red"
          ) {
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
    console.log("start game", this.state.startGame);

    if (this.state.startGame) {
      return this.props.game.box.map((row, rowNum) => (
        // <Container className="game-container">
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
        // </Container>
      ));
    } else {
      return null;
    }
  }

  selectPlayer(event) {
    event.preventDefault();
    console.log(event.target.value);
    console.log(event.target.name);
    // let selectedPlayer2 = this.state.householdMembers.find((member) => {
    //   return event.target.value === member._id;
    // });
    // selectedPlayer2 = "player2._id" === event.target.name;
    try {
      this.setState(
        {
          [event.target.name]: event.target.value,
        },
        () => {
          console.log("state 2 ", this.state.player2Id);
          console.log("state 1", this.state.player1Id);
        }
      );
      // console.log("state is ", this.state);
      console.log("name is", event.target.name);
      console.log("value is", event.target.value);
    } catch {
      console.error("error");
    }
  }

  // componentWillMount() {
  //   this.initGame();
  // }
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
            <Button onClick={this.initGame} className="Start Game"
              style={{
                width: "200px",
                height: "50px",
                fontSize: "15px",
                textTransform: "uppercase",
                borderRadius: "30px",
                border: "none",
                padding: "12px",
                backgroundColor: "#00adef",
                color: "white",
                letterSpacing: "1.5px"
              }}
              className="btn btn-lg button-hover mb-3">
              New Game</Button>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="2" controlId="formHouseholdMember">
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
                <Form.Group as={Col} md="2" controlId="formHouseholdMember">
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
              </Form.Row>
            </Form>
            <br />
            <div className="grid">
              <div>{this.createCells()}</div>
            </div>
            <p>{this.state.message}</p>
          </div>
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

//
