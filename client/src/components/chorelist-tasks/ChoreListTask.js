createdimport React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

class ChoreListTask extends Component {

  // tasks array should include completionStatus
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.handle
  }




  render() {

    return(
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Task</th>
            <th>Frequency</th>
            <th>Done?</th>
          </tr>
        </thead>
        <tbody>
          {/* map the chosen tasks here. */}
          {
            this.state.tasks.map((task) => {
              const { _id, description, frequency } = task;
              return (
                <tr key={_id}>
                  <td>{description}</td>
                  <td>{frequency}</td>
                  <td>
                    <Form>
                      <Form.Check type="checkbox" label="Check When Done" />
                    </Form>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }


}

export default ChoreListTask;