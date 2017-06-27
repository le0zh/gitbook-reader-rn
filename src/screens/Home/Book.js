import React from 'react';
import { Image, View, Text, StyleSheet, TouchableNativeFeedback, TouchableHighlight, Platform } from 'react-native';
import moment from 'moment';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import ImageWithPlaceHolder from '../../components/ImageWithPlaceHolder';

// var zh = require('moment/locale/zh-cn');
// moment.updateLocale('zh-cn', zh);
// <View style={styles.label}><Text>{this.props.language}</Text></View>

export default class NewsCard extends React.PureComponent {
  renderContent = () => {
    return (
      <View style={styles.row}>
        <View style={styles.cover}>
          <ImageWithPlaceHolder
            style={styles.coverImage}
            placeHolderSource={require('../../img/default-cover.png')}
            source={{ uri: `http://www.gitbook.com${this.props.cover.small}` }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>

          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.desc}>
            {this.props.description === '' ? 'No description for now' : this.props.description}
          </Text>

          <Text>Last updated {moment(this.props.dates.build).fromNow()}</Text>

          <View style={styles.infoWrapper}>
            <View style={styles.label}>
              <Text>★ {this.props.counts.stars}</Text>
            </View>
            <View style={styles.label}><Text>{this.props.language}</Text></View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight onPress={this.props.onPress}>
          {this.renderContent()}
        </TouchableHighlight>
      );
    } else if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={this.props.onPress}>
          {this.renderContent()}
        </TouchableNativeFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  row: {
    height: px2dp(380),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },

  cover: {
    width: px2dp(200),
    height: px2dp(380),
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverImage: {
    width: px2dp(200),
    height: px2dp(262),
    borderWidth: 2,
    borderColor: '#eee',
    elevation: 5,
  },

  content: {
    flex: 1,
    height: px2dp(262),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 18,
    color: '#000',
  },

  desc: {
    fontSize: 16,
  },

  time: {
    fontSize: 16,
    color: '#8e8e8e',
  },

  infoWrapper: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    flexDirection: 'row',
  },

  label: {
    height: px2dp(50),
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    backgroundColor: '#fff',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
