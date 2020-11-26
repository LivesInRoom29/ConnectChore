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
            this.setState(
                {
                    rewards: result.data
                }
            )
        });

        var promisetwo = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(result => {
            this.setState(
                {
                    householdMembers: result.data
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
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

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
        ).then(res => console.log(res))
            .catch(err => console.log(err));

    };

    // RENDER TEST:
    // Clicking ADD REWARD adds reward as expected to DB for the logged in user only?
    // Clicking the X box successuflly removes the rewarddescription entry for the logged in user only?

    render() {

        const { user } = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col>
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
                                    <Form.Label>Pick someone:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="assignedto"
                                        value={this.state.assignedto}
                                        // placeholder="Wash the dishes" 
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
                                        // placeholder="Wash the dishes" 
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
                </Row>
                <Row>
                    <Col md={8}>
                        <h2>Your Chorelist</h2>
                        <h3>No chorelists to display!</h3>
                        <br />
                        <br />
                        <br />
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
