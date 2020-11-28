import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Col, Row } from "react-bootstrap";

import GameBox from "../game/GameBox";
import "./Dashboard.css";
//import GameBox from "../game/GameBox";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();

        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <Container className="dashboard-container">
                    <h3 className="dashboard">Hey there, {user.name.split(" ")[0]}!</h3>
                    <br />
                    <br />

                    <GameBox />
                    <Row>
                        <Col lg={true}><Link to="/addchorelist"><div className="module mid animate">
                            <h2><i class="fas fa-list-ol"></i><br />Create Chorelist</h2></div></Link></Col>
                        <Col lg={true}><Link to="/game"><div className="module mid animate">
                            <h2><i class="fas fa-dice"></i><br />Play Game</h2></div></Link></Col>
                    </Row>
                    <Row>
                        <Col lg={true}><Link to="/rewards"><div className="module mid animate">
                            <h2><i class="fas fa-trophy"></i><br />Add Rewards</h2></div></Link></Col>
                        <Col lg={true}><Link to="/addtasks"><div className="module mid animate">
                            <h2><i class="fas fa-check"></i><br />Add Tasks</h2></div></Link></Col>
                    </Row>
                    <br />
                    <div className="dashboard-btn">
                        <Link
                            to="/householdmembers"
                            style={{
                                width: "250px",
                                fontSize: "15px",
                                borderRadius: "30px",
                                padding: "14px",
                                backgroundColor: "#42b984",
                                color: "white",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >Add Family Member</Link>
                        &nbsp; &nbsp;
                        <button
                            style={{
                                width: "150px",
                                fontSize: "15px",
                                borderRadius: "30px",
                                border: "2px solid",
                                padding: "14px",
                                color: "#42b984",
                                letterSpacing: "1.5px"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-brown waves-ripple hoverable accent-3"
                        >
                            Logout
                        </button>
                    </div>
                </Container>
                <br />
                <br />
                <br />
                <br />





                {/* <Container className="dashboard-container">
                    <h3 className="dashboard">Hey there, {user.name.split(" ")[0]}!</h3>
                    <br />
                    <br />
                    <div style={{ height: "75vh" }}>
                        <div className="row">
                            <div className="col s12 center-align">
                                <div><Link to="/addchorelist"><div className="module mid">
                                    <h2><i class="fas fa-list-ol"></i><br />Create Chorelist</h2></div></Link></div>
                                <div><Link to="/game"><div className="module mid">
                                    <h2><i class="fas fa-dice"></i><br />Play Game</h2></div></Link></div>
                                <div className="row">
                                    <div className="col s12 center-align">
                                        <div><Link to="/addchorelist"><div className="module mid">
                                            <h2><i class="fas fa-list-ol"></i><br />Create Chorelist</h2></div></Link></div>
                                        <div><Link to="/game"><div className="module mid">
                                            <h2><i class="fas fa-dice"></i><br />Play Game</h2></div></Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </Container> */}
            </>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);