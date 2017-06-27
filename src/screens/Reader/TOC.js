import React from 'react';
import { View, Text, StyleSheet, WebView, ScrollView, TouchableHighlight, BackAndroid } from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';

import { saveReadProgress } from '../../data/dataBase';
import { px2dp } from '../../utils';

export default class TOC extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: false,
    navBarHidden: false,
    statusBarColor: '#3F51B5',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedUrl: props.initSelectedSrc,
    };
  }

  _onNavItemPress = src => {
    this.setState({
      selectedUrl: src,
    });

    this.props.onNavPress && this.props.onNavPress(src);
  };

  _renderLevels = (item, level) => {
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

    const isSelected = this.state.selectedUrl === item.content._src;
    let textColor = '#000';

    if (isSelected) {
      textColor = '#3F51B5';
    } else if (level > 0) {
      textColor = '#000000B3';
    }

    return (
      <TouchableHighlight key={item._id} onPress={() => this._onNavItemPress(item.content._src)}>
        <View>
          <View style={styles.tocItem}>
            <Text style={[styles.title1, { color: textColor, marginLeft: 30 * level }]}>
              {item.navLabel.text}
            </Text>
          </View>
          {subItems}
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={this.props.style} pointerEvents="box-none">
        <ScrollView>
          {this.props.toc.map(item => {
            return this._renderLevels(item, 0);
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tocItem: {
    height: px2dp(140),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#0000004D',
    backgroundColor: '#eee',
  },

  title1: {
    color: '#000',
    fontSize: px2dp(40),
  },
});
