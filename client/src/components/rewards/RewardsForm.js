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
// utils
import filterDeleted from "../../utils/filterDeleted";
// CSS
import "../../App.css";

class Rewards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reward: "",
            pointvalue: "",
            rewards: [],
            auth: {}
        }
    }

    // get rewards data from the DB
    // TEST-pass: will passing in user.id to the API call successfully get us the rewards for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        API.getRewardDescriptions(user.id)
            .then(res => {
                //console.log(res)
                const undeletedRewards = filterDeleted(res.data);

                this.setState(
                    {
                        rewards: undeletedRewards
                    })
                })
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

    // TEST-pass: when clicking the ADD REWARD, does the reward successfully get added to rewarddescription for the logged in user only?
    addRewardClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        const { user } = this.props.auth;
        console.log("user id");
        console.log(user.id);
        console.log("this state reward");
        console.log(this.state.reward);
        console.log("this state pointvalue");
        console.log(this.state.pointvalue);

        const { reward, pointvalue } = this.state;

        API.addRewardDescription(
            {
                description: reward,
                value: pointvalue,
                userId: user.id
            }
        ).then(res => console.log(res))
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
                            <br />
                            <br />
                            <br />
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}!
                                <p className="text-body">
                                <br />
                                    Want to include some motivation to your household's day to day chores? <br />
                                    Add potential rewards for a job well done! <br />
                                    <br />
                                    A few examples could be:
                                </p>
                                <ul>
                                    <li>★pick-a-movie night</li>
                                    <li>★ice cream for breakfast</li>
                                    <li>★buy a new book</li>
                                    <li>★stay up late for 30 extra minutes.</li>
                                </ul>
                                <br />
                                <p>The possibilities are endless.<br />
                                </p>
                            </h4>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formReward">
                                    <Form.Label>Add a reward:</Form.Label>
                                    <Form.Control
                                        type="input"
                                        name="reward"
                                        value={this.state.reward}
                                        placeholder="Ice Cream"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="formValue">
                                    <Form.Label>Include a points value:</Form.Label>
                                    <Form.Control
                                        type="input"
                                        name="pointvalue"
                                        value={this.state.pointvalue}
                                        placeholder="10"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <br />
                            <Button className="btn btn-large waves-effect waves-green waves-ripple hoverable"
                                type="submit"
                                onClick={this.addRewardClick}>Add reward</Button>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col md={8}>
                        <h2>Household Rewards</h2>
                        <p>A list of the recently added rewards for completing chores.</p>
                        {/* Eventually filter down to non-deleted and map that array */}
                        {this.state.rewards.length ? (
                            <ListGroup variant="flush">
                                {this.state.rewards.map(reward => (
                                    <ListGroup.Item
                                        key={reward._id}
                                        data-id={reward._id}
                                        className="align-items-center"
                                    >
                                        {reward.description} (points: {reward.value || 0})
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
                                                    .then(res => {
                                                        console.log(res);
                                                        window.location.reload();
                                                    })
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
                <br />
                <br />
                <br />
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