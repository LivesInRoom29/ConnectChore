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
            tasksid: "",
            tasks: [],
            description: "",
            choresLists: [],
            auth: {}
        }
    }

    //get tasks data from the DB
    // componentDidMount() {
    //     const { user } = this.props.auth

    //     var promise = new Promise((resolve, reject) => {
    //         API.getRewardDescriptions(user.id)
    //             .then(res => resolve(res))
    //             .catch(err => reject(Error("API failed")));
    //     })

    //     promise.then(result => {
    //         this.setState(
    //             {
    //                 rewards: result.data
    //             }
    //         )
    //     });

    //     var promisetwo = new Promise((resolve, reject) => {
    //         API.getHouseholdMembers(user.id)
    //             .then(res => resolve(res))
    //             .catch(err => reject(Error("API failed")));
    //     })

    //     promisetwo.then(result => {
    //         this.setState(
    //             {
    //                 householdMembers: result.data
    //             }
    //         )
    //     });
    // }

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

    addChoreListClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();
       
        //let mainDate = format(this.state.startDate, "MM/dd/yyyy");
        const { task } = this.props.auth;
        const { assignedto, reward } = this.state;

        API.addChoreList(
            {
                completedBy: assignedto,
                reward: reward,
                //userId: user.id
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
                                this.state.tasks.map(tasklist => (
                                    <option
                                        key={tasklist._id}
                                        value={tasklist._id}
                                    >
                                        {tasklist.description}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button
                    variant="primary"
                    type="submit"
                    //onClick={this.someFunction}
                >
                    Submit
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