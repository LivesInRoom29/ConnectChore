// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Template extends Component {

    constructor(props) {
        super(props)
        // what does your page need to know?
        this.state = {
            householdMember: "Jimmy",
            choreListDate: "",
            choreListID: "",
            tasks: [
                {
                    description: "Laundry",
                    frequency: ""
                }
            ]
        }
    }

    // functions start here
    
    // when i get input from the user, what will have to change in my state?
    // change handlers:
        // to bring the field values into state so they can be used:
        // this.setState(householdmember, choreListDate)

    // On "submit click":
        // const { user } = this.props.auth;
        // API call to get all chorelists associated with the householdmember and the chorelist date
        // setting state of the page to choreList: res.data


    
    // do a render for all cards to generate the board.
    render() {
        // Bringing in the logged in user!
        const { user } = this.props.auth;
        
        return (
            <p>Hi {user.name}! This is a template page for project components!</p>
        );
    }
}

// REDUX Stuff - to make sure you have access to the logged in user!!
Template.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Template);

// Update "Template" with the name of your component.