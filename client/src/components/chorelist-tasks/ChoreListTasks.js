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
import API from "../../utils/API";

class ChoreListTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
        auth: {}
    }
  }

  handleCompletionStatusChange = async e => {
    const choreListId = this.props.choreListToEdit;
    //using e.currentTarget here instead of e.target so that the click event
    // is always linked to the button itself and not to the icon in the button
    const taskId = e.currentTarget.dataset.id;
    const currentCompletionStatus = e.currentTarget.value;
    let newCompletionStatus;  

    if (currentCompletionStatus === "false") {
      newCompletionStatus = true;
    } else {
      newCompletionStatus = false;
    }

    //update the completion of the status in the chorelist (not populated with task data)
    await API.updateTaskCompletion(taskId, newCompletionStatus);

    try {
      const newListWithTasks = await API.getChoreListWithTasks(choreListId);
      this.props.setTasks(newListWithTasks.data.tasks);
    } catch (err) {
        console.log(err);
    }
  };

  handleDeleteTask = async e => {
    const choreListId = this.props.choreListToEdit;

    //using e.currentTarget here instead of e.target so that the click event
    // is always linked to the button itself and not to the icon in the button
    const taskId = e.currentTarget.dataset.id;
    console.log("task id: ", taskId)

    await API.deleteTaskFromChoreList(choreListId, taskId);

    try {
      const newListWithTasks = await API.getChoreListWithTasks(choreListId);
      console.log("new list: ", newListWithTasks);
      this.props.setTasks(newListWithTasks.data.tasks);
    } catch (err) {
        console.log(err);
    }

  };

  render() {
    const tasks = this.props.tasks;
    const checkbox = (completionStatus) => {

      return completionStatus ? (
        <FontAwesomeIcon icon={faCheckSquare} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )
    };

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
      {/* if tasks exist map the chosen tasks here, otherwise return Null */}
      {tasks.length ?
        tasks.map((task) => {
          const { description, frequency } = task.task;
          return (
            <Row key={task._id}>
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
                  value={task.completionStatus}
                  data-id={task._id}
                  className="taskListButton"
                  onClick={this.handleCompletionStatusChange}
                >
                  {checkbox(task.completionStatus)}
                </Button>
              </Col>
              <Col xs="2" md="2">
                <Button
                  variant="outline-danger"
                  type="button"
                  data-id={task._id}
                  className="taskListButton"
                  onClick={this.handleDeleteTask}
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
};


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