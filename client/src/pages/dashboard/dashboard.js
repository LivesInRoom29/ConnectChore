// Need for React and Redux
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import RewardsForm from "../../components/rewards/RewardsForm";
import Sidebar from "../../components/sidebar/Sidebar";
//import "../../components/sidebar/sidebar.css";

import Button from 'react-bootstrap/Button'

// Bootstrap components
import { Container, Row, Col } from "react-bootstrap";

//import ListGroup from "react-bootstrap/ListGroup";

const Dashboard = (props) => {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <Navbar /> */}

      <div className="mb-2">
    <Button variant="primary" size="lg">
      Create a Member
    </Button>{' '}
    <Button variant="primary" size="lg">
      Create a Chore List
    </Button>{' '}
    <Button variant="primary" size="lg">
      Play ConnectChore
    </Button>{' '}
    
  </div>
      {/* <Container fluid>
      
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            
          </Col>
          <Col xs={10} id="page-content-wrapper">
            this is a test
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container> */}
    </>
  );
};

export default Dashboard;
