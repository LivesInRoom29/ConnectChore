// import React, { Component } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTasksAction } from "../../actions/chorelistActions";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import "./choreListTasks.css";


class ChoreListTasks extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks: []
  //   }
  // }

  render() {
    const tasks = this.props.tasks;
    const checkbox = this.props.completionStatus ? (
      <FontAwesomeIcon icon={faCheckSquare} />
    ) : (
      <FontAwesomeIcon icon={faSquare} />
    )

    return (
      <>
      <Row>
        <Col xs="4" md="6">
          <h5>Task</h5>
        </Col>
        <Col xs="3" md="2">
          <h5>Frequency</h5>
        </Col>
        <Col xs="2" md="2">
          <h5>Done?</h5>
        </Col>
        <Col xs="2" md="2">
          <h5>Delete</h5>
        </Col>
      </Row>
      {/* if tasks exist map the chosen tasks here. */}
      {tasks.length ?
        tasks.map((task) => {
          const { _id, description, frequency } = task.task;
          return (
            <Row key={_id}>
              <Col xs="4" md="6">
                <p>{description}</p>
              </Col>
              <Col xs="3" md="2">
                <p>{frequency}</p>
              </Col>
              <Col xs="2" md="2">
                <Button
                  variant="outline-success"
                  type="button"
                  className="taskListButton"
                >
                  {checkbox}
                </Button>
              </Col>
              <Col xs="2" md="2">
                <Button
                  variant="outline-danger"
                  type="button"
                  className="taskListButton"
                >
                  X
                </Button>
              </Col>
            </Row>
          )
        }) : (
          null
        )
      }
      </>
    )
  }
}


ChoreListTasks.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tasks: state.chorelist.tasks
});

const mapDispatchToProps = (dispatch, props) => (
  {
      setTasks: (tasksArray) => dispatch(setTasksAction(tasksArray))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoreListTasks);