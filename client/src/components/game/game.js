import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Container } from "react-bootstrap";

class Game extends Component {
  render() {
    // Bringing in the logged in user!
    const { user } = this.props.auth;
    return (
      <Container>
        <h1>ConnectChore Game!</h1>
        <br />
        <br />
        <br />
      </Container>
    );
  }
}


// REDUX Stuff - to make sure you have access to the logged in user!!
Game.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Game);