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
import "../../App.css";
// utils
import filterDeleted from "../../utils/filterDeleted";

class HouseholdMemberForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            householdmember: "",
            householdMembers: [],
            auth: {}
        }
    }

    // get household member data from the DB
    // TEST: will passing in user.id to the API call successfully get us the household members for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        API.getHouseholdMembers(user.id)
            .then(res =>
                //console.log(res)

                this.setState(
                    {
                        householdMembers: res.data
                    }
                ))
            .then(res => {

                //console.log(res)

                const undeletedHouseholdMembers = filterDeleted(res.data)
                
                this.setState(
                { 
                    householdMembers: undeletedHouseholdMembers 
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
                // hhm name
            }
        );
    };

    // TEST: when clicking the ADD HOUSEHOLD MEMBER button, does the HHM successfully get added to householdmember for the logged in user only?
    addHouseholdMemberClick = e => {
        // leaving commented out to refresh the whole page for now
        //e.preventDefault();

        const { user } = this.props.auth;

        const { householdmember } = this.state;

        API.addHouseholdMember(
            {
                name: householdmember,
                userId: user.id
            }
        ).then(res => console.log(res))
            .catch(err => console.log(err));

    };

    // RENDER TEST:
    // Clicking ADD HHM Button adds member as expected to DB for the logged in user only?
    // Clicking the X box successfully removes the hhm entry for the logged in user only?

    render() {

        const { user } = this.props.auth;

        return (
            <Container>
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Col>
                        <Form>
                            <h3>Manage Your Household Members</h3>
                            <p>Once you've added household members, you'll be able to assign tasks and create a chore list for them.</p>
                            <br />
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formHouseholdMember">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type="input"
                                        name="householdmember"
                                        value={this.state.householdmember}
                                        placeholder="Enter a name here"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button className="btn btn-large waves-effect waves-green waves-ripple hoverable"
                                type="submit"
                                onClick={this.addHouseholdMemberClick}>
                                Add Member
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <Row>
                    <Col md={8}>
                        <h3>List of Household Members</h3>
                        {/* Eventually filter down to non-deleted and map that array */}
                        <h2>Household Members</h2>
                        {this.state.householdMembers.length ? (
                            <ListGroup variant="flush">
                                {this.state.householdMembers.map(member => (
                                    <ListGroup.Item
                                        key={member._id}
                                        data-id={member._id}
                                        className="align-items-center"
                                    >
                                        {member.name}
                                        <Button
                                            variant="light"
                                            className="float-right text-danger"
                                            onClick={
                                                () => API.deleteHouseholdMember(
                                                    member._id,
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
                                <h3>No household members to display!</h3>
                            )}
                    </Col>
                </Row>
                <br />
                <br />
                <br />
                <br />
            </Container>
        );
    }
}

HouseholdMemberForm.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(HouseholdMemberForm);