import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Navbar.css";
import Logo from "../layout/connectchore.png";

class SubNav extends Component {
  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (

      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="navbar-brand"><Link to="/dashboard" className="brand-logo center"><img src={Logo} alt="Connect Chore Logo" /></Link></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <div className="nav-link design"><Link to="/tasks" id="navdesign">Tasks</Link></div>
            <div className="nav-link"><Link to="/chorelist" id="navdesign">Chores</Link></div>
            <div className="nav-link"><Link to="/rewards" id="navdesign">Rewards</Link></div>
            <div className="nav-link"><Link to="/game" id="navdesign">Game</Link></div>
            <div className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user"></i>
              </div>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <div className="dropdown-item"><Link to="/dashboard" id="navdesigndd">Dashboard</Link></div>
                <div className="dropdown-item"><Link to="/householdmembers" id="navdesigndd">Manage Family</Link></div>
                <div className="dropdown-item" id="navdesigndd" onClick={this.onLogoutClick}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

    );
  }
}


SubNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SubNav);