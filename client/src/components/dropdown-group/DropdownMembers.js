// Need for React and Redux
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// API calls
//import filterDeleted from "../../utils/filterDeleted";
//import API from "../../utils/API";

import "../chorelist-tasks/choreListTasks.css"

class DropdownMembers extends Component {

  render() {
    return (
      <Form.Group as={Col} md="6" controlId="formHouseholdMember">
        <Form.Label>Pick someone:</Form.Label>
        <Form.Control
          as="select"
          name="householdMemberId"
          value={this.props.householdMemberId}
          // placeholder="Wash the dishes"
          onChange={this.props.handleInputChange}
        >
          {/* Map the household members to the drop-down */}
          {
            this.props.householdMembers.map(member => (
              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
              </option>
            ))
          }
        </Form.Control>
      </Form.Group>
    )
  }
}

export default DropdownMembers;
