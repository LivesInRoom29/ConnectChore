// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "../../App.css";

class ChoreListOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {}
    }
  }

  render() {

    return (
      <>
      <Container>
        <Row>
        <Col lg={12} className="d-flex justify-content-center text-center">
          <Row>
          <Col>
          <Button className="btn btn-lg button-hover2"
            style={{
              width: "300px",
              height: "50px",
              fontSize: "15px",
              borderRadius: "30px",
              border: "2px solid",
              padding: "14px",
              backgroundColor: "#ffffff",
              color: "#42b984",
              letterSpacing: "1.5px",
          }}
            type="button"
            name="listOption"
            value="create"
            className=""
            onClick={this.props.handleInputChange}
          >
            Create A New Chore List
          </Button>
          </Col>
          <Col>
          <Button className="btn btn-lg button-hover2"
          style={{
            width: "300px",
            height: "50px",
            fontSize: "15px",
            borderRadius: "30px",
            border: "2px solid",
            padding: "14px",
            backgroundColor: "#ffffff",
            color: "#42b984",
            letterSpacing: "1.5px"
        }}
            type="button"
            name="listOption"
            value="view"
            className=""
            onClick={this.props.handleInputChange}
          >
            View Existing Chore Lists
          </Button>
          </Col>
          </Row>
          </Col>
        </Row>
        </Container>
      </>
    )
  }
};


ChoreListOptions.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
)(ChoreListOptions);