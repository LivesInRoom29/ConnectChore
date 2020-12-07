import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Scroll from 'react-scroll';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SubNav from "../layout/SubNav";
import DateTime from "../dateandtime/DateandTime";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        let ScrollLink = Scroll.Link;

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
                    <p className="dashboard">Get started by&nbsp;
                        <span 
                            style={{
                                color: "#08124B", 
                                textDecoration: "underline",
                                cursor: "pointer",
                                textShadow: "1px 1px 2px white",
                                fontWeight: "bold"
                            }}>
                                <ScrollLink 
                                    activeClass="active" 
                                    to="householdmembers" 
                                    spy={true} 
                                    smooth={true} 
                                    offset={0} 
                                    duration={500}
                                >adding your household members
                                </ScrollLink>
                        </span> 
                        &nbsp;and&nbsp;
                        <span 
                            style={{
                                color: "#08124B", 
                                textDecoration: "underline",
                                cursor: "pointer",
                                textShadow: "1px 1px 2px white",
                                fontWeight: "bold"
                            }}>
                            <ScrollLink 
                                activeClass="active" 
                                to="tasks" 
                                spy={true} 
                                smooth={true} 
                                offset={0} 
                                duration={500}
                            >your weekly household tasks.
                            </ScrollLink>
                        </span>
                    <br />
                    Once you've added tasks, create chore lists for each member and assign specific tasks and rewards for finishing them! They  can battle it out with a game of ConnectChore to win the ultimate reward!</p>
                    </Col>
                    <Col md={2}></Col>
                </Row>
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
                            <h2 name="tasks"><i className="fas fa-check dashboard-icons"></i><br />Add Tasks</h2></div></Link></Col>
                        <Col md={2}></Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={2}><Link
                            to="/householdmembers"
                            className="btn btn-lg button-hover"
                            name="householdmembers"
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