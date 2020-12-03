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
              filteredChoreList.map(list => {
                
                console.log("list.date:", list.date);
                console.log("newDate(list.date): ", format(new Date(list.date), "MM/dd/yyyy"));
                console.log("parseISO ", format(parseISO(list.date), "MM/dd/yyyy"));
              return (
                <option
                  key={list._id}
                  value={list._id}
                >
                  {format(new Date(list.date), "MM/dd/yyyy")}
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
