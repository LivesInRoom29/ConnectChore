// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// Local Components
import BackToDashboard from "../back-to-dashboard/BackToDashboard";
// API calls
import API from "../../utils/API";
import "../../App.css";
// utils
import filterDeleted from "../../utils/filterDeleted";
import SubNav from "../layout/SubNav";

class TaskForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: "",
            frequency: "",
            tasks: [],
            auth: {}
        }

        this.addTaskClick = this.addTaskClick.bind(this);
    }

    // get tasks data from the DB, set state with undeleted tasks to populate the page
    getUndeletedTasks(userId) {
        API.getTasks(userId)
            .then(res => {

                const undeletedTasks = filterDeleted(res.data)

                this.setState(
                    {
                        tasks: undeletedTasks
                    }
                )
            })
            .catch(err => console.log(err));
    }

    // TEST: will passing in user.id to the API call successfully get us the tasks for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        this.getUndeletedTasks(user.id);

        // API.getTasks(user.id)
        //     .then(res => {

        //         const undeletedTasks = filterDeleted(res.data)

        //         this.setState(
        //             {
        //                 tasks: undeletedTasks
        //             }
        //         )
        //     })
        //     .catch(err => console.log(err));
    }

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();

        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value
                // description and frequency
            }
        );
    };

    // TEST: when clicking the ADD TASK, does the task successfully get added to tasks for the logged in user only?
    addTaskClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        const { user } = this.props.auth;

        const { description, frequency } = this.state;

        API.addTask(
            {
                description: description,
                frequency: frequency,
                userId: user.id
            }
        ).then(res => console.log(res))
            .catch(err => console.log(err));

    };

    handleTaskDelete = async e => {
        const { user } = this.props.auth;
        const taskId = e.currentTarget.dataset.id;

        await API.deleteTask(
            taskId,
            {
                isDeleted: true
            }
        );

        this.getUndeletedTasks(user.id);
    }

    // RENDER TEST:
    // Clicking ADD TASK adds reward as expected to DB for the logged in user only? YES
    // Clicking the X box successuflly removes the task entry for the logged in user only? YES

    render() {

        return (
            <>
                <SubNav />
                <Container>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <BackToDashboard />
                            <Form>
                                <div>
                                    <h3>Tasks</h3>
                                    <p>What type of tasks does your household need to accomplish? <br /> Add them here so you can assign them to a household member's chore list!</p>
                                    <br />
                                    <div><b>A few examples could be:</b></div>
                                        <ul>
                                            <li>★take out the trash</li>
                                            <li>★feed the dog</li>
                                            <li>★clean-up the playroom</li>
                                            <li>★vacuum the hallway</li>
                                        </ul>
                                </div>
                                <br />
                                <Form.Row>
                                    <Form.Group as={Col} lg="6" controlId="formDescription">
                                        <Form.Label>Add a task description:</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name="description"
                                            value={this.state.description}
                                            placeholder="Wash the dishes"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} lg="3" controlId="formFrequency">
                                        <Form.Label>Frequency per week:</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name="frequency"
                                            value={this.state.frequency}
                                            placeholder="2"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <br />
                                <Button style={{
                                    width: "150px",
                                    height: "50px",
                                    fontSize: "15px",
                                    textTransform: "uppercase",
                                    borderRadius: "30px",
                                    border: "none",
                                    padding: "12px",
                                    backgroundColor: "#42b984",
                                    color: "#ffffff",
                                    letterSpacing: "1.5px"
                                }}
                                    className="btn btn-lg button-hover2"
                                    type="submit"
                                    onClick={this.addTaskClick}
                                >
                                    Add task
                            </Button>
                            </Form>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col md={6}>
                            <br />
                            <h3>Household Tasks</h3>
                        <p>View all of your added household tasks.</p>
                        {/* Eventually filter down to non-deleted and map that array */}
                            {this.state.tasks.length ? (
                                <ListGroup variant="flush">
                                    {this.state.tasks.map(task => (
                                        <ListGroup.Item
                                            key={task._id}
                                            data-id={task._id}
                                            className="align-items-center list-group"
                                        >
                                            {task.description} (frequency: {task.frequency || 0})
                                            <Button
                                                variant="light"
                                                data-id={task._id}
                                                className="float-right text-danger"
                                                onClick={this.handleTaskDelete}
                                            >
                                                <span><i className="fas fa-times"></i></span>
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                    <h4><br />No tasks to display!</h4>
                                )}
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>
            </>
        );
    }
}

TaskForm.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(TaskForm);