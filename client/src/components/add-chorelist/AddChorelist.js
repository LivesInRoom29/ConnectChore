// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import TaskDropDown from "../taskdropdown/TaskDropDown";
import ChoreListTask from "../chorelist-tasks/ChoreListTasks";

class AddChorelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {}
    }
  }

  render() {

    const { user } = this.props.auth;
    const choreListID = this.props.choreListToEdit;

    const chorelistEditor = choreListID ? (
      <>
        <h4>Add tasks to your choreslist.</h4>
        <TaskDropDown
          choreListToEdit={choreListID}
        />
        <br />
        <ChoreListTask
          choreListToEdit={choreListID}
        />
      </>
    ) : (
          <h3>No chorelists to display!</h3>
    );

    return (
      <>
        <Row>
          <Col className="addListCol">
            <Form>
              <br />
              <br />
              <br />
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="text-body">
                  Create a chorelist for the day! <br />
                </p>
              </h4>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="formHouseholdMember">
                  <Form.Label>Pick a household member:</Form.Label>
                  <Form.Control
                    as="select"
                    name="assignedto"
                    value={this.props.assignedto}
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
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="formDatePicker">
                  <Form.Label className="mr-5">Select a start date:</Form.Label>
                  <DatePicker
                    utcOffset={0}
                    selected={this.props.startDate}
                    onChange={this.props.handleDateChange} //only when value has changed
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="formReward">
                  <Form.Label>Pick a reward:</Form.Label>
                  <Form.Control
                    as="select"
                    name="reward"
                    value={this.props.reward}
                    onChange={this.props.handleInputChange}
                  >
                    {/* Map the household members to the drop-down */}
                    {
                      this.props.undeletedRewards.map(reward => (
                        <option
                          key={reward._id}
                          value={reward._id}
                        >
                          {reward.description}
                        </option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button
                variant="primary"
                type="submit"
                onClick={this.props.addChoreListClick}
              >
                Add list
                  </Button>
            </Form>
          </Col>
          <Col className="chorelist-editor" md={8}>
            <h2>Your Chorelist</h2>
            {chorelistEditor}
          </Col>
        </Row>
      </>
    )
  }
}

AddChorelist.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
)(AddChorelist);