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
            reward: "",
            pointvalue: "",
            rewards: [
                {
                    rewardDescription: "Ice cream for breakfast",
                    value: 30,
                    userId: "5fb0747008cf063145ebc887",
                    _id: "123456"
                },
                {
                    rewardDescription: "Friday night movie pick",
                    value: 10,
                    userId: "5fb0747008cf063145ebc887",
                    _id: "123456"
                }
            ],
            auth: {}
        }
    }

    // get rewards data from the DB
    // HOW do we use the specific logged in user in-state so that we only get that users rewards from this API call?
    componentDidMount() {
        const { user } = this.props.auth

        API.getRewardDescriptions(user.id)
            .then(res => this.setState(
                { 
                    rewards: res.data 
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
                // reward and value
            }
        );
    };
    
    addRewardClick = e => {
        e.preventDefault();

        API.addRewardDescription(
            {
                rewardDescription: this.state.reward,
                value: this.state.pointvalue,
                userId: this.auth.user.id
            }
        ).then( res => console.log(res))
        .catch(err => console.log(err));
            
    };

    // deleteRewardClick = e => {
    //     e.preventDefault();

    //     API.deleteRewardDescription(this.state
            
    //             rewardDescription: this.state.reward,
    //             value: this.state.pointvalue,
    //             userId: this.auth.user.id
            
    //     ).then( res => console.log(res))
    //     .catch(err => console.log(err));
            
    // };

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
                                    Want to include some motivation to your household's day to day chores? Add potential rewards for a job well done! A few examples could be: pick-a-movie night, ice cream for breakfast, buy a new book, stay up late for 30 extra minutes. The possibilities are endless.
                            </p>
                            </h4>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formReward">
                                    <Form.Label>Enter a reward:</Form.Label>
                                    <Form.Control 
                                        type="input"
                                        name="reward"
                                        value={this.state.reward}
                                        placeholder="Wash the dishes" 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="formValue">
                                    <Form.Label>Enter a points value:</Form.Label>
                                    <Form.Control 
                                        type="input"
                                        name="value"
                                        value={this.state.pointsvalue}
                                        placeholder="10" 
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
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
                        {this.state.rewards.length ? (
                            <ListGroup variant="flush">
                                {this.state.rewards.map(reward => (
                                    <ListGroup.Item 
                                        key={reward._id} 
                                        data-id={reward._id} 
                                        className="align-items-center"
                                    >
                                        {reward.rewardDescription} (points: {reward.value}) 
                                        <Button
                                            variant="light"
                                            className="float-right text-danger" 
                                            onClick={this.deleteRewardClick}
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

Rewards.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Rewards);