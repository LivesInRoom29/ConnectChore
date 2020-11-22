// import React, { Component } from "react";
import React from "react";

// class TaskDDTemp extends Component {
//   render() {

const TaskDDTemp = (props) => {
  return (
    <>
      <h3>Add tasks to your chorelist</h3>
      <p>Task Dropdown Goes Here</p>
      <button
        data-id="5fb94583dfefd62d9cf760cf"
        onClick={props.addTaskClick}
      >
        Add example task
      </button>
      <p></p>
      {/* take just to add space for now */}
    </>
  )
}

export default TaskDDTemp;