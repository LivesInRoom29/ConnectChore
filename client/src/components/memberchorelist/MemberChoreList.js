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
import { Accordion } from "react-bootstrap";
// API calls
import API from "../../utils/API";
// Date formatting
import { format } from "date-fns";
import SubNav from "../layout/SubNav";
// import { Link } from "react-router-dom";
import { setTasksAction } from "../../actions/chorelistActions";
import ChoreListTasks from "../chorelist-tasks/ChoreListTasks";
// API calls

//import filterDeleted from "../../utils/filterDeleted";

import "../chorelist-tasks/choreListTasks.css"

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
            filteredChoreLists: [],
            auth: {}
        }
        this.onClickFilter = this.onClickFilter.bind(this);
    }

    // get household members from the DB
    // TEST: will be passing the user.id and the choreList.id to the API call to successfully get us the chorelists data
    componentDidMount() {
        const { user } = this.props.auth;
        //const { choreList } = this.state;

        const promise = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        });

        promise.then(res => {
            const firstHouseholdMemberId = res.data[0] ? res.data[0]._id : "";
            this.setState(
                {
                    householdMemberId: firstHouseholdMemberId,
                    householdMembers: res.data
                }
            )
        });

        const promisetwo = new Promise((resolve, reject) => {
            const { user } = this.props.auth;
            API.getChoreLists(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(res => {
            this.setState(
                {
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

        const filteredLists = this.state.choreLists.filter(list => list.completedBy === this.state.householdMemberId);

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
            <SubNav />
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
                                    {this.state.filteredChoreLists.map((displayList, index) => (
                                        <div key={displayList._id}>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={index} >
                                                <ListGroup.Item
                                                    data-id={displayList._id}
                                                    className="align-items-center"
                                                >
                                                    {format(new Date(displayList.date), "MM/dd/yyyy")}
                                                </ListGroup.Item>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={index}>
                                                <div>
                                                    <ChoreListTasks
                                                        choreListToEdit={displayList._id}
                                                    />
                                                </div>
                                            </Accordion.Collapse>
                                        </div>
                                    ))}
                                </ListGroup>
                            ) : (
                                    <h3>No chore list to display</h3>
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
    auth: state.auth,
    tasks: state.chorelist.tasks
});

const mapDispatchToProps = (dispatch, props) => (
    {
        setTasks: (tasksArray) => dispatch(setTasksAction(tasksArray))
    }
)

export default connect(
    mapStateToProps
)(MemberChoreList);


//display chorelist for a given household member

//let users click on a household member that will display the chorelists for each one respectively
//the user chooses householdmember and the choreslist related to that member will be displayed on screen

//they should be able to view it.
//dropdown list for the household members
