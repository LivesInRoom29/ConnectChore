import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (

      <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo center">ConnectChore</Link>
      </div>
    </nav>
    );
  }
}

export default Navbar;