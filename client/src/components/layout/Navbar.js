import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../layout/connectchore.png";

class Navbar extends Component {
  render() {
    return (
      <nav>
      <div className="nav-wrapper">
        <Link to="/dashboard" className="brand-logo center"><img src={ Logo }/></Link>
      </div>
    </nav>
    );
  }
}

export default Navbar;