import React from 'react';
import { Button } from 'react-native';


export default class AddPeopleAndTasks extends React.Component {

  render() {
    return (
        <Button
            title="add"
            onPress={() =>
            this.props.add.tasks('Chores')
            }
        />
    );
  }
}