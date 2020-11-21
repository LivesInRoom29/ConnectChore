import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Landing.css";


class Landing extends Component {
  render() {
    return (
      <div className="container center-align" style={{ height: "75vh" }}>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Gamify your household chores or to-do list
            </h4>
            <p className="flow-text grey-text text-darken-1">
              because an orderly household is a happy household!
            </p>
            <br />
            <Button variant="info" href="/register">Create Account</Button>
            <br />
            <br />
            <Button variant="outline-info" href="/login">Log In</Button>
            </div>
        </div>
      </div>

    );
  }
}
export default Landing;