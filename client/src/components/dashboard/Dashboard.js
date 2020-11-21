import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import "./Dashboard.css";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();

        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <Container>
                <h3>Hey there, {user.name.split(" ")[0]}!</h3>
                    <Form>
                        <Form.Group controlId="householdmember">
                            <Form.Label>Add A Family Member</Form.Label>
                            <Form.Control type="text" placeholder="Enter a family member" />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br />
                    <br />
                    <Row>
                        <Col lg={true}><Link to="/addchorelist"><div className="module mid">
                            <h2>Chores</h2>
                        </div></Link></Col>
                        <Col lg={true}><Link to="/game"><div className="module mid">
                            <h2>Game</h2>
                        </div></Link></Col>
                    </Row>
                    <Row>
                        <Col lg={true}>
                            <Link to="/rewards"><div className="module mid">
                                <h2>Rewards</h2>
                            </div></Link></Col>
                        <Col lg={true}><Link to="/addtasks"><div className="module mid">
                            <h2>Tasks</h2>
                        </div></Link></Col>
                    </Row>
                    <Button variant="outline-info" onClick={this.onLogoutClick}>Logout</Button>
                </Container>



                {/* <div className="container">
                    <div className="row">
                        <div className="col">
                        <a href="/chores"><div className="module mid">
                            <h2>Chores</h2>
                        </div></a>
                </div>
                        <div className="col">
                        <a href="/chores"><div className="module mid">
                            <h2>Chores</h2>
                        </div></a>
                </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <a href="/chores"><div className="module mid">
                            <h2>Chores</h2>
                        </div></a>
                </div>
                        <div className="col">
                        <a href="/chores"><div className="module mid">
                            <h2>Chores</h2>
                        </div></a>
                 </div>
                        <div className="col">
                        <a href="/chores"><div className="module mid">
                            <h2>Chores</h2>
                        </div></a>
                 </div>
                    </div>
                </div> */}


                {/* <br />
                <br />


                <a className="waves-effect waves-light btn" onClick={this.onLogoutClick}>Logout</a>

                <div className="button"><button
                    style={{
                        width: "150px",
                        borderRadius: "30px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Logout
                        </button></div> */}



                <br />
                <br />
                <br />
                <br />



                {/* <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into a full-stack{" "}
                                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                            </p>
                        </h4>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "30px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                        </button>
                        </div>
                    </div>
                </div> */}
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