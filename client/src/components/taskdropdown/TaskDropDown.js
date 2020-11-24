import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import API from "../../utils/API";

class TaskDropDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choosetask: "",
            allTasks: [],
            chorelistTasks: [],
            description: "",
            auth: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);
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
            this.setState(
                {
                    allTasks: result.data,
                    choosetask: result.data[0]._id
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
        await API.addTaskToChoreList(choreListId, choosetask)
            .then(res => {
                console.log("res.data:", res.data);
            })
            .catch(err => console.log(err));

        // listWithTasks will be the chorelist populated with all task data (not just reference Ids)
        const listWithTasks = await API.getChoreListWithTasks(choreListId)
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));

        // Store the array of tasks with all data in chorelistTasks state
        this.setState(
            {
                chorelistTasks: listWithTasks.data.tasks
            }
        )

        console.log("state chorelistTasks array: ", this.state.chorelistTasks);
    };

    //drop down menu for tasklist
    render() {
        const { user } = this.props.auth
        return (
            <Form>
                <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p className="text-body">
                        Add a task to your choreslist.
                    </p>
                </h4>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formTask">
                        <Form.Label>Pick a task:</Form.Label>
                        <Form.Control
                            as="select"
                            name="choosetask"
                            value={this.state.choosetask}
                            // placeholder="Wash the dishes"
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
                </Form.Row>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.addTaskClick}
                >
                    Add Task
                </Button>
            </Form>
        )
    }
}

TaskDropDown.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(TaskDropDown);