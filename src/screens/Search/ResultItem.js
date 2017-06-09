import React from 'react';
import { Image, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import moment from 'moment';

import { px2dp, SCREEN_WIDTH } from '../../utils';

export default class ResultItem extends React.PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={styles.row}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.desc} numberOfLines={2}>{this.props.desc}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: px2dp(250),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    width: SCREEN_WIDTH,
  },

  title: {
    fontSize: px2dp(46),
    color: '#000',
  },

  desc: {
    fontSize: px2dp(34),
  },
});
