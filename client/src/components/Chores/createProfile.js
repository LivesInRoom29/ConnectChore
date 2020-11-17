import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export class Create_Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Make a Profile</Text>
        <TextInput
          style={styles.text_field}
          placeholder="Name"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={styles.text_field}
          placeholder="Email"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={styles.text_field}
          placeholder="Password"
          onChangeText={(text) => this.setState({text})}
        />
      </View>
    );
  }
}



export default Create_Profile
