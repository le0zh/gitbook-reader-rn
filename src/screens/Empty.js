import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Empty extends React.PureComponent {
  render() {
    const { icon, title, value } = this.props;

    return <Text>Empty</Text>;
  }
}
