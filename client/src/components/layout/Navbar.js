import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../layout/connectchore.png";

class Navbar extends Component {
  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-center">
        <div className="navbar-brand"><Link to="/dashboard"><img src={Logo} alt="Connect Chore Logo" /></Link>
        {/* <div className="nav-link"><Link to="/about" id="navdesign">About</Link></div> */}
        </div>
      </nav>
    );
  }
}

export default Navbar;