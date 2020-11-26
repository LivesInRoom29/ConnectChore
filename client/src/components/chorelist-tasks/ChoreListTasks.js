// import React, { Component } from "react";
import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

// class ChoreListTask extends Component {


  // tasks array should include completionStatus
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks: []
  //   }

  // }

const ChoreListTasks = (props) => {

  //logged in user
  const { user } = useSelector(state => state.auth);

  // const [ tasks, setTasks ] = React.useState({
  //   tasks: []
  // });

  const { tasks, completionCheckboxChange } = props;

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Task</th>
          <th>Frequency</th>
          <th>Done?</th>
        </tr>
      </thead>
      <tbody>
        {/* if tasks exist map the chosen tasks here. */}
        {tasks.length ?
          tasks.map((task) => {
            const { _id, description, frequency } = task;
            return (
              <tr key={_id}>
                <td>{description}</td>
                <td>{frequency}</td>
                <td>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      label="Check When Done"
                      onChange={completionCheckboxChange}
                      />
                  </Form>
                </td>
              </tr>
            )
          }) : (
            null
          )

        }
      </tbody>
    </Table>
  )
}

  // render() {

  //   return(

  //   )
  // }

// }

export default ChoreListTasks;