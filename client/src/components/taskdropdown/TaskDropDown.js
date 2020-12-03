import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import API from "../../utils/API";
import { setTasksAction } from "../../actions/chorelistActions";
import filterDeleted from "../../utils/filterDeleted";

import "./taskDropDown.css";
import SubNav from "../layout/SubNav";

class TaskDropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choosetask: "",
            allTasks: [],
            description: "",
            auth: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    //get all tasks saved by the user from the DB
    componentDidMount() {
        const { user } = this.props.auth

        var promise = new Promise((resolve, reject) => {
            API.getTasks(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(result => {
            // filter the deleted tasks out of the data to store in state
            const undeletedTasks = filterDeleted(result.data);
            const firstTask = undeletedTasks[0] ? undeletedTasks[0]._id : "";

            this.setState(
                {
                    allTasks: result.data,
                    choosetask: firstTask
                }
            )
        });
    }

    // this sets the state for the choosetask using the dropdown menu
    handleInputChange = event => {
        event.preventDefault();

        this.setState(
            {
                //..this.state
                [event.target.name]: event.target.value
                // don't include ...this.state so the value changes when the drop-down changes
            }
        );
    };

    addTaskClick = async (e) => {
        e.preventDefault();

        const choreListId = this.props.choreListToEdit;

        const { choosetask } = this.state;

        // Add task to the chorelist
        await API.addTaskToChoreList(choreListId, choosetask);

        // listWithTasks will be the chorelist populated with all task data (not just reference Ids)
        try {
            const listWithTasks = await API.getChoreListWithTasks(choreListId);
            // Store the array of tasks with all data in chorelistTasks state
            this.props.setTasks(listWithTasks.data.tasks);
        } catch (err) {
            console.log(err);
        }
    };

    //drop down menu for tasklist
    render() {
        return (
        <>
        <SubNav />
            <Form>
                {/* <h4>
                    <p className="text-body">
                        Add a task to your choreslist.
                    </p>
                </h4> */}
                <Form.Row className="dropdown-row">
                    <Form.Group as={Col} md="9" xs="8" controlId="formTask">
                        <Form.Label>Pick a task to add:</Form.Label>
                        <Form.Control
                            as="select"
                            name="choosetask"
                            value={this.state.choosetask}
                            placeholder="Please add tasks first"
                            onChange={this.handleInputChange}
                        >
                            {/* Map the tasks to the drop-down */}
                            {
                                this.state.allTasks.map(task => (
                                    <option
                                        key={task._id}
                                        value={task._id}
                                    >
                                        {task.description}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button
                        id="add-task-button"
                        variant="primary"
                        type="submit"
                        onClick={this.addTaskClick}
                    >
                        Add Task
                    </Button>
                </Form.Row>

            </Form>
            </>
        )
    }
}

TaskDropDown.propTypes = {
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
)(TaskDropDown);