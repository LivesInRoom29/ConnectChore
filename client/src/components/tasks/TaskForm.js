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
// API calls
import API from "../../utils/API";

class Rewards extends Component {

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

    // get tasks data from the DB
    // TEST: will passing in user.id to the API call successfully get us the tasks for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        API.getTasks(user.id)
            .then(res => 
                //console.log(res)
                
                this.setState(
                { 
                    tasks: res.data 
                }
            ))
            .catch(err => console.log(err));
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
        ).then( res => console.log(res))
        .catch(err => console.log(err));
            
    };

    // RENDER TEST:
    // Clicking ADD TASK adds reward as expected to DB for the logged in user only?
    // Clicking the X box successuflly removes the task entry for the logged in user only?

    render() {

        const { user } = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}
                                <p className="text-body">
                                    What type of tasks does your household need to accomplish? Add them here! <br />
                                    <br />
                                    A few examples could be: 
                                </p>
                                    <ul>
                                        <li>★take out the trash</li>
                                        <li>★feed the dog</li>
                                        <li>★clean-up the playroom</li>
                                        <li>★vacuum the hallway</li>
                                    </ul>
                                    <br />
                                <p>The possibilities are endless.<br />
                                </p>
                            </h4>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formDescription">
                                    <Form.Label>Add a task description:</Form.Label>
                                    <Form.Control 
                                        type="input"
                                        name="description"
                                        value={this.state.description}
                                        placeholder="Wash the dishes" 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="formFrequency">
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
                            <Button 
                                variant="primary" 
                                type="submit"
                                onClick={this.addTaskClick}
                            >
                                Add task
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h2>Household Tasks</h2>
                        A list of the tasks will dynamically render here once the API call is built.
                        {/* Eventually filter down to non-deleted and map that array */}
                        {this.state.tasks.length ? (
                            <ListGroup variant="flush">
                                {this.state.tasks.map(task => (
                                    <ListGroup.Item 
                                        key={task._id} 
                                        data-id={task._id} 
                                        className="align-items-center"
                                    >
                                        {task.description} (frequency: {task.frequency || 0}) 
                                        <Button
                                            variant="light"
                                            className="float-right text-danger" 
                                            onClick={
                                                () => API.deleteTask(
                                                    task._id,
                                                    { 
                                                        isDeleted: true
                                                    }
                                                )
                                                .then(res => console.log(res))
                                                .catch(err => console.log(err))
                                            }
                                        >
                                            <span >X</span>
                                        </Button>
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <h3>No tasks to display!</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

Rewards.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Rewards);