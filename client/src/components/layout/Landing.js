import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Local CSS
import "./Landing.css";
import "../../App.css";


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#fff" };
  }

  render() {
    return (
      <>
        <NavBar />
        <Container fluid style={{ height: "100vh" }} className="landing-container" id="main">
          {/* Header text */}
          <Row>
            <Col md={8} className="mx-auto">
              <br />
              <br />
              <br />
              <br />
              <h1 className="text-center">
                <b>Chores just got a lot more fun!</b>
              </h1>
              <h5 className="text-center">
                Create a list of household chores and assign tasks to family members.
                <br />
                Add rewards for checking items off the to-do list.
                <br />
                Battle it out with a game of ConnectChore!
              </h5>
            </Col>
          </Row>
          {/* Buttons */}
          <Row>
            <Col lg={12} className="d-flex justify-content-center mt-5 text-center">
              <br />
              <br />
              <Row>
                <Col lg={6}>
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      height: "50px",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      borderRadius: "30px",
                      border: "2px solid",
                      padding: "12px",
                      backgroundColor: "#42b984",
                      color: "white",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-lg button-hover mb-3"
                  >Sign Up</Link>
                </Col>
                <Col lg={6}>
                  <Link
                    to="/login"
                    style={{
                      width: "140px",
                      height: "50px",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      borderRadius: "30px",
                      border: "2px solid",
                      padding: "12px",
                      color: "#42b984",
                      backgroundColor: "#ffffff",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-lg button-hover mb-3"
                  >Log In</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container fluid className="landing-container2">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col md={1}></Col>
            <Col md={5}><div className="module2 mid2 animate">
              <h2>Why ConnectChore?</h2>
            </div></Col>
            <Col md={5}><div className="mid2 animate">
              <div className="about animate"><br />A clean and organized home is a happy home! We all know that chores can feel never-ending.. there's always dishes to wash, playrooms to tidy, and laundry to fold. ConnectChore will help you organize your family's to-do list all in one place and you can even add rewards to make checking items off the list even sweeter!</div></div></Col>
            <Col md={1}></Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col md={2}></Col>
            <Col md={2}><div className="info"><h2><i className="fas fa-check landing-icons animate"></i><br />Add Tasks</h2><p>Add tasks like laundry, dishes, make bed, feed dog, etc.</p><br /><br /></div></Col>
            <Col md={2}><div className="info"><h2 className="icons"><i className="fas fa-list-ol landing-icons animate"></i><br />Create Chorelists</h2><p>Make a list specific to each household member.</p><br /><br /></div></Col>
            <Col md={2}><div className="info"><h2 className="icons"><i className="fas fa-trophy landing-icons animate"></i><br />Add Rewards</h2><p>Make chores more fun with rewards your family will love!</p><br /><br /></div></Col>
            <Col md={2}><div className="info"><h2 className="icons"><i className="fas fa-dice landing-icons animate"></i><br />Play Game</h2><p>A friendly competition to win the ultimate reward!</p></div></Col>
            <Col md={2}></Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col lg={12} className="d-flex justify-content-center mt-5 text-center"><h3 className="landing">Learn more about <Link to="/about" className="aboutCC">ConnectChore.</Link></h3></Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Container>
      </>
    );
  }
}
export default Landing;