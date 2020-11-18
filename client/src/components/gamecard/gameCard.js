import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Container, Col, Card, Row, Button, Form } from "react-bootstrap";


        /* NEED DATE FIELD ASSOCIATED WITH CHORES */

        // functions start here

        // componentDidMount: 
        // const { user} = this.props.auth;
        // API call to get chorelists assoicated with User
        // do a render for all cards to generate the board
        // setting state of the page to choreList 


class Game extends Component {
  render() {
    return (
      <Container>
        <h1>Chore Tracker</h1>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Family Member</Form.Label>
            <Form.Control as="select">
              <option>User 1</option>
              <option>User 2</option>
              <option>User 3</option>
              <option>User 4</option>
              <option>User 5</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <br />

        {/* <Container>
          <Card>
          <Row>
            <Col>
              <Card>
                <Card.Body>Chore 1</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 2</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 3</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 4</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 5</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>Chore 6</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 7</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 8</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 9</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 10</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>Chore 11</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 12</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>CENTER STAR</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 14</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 15</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>Chore 16</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 17</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 18</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 19</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 20</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>Chore 21</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 22</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 23</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 24</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Chore 25</Card.Body>
              </Card>
            </Col>
          </Row>
          </Card>
        </Container> */}

      </Container>

    );
  }
};

export default Game;
