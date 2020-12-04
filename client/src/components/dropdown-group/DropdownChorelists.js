// Need for React and Redux
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import parseISO from 'date-fns/parseISO';
import { format } from "date-fns";
// import API from "../../utils/API";
// Bootstrap components
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class DropdownChorelists extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chorelistWithRewards: [],

    }
  }

  // In development: get the chorelists for the user populated with rewards data.
  // this is just sample code right now.
  // componentDidMount() {
  //   const { user } = this.props.auth;
  //   console.log("chorelists: ", this.props.choreLists);

  //   var promise = new Promise((resolve, reject) => {
  //     API.getHouseholdMembers(user.id)
  //       .then(res => resolve(res))
  //       .catch(err => reject(Error("API failed")));
  //   })

  //   promise.then(res => {
  //     const firstHouseholdMemberId = res.data[0] ? res.data[0]._id : "";
  //     this.setState(
  //       {
  //         householdMemberId: firstHouseholdMemberId,
  //         householdMembers: res.data
  //       }
  //     )
  //   })
  // }

  // renderRewards = (id) => {
  //   const rewards = this.props.allRewards;
  // }

  render() {
    const filteredChoreList = this.props.choreLists.filter(list => list.completedBy === this.props.householdMemberId);
    console.log("render chorelist:", this.props.choreLists);
    console.log("filtered chorelist: ", filteredChoreList);
    console.log("member id:", this.props.householdMemberId);
    return (
      <Form.Group as={Col} md="6" controlId="formChorelists">
        <Form.Label>Pick a chorelist:</Form.Label>
        <Form.Control
          as="select"
          name="choreListToEdit"
          value={this.props.choreListToEdit}
          onChange={this.props.handleInputChange}
        >
          {/* Map the chorelists to the drop-down */}
          {
            filteredChoreList.map(list => {
              return (
                <option
                  key={list._id}
                  value={list._id}
                >
                  {format(parseISO(list.date), "MM/dd/yyyy")}
                </option>
              )
            })
          }
        </Form.Control>
      </Form.Group>
    )
  }
}

// DropdownChorelists.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect(
//   mapStateToProps,
// )(DropdownChorelists);

export default DropdownChorelists;
