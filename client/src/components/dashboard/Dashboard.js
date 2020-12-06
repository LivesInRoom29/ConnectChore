import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SubNav from "../layout/SubNav";
import DateTime from "../dateandtime/DateandTime";
// Bootstrap
import { Container, Col, Row } from "react-bootstrap";

// Local CSS
import "./Dashboard.css";
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
                <Container fluid className="dashboard-container">
                <br />
                <br />
                <br />
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                    <h3 className="dashboard">Hey there, {user.name.split(" ")[0]}!</h3>
                    <br />
                    <DateTime />
                    <br />
                    <p className="dashboard">Get started by adding your family members and your weekly household tasks. Once you've added tasks, create chore lists for each member and assign specific tasks and rewards for finishing them! Family members can battle it out with a game of Connect Four to win the ultimate reward!</p>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                    {/* <h3 className="dashboard">Hey there, {user.name.split(" ")[0]}!</h3>
                    <br />
                    <p>Get started by adding your family members and your weekly household tasks. Once you've added tasks, create chore lists for each member and assign specific tasks and rewards for finishing them! Family members can battle it out with a game of Connect Four to win the ultimate reward!</p> */}
                    <br />


                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}><Link to="/chorelist">
                            <div className="module mid animate">
                                <h2><i className="fas fa-list-ol dashboard-icons"></i><br />Create Chorelist</h2>
                            </div></Link><br /></Col>
                        <Col md={4}><Link to="/game"><div className="module mid animate">
                            <h2><i className="fas fa-dice dashboard-icons"></i><br />Play Game</h2></div></Link></Col>
                            <Col md={2}></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}><Link to="/rewards"><div className="module mid animate">
                            <h2><i className="fas fa-trophy dashboard-icons"></i><br />Add Rewards</h2></div></Link><br /></Col>
                        <Col md={4}><Link to="/tasks"><div className="module mid animate">
                            <h2><i className="fas fa-check dashboard-icons"></i><br />Add Tasks</h2></div></Link></Col>
                        <Col md={2}></Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={2}><Link
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
                        ><i className="fas fa-plus"></i>&nbsp;Add Members</Link></Col>
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
                        <Col md={8}></Col>
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