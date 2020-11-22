import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Col, Card, Icon, CardTitle, Row } from "react-materialize";

class Chores extends Component {
  render() {
    return (
      <div
        style={{
          height: "75px",
        }}
        className="container valign-wrapper"
      >
        <Row>
          <Col m={6} s={12}>
            <Card
              actions={[
                <a key="1" href="#">
                  This is a Link{" "}
                </a>,
              ]}
              closeIcon={<Icon> close </Icon>}
              header={
                <CardTitle image="https://i0.wp.com/www.org4life.com/wp-content/uploads/2016/10/Depositphotos_72499939_m-2015.jpg"></CardTitle>
              }
              revealIcon={<Icon> more_vert </Icon>}
            ></Card>{" "}
          </Col>{" "}
        </Row>{" "}
      </div>
    );
  }
}

export default Chores;
