import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#fff" };
  }

  render() {
    return (
      <div style={{ background: this.state.color }} id="main">
        <div style={{ height: "90vh" }} className="landing-container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col s12 center-align">
              <h1>
                <b>Chores just got a lot more fun!</b>
              </h1>
              <br />
              <h5>
                Simply create a list of household chores and assign tasks to family members. Add rewards for checking items off the to-do list and battle it out with a game of Connect Four!
            </h5>
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "30px",
                    padding: "14px",
                    backgroundColor: "#42b984",
                    color: "white",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >Sign Up</Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "30px",
                    padding: "14px",
                    backgroundColor: "#ffffff",
                    color: "#42b984",
                    border: "2px solid",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-brown waves-ripple hoverable accent-3"
                >
                  Log In
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Landing;