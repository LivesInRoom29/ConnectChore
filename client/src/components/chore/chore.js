import React from "react";
import { postChore } from "../actions/authActions"
import { connect } from "react-redux";


export class addChores extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choreName: "",
      pointValue: 1,
      timesPerWeek: 1,
      validateDisplay: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInput(event, key) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.choreName.trim() === "") {
      this.showValidator()
    } else {
      this.props.dispatch(postChore(this.state));
      this.props.toggleForm()
      this.setState = {
        choreName: "",
        pointValue: 1,
        timesPerWeek: 1
      }
    }
  }
  showValidator() {
    this.setState({
      validateDisplay: !this.state.validateDisplay
    })
  }
  render() {
    let inputRequired;
    if (this.state.validateDisplay) {
      inputRequired = <div >Required</div>
    }
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          {inputRequired}
          <input
            name="choreName"
            type="text"
            ref={input => (this.textInput = input)}
            placeholder="Chore Title"
            // className={styles.choreTitle}
            value={this.state.value}
            onChange={e => this.handleInput(e, "choreName")}
            maxLength="25"
          />
          <div 
          // className={styles.pointContain}
          >
            <select
              name="pointValue"
              // className={styles.pointField}
              onChange={e => this.handleInput(e, "pointValue")}
              >
              <option value="1">Point Value</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <select
              name="timesPerWeek"
              onChange={e => this.handleInput(e, "timesPerWeek")}
              >
              <option value="1">Times Per Week</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div>
            <button type="submit">
              Save
            </button>
            <button
              onClick={() => {
                this.props.toggleForm();
              }}
            >
              Cancel
            </button>
          </div>
        </form>    
      </div>
    );
  }
}
export default connect(null)(addChores);