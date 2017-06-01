import React from 'react';
import { Image, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import { px2dp, SCREEN_WIDTH } from '../../utils';

export default class NewsCard extends React.PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <Image style={styles.image} source={{ uri: this.props.url }} />
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: px2dp(600),
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
});
