// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
        <Row>
          <Button
            variant="outline-success"
            type="button"
            name="listOption"
            value="create"
            className=""
            onClick={this.props.handleInputChange}
          >
            Create A New Chore List
          </Button>
          <Button
            variant="outline-success"
            type="button"
            name="listOption"
            value="view"
            className=""
            onClick={this.props.handleInputChange}
          >
            View Existing Chore Lists
          </Button>
        </Row>
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