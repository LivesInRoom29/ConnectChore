import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Col, Row } from "react-bootstrap";
import "./Dashboard.css";
import SubNav from "../layout/SubNav";
import "../../App.css";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();

        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <SubNav />
                <Container>
                <br />
                <br />
                <br />
                    <h3 className="dashboard">Hey there, {user.name.split(" ")[0]}!</h3>
                    <br />
                    <p>Get started by adding your family members and your weekly household tasks. Once you've added tasks, create chore lists for each member and assign specific tasks and rewards for finishing them! Family members can battle it out with a game of Connect Four to win the ultimate reward!</p>
                    <br />
                    <Row>
                        <Col><Link to="/addchorelist">
                            <div className="module mid animate">
                                <h2><i className="fas fa-list-ol"></i><br />Create Chorelist</h2>
                            </div></Link></Col>
                        <Col><Link to="/game"><div className="module mid animate">
                            <h2><i className="fas fa-dice"></i><br />Play Game</h2></div></Link></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col><Link to="/rewards"><div className="module mid animate">
                            <h2><i className="fas fa-trophy"></i><br />Add Rewards</h2></div></Link></Col>
                        <Col><Link to="/addtasks"><div className="module mid animate">
                            <h2><i className="fas fa-check"></i><br />Add Tasks</h2></div></Link></Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col><Link
                            to="/householdmembers"
                            className="btn btn-lg button-hover"
                            style={{
                                width: "220px",
                                height: "50px",
                                fontSize: "15px",
                                textTransform: "uppercase",
                                borderRadius: "30px",
                                padding: "12px",
                                backgroundColor: "#42b984",
                                color: "white",
                                letterSpacing: "1.5px"
                              }}
                        ><i class="fas fa-plus"></i>&nbsp;Add Members</Link></Col>
                        {/* <Col><button
                            style={{
                                width: "150px",
                                height: "50px",
                                fontSize: "15px",
                                textTransform: "uppercase",
                                borderRadius: "30px",
                                border: "2px solid",
                                padding: "12px",
                                color: "#42b984",
                                letterSpacing: "1.5px"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-lg button-hover2"
                        >
                            Logout
                        </button></Col> */}
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                <br />
                <br />
                <br />
                </Container>
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