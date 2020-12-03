import React, { Component } from "react";
import { connect } from "react-redux";
// API calls
import API from "../../utils/API";
import { Button } from "react-bootstrap";
import GridCell from "./GridCell";

import Form from "react-bootstrap/Form";
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
    };
    this.selectPlayer = this.selectPlayer.bind(this);
    this.playGame = this.playGame.bind(this);
    this.initGame = this.initGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  initGame() {
    const box = [];
    for (let y = 5; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < 7; x++) {
        row.push({
          color: "white",
        });
      }

      box.push(row);
    }
    console.log("box is ", box);
    console.log("current player ", this.state.player1);
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

  playGame() {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.props.game.box;
      // for (let y = 5; y >= 0; y--) {
      //   if (!board[y][x]) {
      //     board[y][x] = this.state.currentPlayer;
      //     break;
      //   }
      // }

      // console.log("board is ", board[y][x]);

      console.log("current player", this.state.currentPlayer);

      // Check status of board
      let result = this.checkAll(board);
      console.log("result is", result);
      console.log("board is...", board);
      if (result === this.state.player1) {
        this.setState({
          board,
          gameOver: true,
          message: "Player 1 (red) wins!",
        });
      } else if (result === this.state.player2) {
        this.setState({
          board,
          gameOver: true,
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
        message: "Game over. Please start a new game.",
      });
    }
  }

  checkVertical = (board) => {
    let counter = 0;
    let winner = null;
    let columnCount = board[0].length;
    const columns = board[0].reduce(
      (obj, col, index) => {
        obj.red = 0;
        obj.yellow = 0;
        board.forEach((row) => {
          obj[row[index].color] += 1;
          if (obj.red > 3) {
            winner = 1;
            console.log("vertical winner", winner);
          } else if (obj.yellow > 3) {
            winner = 2;
            console.log("vertical winner", winner);
          }
        });
        return obj;
      },
      { red: 0, yellow: 0 }
    );
    return winner;
  };

  checkHorizontal = (board) => {
    let winner = null;
    board.reduce(
      (obj, row) => {
        obj.red = 0;
        obj.yellow = 0;
        row.forEach((cell) => {
          obj[cell.color] += 1;
          if (obj.red > 3) {
            winner = 1;
            console.log("horizontal winner", winner);
          } else if (obj.yellow > 3) {
            winner = 2;
            console.log("horizontal winner", winner);
          }
        });
        return obj;
      },
      { red: 0, yellow: 0 }
    );
    return winner;
  };

  checkDiagonalRight = (board) => {
    let winner = 0;
    const obj = { red: 0, yellow: 0 };
    board.forEach((row, rowIndex) => {
      if (rowIndex < board.length) {
        row.forEach((cell, cellIndex) => {
          if (cellIndex < row.length) {
            const nextRow = board[rowIndex] + 1;
            const nextCell = nextRow[rowIndex] - 2;
            console.log("next row ", nextRow);
            console.log("next cell ", nextCell);
            obj[nextCell.color] += 1;
            if (obj.red > 3) {
              winner = 1;
              console.log("diag winner", winner);
            } else if (obj.yellow > 3) {
              winner = 2;
              console.log("diag winner", winner);
            }
          }
        });
      }
    });
    return winner;
  };



  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      // this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board)
    );
  }

  handleClick() {
    // this.playGame();
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
      <div>
        <Button onClick={this.initGame} className="Start Game">
          New Game
        </Button>
        <Form>
          <Form.Row>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 1:</Form.Label>
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
            <br></br>
            <Form.Group controlId="formHouseholdMember">
              <Form.Label>Pick Player 2:</Form.Label>
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
