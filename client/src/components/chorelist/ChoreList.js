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
// Date picker
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
// API calls
import API from "../../utils/API";
import TaskDropDown from "../taskdropdown/TaskDropDown";
import ChoreListTask from "../chorelist-tasks/ChoreListTasks";
import filterDeleted from "../../utils/filterDeleted";

import "./choreList.css";

class ChoreList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            assignedto: "",
            startDate: new Date(),
            reward: "",
            choreLists: [],
            householdMembers: [],
            rewards: [],
            choreListToEdit: "",
            choreListData: {},
            validateDisplay: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // get rewards data from the DB
    // TEST-pass: will passing in user.id to the API call successfully get us the rewards for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        var promise = new Promise((resolve, reject) => {
            API.getRewardDescriptions(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(result => {
            // filter the deleted rewards out of the data to store in state
            const undeletedRewards = filterDeleted(result.data);
            const firstReward = undeletedRewards[0] ? undeletedRewards[0]._id : "";

            // set the rewards state to be the undeletedRewards and
            // the reward state to be the id for the first reward in that array
            this.setState(
                {
                    rewards: undeletedRewards,
                    reward: firstReward
                }
            )
        });

        var promisetwo = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => {
                    resolve(res)
                })
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(result => {
            // filter the deleted household members out of the data to store in state
            const undeletedHMs = filterDeleted(result.data);
            const firstHouseholdMember = undeletedHMs[0] ? undeletedHMs[0]._id : "";

            // set the householdMembers state to be the undeletedHMs and
            // the assignedto state to be the first household member in that array
            this.setState(
                {
                    householdMembers: undeletedHMs,
                    assignedto: firstHouseholdMember
                }
            )
        });
    }

    handleChange(date) {
        this.setState({
            startDate: new Date(date)
        });
    }

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();

        this.setState(
            {
                // ...this.state,
                [event.target.name]: event.target.value
                // chorelist date and reward
            }
        );
    };

    // TEST-pass: when clicking the ADD REWARD, does the reward successfully get added to rewarddescription for the logged in user only?
    addChoreListClick = e => {
        e.preventDefault();

        let mainDate = format(this.state.startDate, "MM/dd/yyyy");
        const { user } = this.props.auth;
        const { assignedto, reward } = this.state;

        API.addChoreList(
            {
                completedBy: assignedto,
                date: mainDate,
                reward: reward,
                userId: user.id
            }
        ).then(res => {
            this.setState({ choreListToEdit: res.data._id });
        })
            .catch(err => console.log(err));
    };


    // RENDER TEST:
    // Clicking ADD LIST adds chorelist as expected to DB for the logged in user only? -- YES
    // Clicking ADD LIST renders other half of the page - to add tasks to the chorelist:
    // -- renders the dropdown menu for tasks to add -- YES
    // -- renders the list of tasks when added to the chorelist -- YES

    render() {

        const { user } = this.props.auth;
        const choreListID = this.state.choreListToEdit;

        const chorelistEditor = choreListID ? (
            <>
                <TaskDropDown
                    choreListToEdit={choreListID}
                />
                <br />
                <ChoreListTask
                    choreListToEdit={choreListID}
                />
            </>
        ) : (
                <>
                    <h2>Your Chorelist</h2>
                    <h3>No chorelists to display!</h3>
                </>
            )

        return (
            <Container>
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
                                        value={this.state.assignedto}
                                        onChange={this.handleInputChange}
                                    >
                                        {/* Map the household members to the drop-down */}
                                        {
                                            this.state.householdMembers.map(member => (
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
                                    <Form.Label className="mr-5">Select a date:</Form.Label>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        //onSelect={handleDateSelect} //when day is clicked
                                        onChange={this.handleChange} //only when value has changed
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
                                        value={this.state.reward}
                                        onChange={this.handleInputChange}
                                    >
                                        {/* Map the household members to the drop-down */}
                                        {
                                            this.state.rewards.map(reward => (
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
                                onClick={this.addChoreListClick}
                            >
                                Add list
                            </Button>
                        </Form>
                    </Col>
                    <Col className="chorelist-editor" md={8}>
                        {chorelistEditor}
                    </Col>
                </Row>
            </Container>
        );
    }
}

ChoreList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(ChoreList);
