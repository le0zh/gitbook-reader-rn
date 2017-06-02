import React from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';

import { px2dp, SCREEN_WIDTH } from '../../utils';

export default class BookDetail extends React.PureComponent {
  render() {
    const { icon, title, value } = this.props;

    return (
      <View style={styles.label}>
        <View style={styles.keyWrapper}>
          <Image style={styles.icon} source={icon} />
          <Text style={{ color: '#000' }}>{title}</Text>
        </View>

        <View style={styles.valueWrapper}>
          <Text style={styles.description}>{value}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    height: px2dp(60),
    borderWidth: 1,
    borderColor: '#e8eaed',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
  },

  keyWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7f8',
    paddingLeft: 5,
    paddingRight: 5,
  },

  valueWrapper: {
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },

  icon: {
    height: 16,
    width: 16,
  },
});
