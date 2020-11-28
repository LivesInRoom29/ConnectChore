// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Bootstrap components
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import API from "../../utils/API";
import Axios from "axios";
// import { format } from "date-fns";
// import { Link } from "react-router-dom";
// // API calls
// //components
//import filterChoices from "../../utils/filterChoices";

class ChoreView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: null,
        }
    }
    componentDidMount() {
        console.log(this.props);
        
        const { match: { params } } = this.props;
       
        //var promise = new Promise((resolve, reject) => {
            API.getChoreLists(`/chores/:userId/${params.userId}`)
            .then(({ data: user }) => {
                console.log("user", user);
    
                this.setState(
                    { 
                        user
                    }
                 );
            })

        //})
        //Make API Req same as before using USER ID => this.props.match.params.userId
        //Filter results down to only have the result with the correct listId => this.props.match.params.listId
        setTimeout(() => {
            this.setState({item: {}});
        }, 3000)
    }

    render() {
        if(this.state.item === null) return <div>Loading....</div>
        return(
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

// const mapStateToProps = state => ({
//     auth: state.auth
// });