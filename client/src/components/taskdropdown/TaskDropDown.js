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
            tasks: [],
            description: "",
            auth: {}
        }
        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    //get tasks data from the DB
    componentDidMount() {
        const { user } = this.props.auth

        var promise = new Promise((resolve, reject) => {
            API.getTasks(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(result => {
            console.log(result);
            this.setState(
                {
                    tasks: result.data
                }
            )
        });

        // var promisetwo = new Promise((resolve, reject) => {
        //     API.getHouseholdMembers(user.id)
        //         .then(res => resolve(res))
        //         .catch(err => reject(Error("API failed")));
        // })

        // promisetwo.then(result => {
        //     this.setState(
        //         {
        //             householdMembers: result.data
        //         }
        //     )
        // });
    }

    // handleInputChange = event => {
    //     event.preventDefault();

    //     this.setState(
    //         {
    //             //..this.state
    //             [event.target.name]: event.target.value
    //             // don't include ...this.state so the value changes when the drop-down changes 
    //         }
    //     );
    // };

    addTaskClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        //let mainDate = format(this.state.startDate, "MM/dd/yyyy");
        const { task } = this.props.auth;
        const { choosetask, } = this.state;

        API.addTaskToChoreList(
            {
                //add tasks to chorelist
                description: task,
                tasks: choosetask

            }
        ).then(res => console.log(res))
            .catch(err => console.log(err));

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
                                this.state.tasks.map(task => (
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