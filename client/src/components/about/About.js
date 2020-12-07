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
import Navbar from "../layout/Navbar";

const About = () => {

    return (
        <>
            <Navbar />
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
                                <p>ConnectChore helps households keep track of and organize chores to be done. In exchange for the completion of chores, household members may earn prizes. 
                                <br />
                                <br />
                                It’s no secret that an orderly household means a happy household. Organizing chores with an element of gamification and a rewards-based system will help make menial tasks more fun. Plus, there is a psychology angle to this as well: 
                                <ul>
                                    <li>★Kids will learn real-world skills</li>
                                    <li>★Instills a sense of responsibility and ownership</li>
                                    <li>★Greater happiness, self-esteem, and confidence</li>
                                    <li>★And so much more! <a style={{color: "black"}}href="https://www.psychologytoday.com/us/blog/going-beyond-intelligence/201908/children-chores-and-happy-productivity#:~:text=In%20a%20large%20study%2C%20researchers,Psychological%20adjustment%20and%20career%20success." target="_blank" rel="noreferrer">(source)</a></li>
                                </ul>
                                <br />
                                We wanted to create an app that incentivized individuals to get the job done. The idea was straight-forward: users are assigned chores and if they are completed on time, they will be rewarded.
                                Since there other applications related to chores, we created an application different from the rest. To add a fun and competitive spin, we integrated a game based on ConnectFour™️, thus coining the name ConnectChore. We hope you and your household enjoy it!
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