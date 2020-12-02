import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <Container fluid style={{ height: "100vh" }} className="landing-container" id="main">
          {/* Header text */}
          <Row>
            <Col md={6} className="mx-auto">
              <br />
              <br />
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
                Add rewards for checking items off the to-do list
                <br />
                Battle it out with a game of ConnectChore!
              </h5>
            </Col>
          </Row>
          {/* Buttons */}
          <Row>
            <Col lg={12} className="d-flex justify-content-md-center mt-5">
              <br />
              <br />
              <Row>
                <Col lg={6}>
                  <Link
                    to="/register"
                    style={{
                      width: "140px",
                      borderRadius: "30px",
                      padding: "14px",
                      backgroundColor: "#42b984",
                      color: "white",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-lg button-hover"
                  >Sign Up</Link>
                </Col>
                <Col lg={6}>
                  <Link
                    to="/login"
                    style={{
                      width: "140px",
                      borderRadius: "30px",
                      padding: "14px",
                      backgroundColor: "#ffffff",
                      color: "#42b984",
                      border: "2px solid",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-lg button-hover"
                  >Log In</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Landing;