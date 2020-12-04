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
import API from "../../utils/API";
import { setTasksAction } from "../../actions/chorelistActions";
// Components
import DropdownMembers from "./DropdownMembers";
import DropdownChorelists from "./DropdownChorelists";
import ChoreListTasks from "../chorelist-tasks/ChoreListTasks";
import TaskDropDown from "../taskdropdown/TaskDropDown";

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
            //filteredChoreLists: [],
            showTasks: false
        }
        this.onClickShowChorelist = this.onClickShowChorelist.bind(this);
    }

    // get household members from the DB
    // TEST: will be passing the user.id and the choreList.id to the API call to successfully get us the chorelists data
    componentDidMount() {
        const { user } = this.props.auth;

        var promisetwo = new Promise((resolve, reject) => {
            API.getChoreLists(user.id)
                //console.log(choreList.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(res => {
            //console.log(res);
            const allChoreLists = res.data;
            const filteredLists = allChoreLists.filter(list => list.completedBy === this.state.householdMemberId);
            const firstChoreList = filteredLists[0] ? filteredLists[0]._id : ""
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

        const { user } = this.props.auth;

        // if showTasks is true, render the TaskDropDown menu and the ChoreListTasks
        // otherwise render "Choose a Chorelist"
        const chorelistEditor = this.state.showTasks ? (
            <>
                <br />
                <h4>View or Edit Choreslist</h4>
                <p>Add new tasks, mark them as complete or delete them from the list.</p>
                <TaskDropDown
                    choreListToEdit={this.state.choreListToEdit}
                />
                <br />
                <ChoreListTasks
                    choreListToEdit={this.state.choreListToEdit}
                />
            </>
        ) : (
                <>
                    <h2>Choose a Chorelist</h2>
                    {/* <h3>No chorelists to display!</h3> */}
                </>
            )


        return (
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
                                    <DropdownMembers
                                        handleInputChange={this.handleInputChange}
                                        householdMemberId={this.props.assignedTo}
                                        householdMembers={this.props.householdMembers}
                                    />
                                    <DropdownChorelists
                                        handleInputChange={this.handleInputChange}
                                        householdMemberId={this.state.householdMemberId}
                                        choreListToEdit={this.state.choreListToEdit}
                                        choreLists={this.state.choreLists}
                                        rewards={this.props.undeletedRewards}
                                    />

                                </Form.Row>
                                {/* button to display lists for each houesholdmember*/}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    data-id={this.state.choreListToEdit}
                                    onClick={this.onClickShowChorelist}
                                >
                                    Generate Chorelist
                            </Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    {chorelistEditor}
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
