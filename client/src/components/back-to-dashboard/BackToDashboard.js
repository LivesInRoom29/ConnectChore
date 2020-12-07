import React, { Component } from "react";
import { Link } from "react-router-dom";

class BackToDashboard extends Component {

    render() {
        return (
            <>
                <Link to="/dashboard" className="btn button-hover text-dark">
                <i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
            </>
        );
    }
}

export default BackToDashboard;
