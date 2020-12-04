// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTasksAction } from "../../actions/chorelistActions";
import ChoreListOptions from "../chorelist-options/ChoreListOptions";
import DropdownGroup from "../dropdown-group/DropdownGroup";
import AddChorelist from "../add-chorelist/AddChorelist";
import SubNav from "../layout/SubNav";
// Bootstrap components
import { Container } from "react-bootstrap";
// Date picker
import formatISO from 'date-fns/formatISO';
import "react-datepicker/dist/react-datepicker.css";
// API calls
import API from "../../utils/API";
import filterDeleted from "../../utils/filterDeleted";
// Local CSS
import "../../App.css";
import "./choreList.css";

class ChoreList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listOption: "",
            assignedto: "",
            startDate: new Date(),
            reward: "",
            choreLists: [],
            householdMembers: [],
            allRewards: [],
            undeletedRewards: [],
            choreListToEdit: "",
            choreListData: {},
            validateDisplay: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // get rewards data from the DB
    // TEST-pass: will passing in user.id to the API call successfully get us the rewards for the logged in user only?
    componentDidMount() {
        const { user } = this.props.auth

        this.setState(
            {
                listOption: ""
            }
        );

        var promise = new Promise((resolve, reject) => {
            API.getRewardDescriptions(user.id)
                .then(res => resolve(res))
                .catch(err => reject(Error("API failed")));
        })

        promise.then(result => {
            // filter the deleted rewards out of the data to store in state
            const undeletedRewards = filterDeleted(result.data);
            const firstReward = undeletedRewards[0] ? undeletedRewards[0]._id : "";

            // set the rewards state to be the undeletedRewards and
            // the reward state to be the id for the first reward in that array
            this.setState(
                {
                    allRewards: result.data,
                    undeletedRewards: undeletedRewards,
                    reward: firstReward
                }
            )
        });

        var promisetwo = new Promise((resolve, reject) => {
            API.getHouseholdMembers(user.id)
                .then(res => {
                    resolve(res)
                })
                .catch(err => reject(Error("API failed")));
        })

        promisetwo.then(result => {
            // filter the deleted household members out of the data to store in state
            const undeletedHMs = filterDeleted(result.data);
            const firstHouseholdMember = undeletedHMs[0] ? undeletedHMs[0]._id : "";

            // set the householdMembers state to be the undeletedHMs and
            // the assignedto state to be the first household member in that array
            this.setState(
                {
                    householdMembers: undeletedHMs,
                    assignedto: firstHouseholdMember
                },
                () => {
                    console.log("householdmember state: ", this.state.householdMembers);
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


    handleDateChange = event => {
        this.setState(
            {
                startDate: event
            }
        );
    };

    // in the AddChoreList component
    // this function is called when the Add Chorelist Button is clicked.
    // adds the new chorelist to the db and the _id to state
    addChoreListClick = (e) => {
        e.preventDefault();

        this.props.setTasks([]);

        let mainDate = formatISO(new Date(this.state.startDate));
        // let mainDate = format(this.state.startDate, "MM/dd/yyyy");
        const { user } = this.props.auth;
        const { assignedto, reward } = this.state;

        API.addChoreList(
            {
                completedBy: assignedto,
                date: mainDate,
                reward: reward,
                userId: user.id
            }
        ).then(res => {
            this.setState({ choreListToEdit: res.data._id });
        })
            .catch(err => console.log(err));
    };

    // when page loads, this will return null as this.state.listOption will be ""
    // depending on which button is clicked, it will either render the components to
    // create a new task or view existing tasks
    renderChoreListOption = () => {
        if (this.state.listOption === "create") {
            return (
                <AddChorelist
                    assignedto={this.state.assignedto}
                    startDate={this.state.startDate}
                    householdMembers={this.state.householdMembers}
                    reward={this.state.reward}
                    allRewards={this.state.allRewards}
                    undeletedRewards={this.state.undeletedRewards}
                    choreListToEdit={this.state.choreListToEdit}
                    handleChange={this.handleChange}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    addChoreListClick={this.addChoreListClick}
                />
            )
        } else if (this.state.listOption === "view") {
            return (
                <DropdownGroup
                    allRewards={this.state.allRewards}
                />
            )
        } else {
            return null
        }
    }

    render() {

        return (
            <>
            <SubNav />
                <Container>
                    <br />
                    <br />
                    <br />
                    <ChoreListOptions
                        handleInputChange={this.handleInputChange}
                        option={this.state.listOption}
                    />
                </Container>
                <Container>
                    {this.renderChoreListOption()}
                    <br />
                    <br />
                    <br />
                </Container>
            </>
        );
    }
}

ChoreList.propTypes = {
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
)(ChoreList);
