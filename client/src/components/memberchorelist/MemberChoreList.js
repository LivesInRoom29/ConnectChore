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
import API from "../../utils/API";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import ChoreListTasks from "../chorelist-tasks/ChoreListTasks";
// API calls
//import filterDeleted from "../../utils/filterDeleted";
//import API from "../../utils/API";

class MemberChoreList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            assignedto: "",
            householdMemberId: "",
            householdMembers: [],
            choreLists: [],
            choreListDate: "",
            choreListData: {},
            filteredChoreLists: []
        }
        this.onClickFilter = this.onClickFilter.bind(this);
    }

    // get household members from the DB
    // TEST: will be passing the user.id and the choreList.id to the API call to successfully get us the chorelists data
    componentDidMount() {
        const { user, choreList } = this.props.auth;
        //const { choreList } = this.state;

        var promise = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(res => {
            this.setState(
                {
                    householdMemberId: res.data[0]._id,
                    householdMembers: res.data
                }
            )
        })

        var promisetwo = new Promise((resolve, reject) => {
            API.getChoreLists(user.id)
                //console.log(choreList.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(res => {
            //console.log(res);
            this.setState(
                {
                    //choreListId: res.data[0]._id,
                    choreLists: res.data
                }
            )
        })

    }

    // //get input chorelist data and add state
    // getChoreListClick = e => {
    //     // leaving commented out to refresh the whole page for now
    //     e.preventDefault();

    //     console.log("click");
    // };

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();

        this.setState(
            {
                [event.target.name]: event.target.value
                // household member id
                // don't include ...this.state so the value changes when the drop-down changes 
            }
        );
    };

    onClickFilter = (event) => {
        event.preventDefault();
        console.log(this.state.householdMemberId);
        console.log(this.state.choreLists);
        const filteredLists = this.state.choreLists.filter(list => list.completedBy === this.state.householdMemberId);
        console.log(filteredLists);
        this.setState(
            {
                filteredChoreLists: filteredLists
            }
        )
    }

    render() {

        const { user } = this.props.auth;

        return (

            //make chorelist here for each given householdmember, maybe a table?
            // or maybe a list most likely
            <>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}
                                <p className="text-body">
                                    Pick a household member to display chorelist.
                                </p>
                            </h4>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="formHouseholdMember">
                                    <Form.Label>Pick someone:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="householdMemberId"
                                        value={this.state.householdMemberId}
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
                            {/* button to display lists for each houesholdmember*/}
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={this.onClickFilter}
                            >
                                Generate Chorelist
                            </Button>

                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h4>Display Chorelist for a given householdmember down here</h4>
                        <Accordion>
                            {/* Eventually filter down to non-deleted and map that array */}
                            {this.state.filteredChoreLists.length ? (
                                <ListGroup variant="flush">
                                    {this.state.filteredChoreLists.map((displayList,index) => (
                                        <>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={index} >
                                            <ListGroup.Item
                                                key={displayList._id}
                                                data-id={displayList._id}
                                                className="align-items-center"
                                                >
                                            {/* <Link to={`chores/${this.state.householdMemberId}/${displayList._id}`}> */}
                                                {format(new Date(displayList.date), "MM/dd/yyyy")}
                                            {/* </Link> */}
                                            </ListGroup.Item>
                                            
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey={index}>
                                            <ChoreListTasks
                                                choreListToEdit={displayList._id}
                                                />
                                        
                                        </Accordion.Collapse>

                                            {/* <Button
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
                                            </Button> */}
                                    ))}
                                </ListGroup>
                            ) : (
                                    <h3>No choreslist to display</h3>
                                )}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

MemberChoreList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(MemberChoreList);


{/* //display chorelist for a given household member

//let users click on a household member that will display the chorelists for each one respectively
//the user chooses householdmember and the choreslist related to that member will be displayed on screen

//they should be able to view it.
//dropdown list for the household members */}
