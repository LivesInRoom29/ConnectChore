// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-scroll";
import { setTasksAction } from "../../actions/chorelistActions";
import DropdownMembers from "./DropdownMembers";
import DropdownChorelists from "./DropdownChorelists";
import ChoreListTasks from "../chorelist-tasks/ChoreListTasks";
import TaskDropDown from "../taskdropdown/TaskDropDown";
import filterDeleted from "../../utils/filterDeleted";
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// API Calls
import API from "../../utils/API";

import "../chorelist-tasks/choreListTasks.css"

class DropdownGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            householdMemberId: "",
            householdMembers: [],
            choreLists: [],
            choreListDate: "",
            choreListData: {},
            choreListToEdit: "",
            showTasks: false
        }
        this.onClickShowChorelist = this.onClickShowChorelist.bind(this);
    }

    // get household members from the DB
    // TEST: will be passing the user.id and the choreList.id to the API call to successfully get us the chorelists data
    componentDidMount() {
        const { user } = this.props.auth;

        var promise = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(result => {
            // filter the deleted household members out of the data to store in state
            const undeletedHMs = filterDeleted(result.data);
            const firstHouseholdMember = undeletedHMs[0] ? undeletedHMs[0]._id : "";

            // set the householdMembers state to be the undeletedHMs and
            // the householdMemberId state to be the first household member in that array
            this.setState(
                {
                    householdMembers: undeletedHMs,
                    householdMemberId: firstHouseholdMember
                }
            )

        });

        // Get all the chorelists for the user populated with the rewards
        var promisetwo = new Promise((resolve, reject) => {
            API.getChoreListsWithRewards(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(res => {
            const allChoreLists = res.data;
            const filteredLists = allChoreLists.filter(list => list.completedBy === this.state.householdMemberId);
            const firstChoreList = filteredLists[0] ? filteredLists[0]._id : "";
            // Set state for chorelists as the chorelists populated with the rewards
            // set the chorelist to edit to be the first chorelist in the array
            this.setState(
                {
                    choreLists: res.data,
                    choreListToEdit: firstChoreList
                }
            )
        })

    }

    // get the input values and add to state
    handleInputChange = event => {
        event.preventDefault();
        this.setState(
            {
                [event.target.name]: event.target.value,
                showTasks: false
                // don't include ...this.state so the value changes when the drop-down changes
            }
        );

    };

    onClickShowChorelist = async (event) => {
        event.preventDefault();
        //use the chorelist ID to get an array with all of the tasks
        try {
            const ListWithTasks = await API.getChoreListWithTasks(this.state.choreListToEdit);
            this.props.setTasks(ListWithTasks.data.tasks);
        } catch (err) {
            console.log(err);
        }
        // change state for showTasks to true so that the chorelist tasks will display
        this.setState(
            {
                showTasks: true
            }
        )
    }

    render() {

        //const { user } = this.props.auth;

        // if showTasks is true, render the TaskDropDown menu and the ChoreListTasks
        // otherwise render "Choose a Chorelist"
        const chorelistEditor = this.state.showTasks ? (
            <div name="taskList">
                <br />
                <h4>View or Edit Chore List</h4>
                <p>Add new tasks, mark them as complete, or delete them from the list.</p>
                <TaskDropDown
                    choreListToEdit={this.state.choreListToEdit}
                />
                <br />
                <ChoreListTasks
                    choreListToEdit={this.state.choreListToEdit}
                />
            </div>
        ) : (
                <>
                    <h2>Choose a Chore List</h2>
                    {/* <h3>No chorelists to display!</h3> */}
                </>
            )

        // if showTasks is true, render the button for users to jump to task list
        // otherwise return null
        const showJumpToTaskBtn = this.state.showTasks ? (
            <Button className="btn btn-lg button-hover"
                style={{
                    width: "250px",
                    height: "50px",
                    fontSize: "15px",
                    textTransform: "uppercase",
                    borderRadius: "30px",
                    border: "none",
                    padding: "12px",
                    backgroundColor: "#42b984",
                    color: "white",
                    letterSpacing: "1.5px",
                    marginLeft: "25px"
                }}
            >
                <Link
                    // className="jump-to-tasks"
                    activeClass="active"
                    to="taskList"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                >
                    Jump to Task List
                </Link>
            </Button>
        ) : (
            null
        )

        return (
            <>
                <Container>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <Form>
                                <h4>
                                    <p className="text-body">
                                        Pick a household member to display a chore list.
                                </p>
                                </h4>
                                <br />
                                <Form.Row>
                                    <DropdownMembers
                                        handleInputChange={this.handleInputChange}
                                        householdMemberId={this.state.householdMemberId}
                                        householdMembers={this.state.householdMembers}
                                    />
                                    <DropdownChorelists
                                        handleInputChange={this.handleInputChange}
                                        householdMemberId={this.state.householdMemberId}
                                        choreListToEdit={this.state.choreListToEdit}
                                        choreLists={this.state.choreLists}
                                        rewards={this.props.undeletedRewards}
                                    />

                                </Form.Row>
                                <br />
                                {/* button to display lists for each houesholdmember*/}
                                <Button className="btn btn-lg button-hover"
                                    style={{
                                        width: "250px",
                                        height: "50px",
                                        fontSize: "15px",
                                        textTransform: "uppercase",
                                        borderRadius: "30px",
                                        border: "none",
                                        padding: "12px",
                                        backgroundColor: "#42b984",
                                        color: "white",
                                        letterSpacing: "1.5px"
                                    }}
                                    type="submit"
                                    data-id={this.state.choreListToEdit}
                                    onClick={this.onClickShowChorelist}
                                >
                                    Generate Chorelist
                                </Button>
                                {showJumpToTaskBtn}
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <br />
                    <br />
                    <br />
                    {chorelistEditor}
                    <br />
                    <br />
                    <br />
                </Container>
            </>
        );
    }
}

DropdownGroup.propTypes = {
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
    mapStateToProps,
    mapDispatchToProps
)(DropdownGroup);


//display chorelist for a given household member

//let users click on a household member that will display the chorelists for each one respectively
//the user chooses householdmember and the choreslist related to that member will be displayed on screen

//they should be able to view it.
//dropdown list for the household members
