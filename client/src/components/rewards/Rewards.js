import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../../utils/API";

class Rewards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reward: "",
            value: "",
            rewards: [],
            auth: {}
        }
    }

    // get rewards data from the DB
    // HOW do we use the specific logged in user in-state so that we only get that users rewards from this API call?
    componentDidMount() {
        API.getRewardDescriptions(this.props.auth.user.id)
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
                value: this.state.value,
                userId: this.auth.user.id
            }
        ).then( res => console.log(res))
        .catch(err => console.log(err));
            
    };

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
                                <Form.Group as={Col} md="3" controlId="formValue">
                                    <Form.Label>Enter a value:</Form.Label>
                                    <Form.Control 
                                        type="input"
                                        name="value"
                                        value={this.state.value}
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
                    <Col>
                        <h2>Household Rewards</h2>
                        A list of the rewards will dynamically render here once the API call is built.
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