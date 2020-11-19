import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Game from "../../components/gamecard/gameCard";
import { Container } from "../../components/grid/grid";


class GameCard extends Component {
    render() {
        // const { user } = this.props.auth;

        return (
            <div>
                <Container fluid>
                    <Game />
                </Container>
            </div>

        );
    }
}

export default GameCard;

// GameCard.propTypes = {
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//     mapStateToProps
// )(GameCard);