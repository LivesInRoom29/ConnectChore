// Need for React
import React from "react";
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// CSS
import "../../App.css";
import "./About.css";
import SubNav from "../layout/SubNav";

const About = () => {

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
                        <h3 style={{ textAlign: "center" }}>Contributors</h3>
                        <div className="p-1 mb-2 bg-secondary text-white" >
                            <br />
                            <ul className="namelist">
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/ASheikh-io">Ahmed Sheikh</a></li>
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/ARam2142">Andres Ramirez</a></li>
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/Bremah-mvp">Bremah Lwanga</a></li>
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/hilbug">Hilary Ferraro</a></li>
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/kdunphe">Kayla Dunphe</a></li>
                                <li id="listitemdd"><a id="listitemh" href="https://github.com/LivesInRoom29">Molly Kizer</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
            </Container>
        </>
    );
}

export default About;