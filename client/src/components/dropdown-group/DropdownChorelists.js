// Need for React and Redux
import React, { Component } from "react";
import parseISO from 'date-fns/parseISO';
import { format } from "date-fns";
// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class DropdownChorelists extends Component {

  render() {

    const filteredChoreList = this.props.choreLists.filter(list => list.completedBy === this.props.householdMemberId);
    const sortedFilteredList = filteredChoreList.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <Form.Group as={Col} md="6" controlId="formChorelists">
        <Form.Label>Pick a chorelist:</Form.Label>
        <Form.Control
          as="select"
          name="choreListToEdit"
          value={this.props.choreListToEdit}
          onChange={this.props.handleInputChange}
        >
          {/* Map the chorelists to the drop-down */}
          {
            sortedFilteredList
              .map(list => {
                return (
                  <option
                    key={list._id}
                    value={list._id}
                  >
                    {format(parseISO(list.date), "MM/dd/yyyy")} -- {list.reward.description}
                  </option>
                )
              })
          }
        </Form.Control>
      </Form.Group>
    )
  }
}

export default DropdownChorelists;
