import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class SubNav extends Component {
  render() {
    return (
  //   <nav>
  //   <div class="nav-wrapper center">
  //     <ul id="nav-mobile" className="brand-logo center">
  //       <li><Link to="/addtasks">Tasks</Link></li>
  //       <li><Link to="/addchorelist">Chores</Link></li>
  //       <li><Link to="/rewards">Rewards</Link></li>
  //       <li><Link to="/game">Game</Link></li>
  //     </ul>
  //   </div>
  // </nav>

  <nav id="subnav">
  <div className="nav-content brand-logo center">
    <ul className="tabs tabs-transparent">
      <li className="tab"><Link to="/addtasks">Tasks</Link></li>
      <li className="tab"><Link to="/addchorelist">Chores</Link></li>
      <li className="tab"><Link to="/rewards">Rewards</Link></li>
      <li className="tab"><Link to="/game">Game</Link></li>
    </ul>
  </div>
</nav>
    );
  }
}

export default SubNav;