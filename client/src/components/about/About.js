// Need for React and Redux
import React from "react";
//import PropTypes from "prop-types";
//import { connect } from "react-redux";
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Card from "react-bootstrap/Card"
//import CardGroup from "react-bootstrap/CardGroup";
//import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// CSS
import "../../App.css";
import SubNav from "../layout/SubNav";

const About = () => {
    //const { user } = this.props.auth;

    return (
        <>
            <SubNav />
            <Container>
                <br />
                <br />
                <Row>
                    <Col>
                        <Form>
                            <div>
                                <br />
                                <h3 style={{ textAlign: "center" }}>About Us</h3>
                                <hr></hr>
                                <p>ConnectChore is utilized as a way to help users keep track of and organize chores that need to be done in the household.
                                In exchange for the completion of chores, household members may earn prizes. We talked about making a "reward" application or something related to earning rewards.
                                We came up with the idea of combining rewards with tasks. From there we decided to create an application
                                specifically for completing chores. The idea was simple; users are assigned chores and if they are completed on time they will be rewarded.
                                Since there are so many applications related to chores, we had to create an application different from the rest. We needed to include a feature that
                                would be fun and competetive so that users can win a prize. We landed on using Connect Four as our game, thus coining the name, ConnectChore.
                                </p>
                            </div>
                            <br />
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <h3 style={{ textAlign: "center" }}>Contributors</h3>
                            {/* <p style={{textAlign: "center"}}>The Devolpers that made this possible</p> */}
                            <br />
                            {/* ['sm', 'md', 'lg', 'xl'].map((breakpoint, idx) => ( */}
                            <ListGroup variant="flush">
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/ASheikh-io"><p style={{color: "black"}}>Ahmed Sheikh</p></a></ListGroup.Item>
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/ARam2142"><p style={{color: "black"}}>Andres Ramirez</p></a></ListGroup.Item>
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/Bremah-mvp"><p style={{color: "black"}}>Bremah Lwanga</p></a></ListGroup.Item>
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/hilbug"><p style={{color: "black"}}>Hilary Ferraro</p></a></ListGroup.Item>
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/kdunphe"><p style={{color: "black"}}>Kayla Dunphe</p></a></ListGroup.Item>
                                <ListGroup.Item><a rel="nonreferrer" href="https://github.com/LivesInRoom29"><p style={{color: "black"}}>Molly Kizer</p></a></ListGroup.Item>
                            </ListGroup>
                            {/* )); */}
                        </div>

                        <br />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;