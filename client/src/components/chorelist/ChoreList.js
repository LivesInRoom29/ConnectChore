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

class ChoreList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            assignedto: "",
            date: "",
            reward:"",
            choreLists: [],
            householdMembers: [],
            rewards: [],
            validateDisplay: false
        }
    }

    // get rewards data from the DB
    // TEST-pass: will passing in user.id to the API call successfully get us the rewards for the logged in user only?
    // componentDidMount() {
    //     const { user } = this.props.auth

    //     API.getChoreLists(user.id)
    //         .then(res => 
    //             //console.log(res)
                
    //             this.setState(
    //             { 
    //                 choreLists: res.data 
    //             }
    //         ))
    //         .catch(err => console.log(err));
    // }

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
    addChoresClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        const { user } = this.props.auth;
        console.log("user id");
        console.log(user.id);
        console.log("this state chores");
        console.log(this.state.reward);
        console.log("this state pointvalue");
        console.log(this.state.pointvalue);

        const {assignedto, date, reward} = this.state;

        API.addchoreListDescription(
            {
                completedBy: assignedto,
                date: date,
                reward: reward,
                userId: user.id
            }
        ).then( res => console.log(res))
        .catch(err => console.log(err));
            
    };

    // RENDER TEST-pass:
    // Clicking ADD REWARD adds reward as expected to DB for the logged in user only?
    // Clicking the X box successuflly removes the rewarddescription entry for the logged in user only?

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
                                    Add chores for the day! <br />
                                    <br />
                                    forexample: 
                                </p>
                                    <ul>
                                        <li>★clean Dishes</li>
                                        <li>★clean Bedroom</li>
                                        <li>★work the Dog</li>
                                        <li>★Do homework.</li>
                                    </ul>
                                    <br />
                                <p>The possibilities are endless.<br />
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
                                <Form.Group as={Col} md="6" controlId="formHouseholdMember">
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
                            <Form.Row>
                            {/* date */}
                            </Form.Row>
                            <Button 
                                variant="primary" 
                                type="submit"
                                onClick={this.addRewardClick}
                            >
                                Add reward
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h2>Household Rewards</h2>
                        A list of the rewards will dynamically render here once the API call is built.
                        {/* Eventually filter down to non-deleted and map that array */}
                        {this.state.rewards.length ? (
                            <ListGroup variant="flush">
                                {this.state.rewards.map(reward => (
                                    <ListGroup.Item 
                                        key={reward._id} 
                                        data-id={reward._id} 
                                        className="align-items-center"
                                    >
                                        {reward.description} (points: {reward.value}) 
                                        <Button
                                            variant="light"
                                            className="float-right text-danger" 
                                            onClick={
                                                () => API.deleteRewardDescription(
                                                    reward._id,
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
                            <h3>No rewards to display!</h3>
                        )}
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
