// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Bootstrap
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// API Calls
import API from "../../utils/API";
//import Axios from "axios";
// import { Link } from "react-router-dom";

class ChoreView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: null,
            choreLists: [],
            householdMembers: []
        }
    }
    componentDidMount() {

        const { match: { params } } = this.props;

        API.getChoreListWithTasks(params.Id)
            .then(({ data: user }) => {

                this.setState({ user });
            });

        //Make API Req same as before using USER ID => this.props.match.params.userId
        //Filter results down to only have the result with the correct listId => this.props.match.params.listId
        setTimeout(() => {
            this.setState({ item: {} });
        }, 3000)
    }

    render() {
        if (this.state.item === null) return <div>Loading....</div>
        return (
            <div>

                <p>Render Your data</p>
            </div>
        )
    }

}


export default withRouter(ChoreView);

ChoreView.propTypes = {
    auth: PropTypes.object.isRequired
};

