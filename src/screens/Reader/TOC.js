import React from 'react';
import { View, Text, StyleSheet, WebView, ScrollView } from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';

import { getReadHisotry } from '../../data';
import { px2dp } from '../../utils';

const TESTDIR = '/data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution';

export default class TOC extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: false,
    navBarHidden: false,
    statusBarColor: '#3F51B5',
  };

  _renderLevels = (item, level) => {
    console.log(item.navPoint);
    let subItems = null;

    if (item.navPoint) {
      if (Array.isArray(item.navPoint)) {
        subItems = item.navPoint.map(subItem => {
          return this._renderLevels(subItem, level + 1);
        });
      } else {
        subItems = this._renderLevels(item.navPoint, level + 1);
      }
    }

    return (
      <View key={item._id}>
        <View style={styles.tocItem}>
          <Text style={[styles.title1, { color: level > 0 ? '#000000B3' : '#000', marginLeft: 30 * level }]}>
            {item.navLabel.text}
          </Text>
        </View>
        {subItems}
      </View>
    );
  };

  render() {
    if (this.props.toc.length === 0) {
      return null;
    }

    return (
      <ScrollView>
        {this.props.toc.map(item => {
          return this._renderLevels(item, 0);
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tocItem: {
    height: px2dp(160),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },

  title1: {
    color: '#000',
    fontSize: px2dp(40),
  },
});
