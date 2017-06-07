import React from 'react';
import { Image, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import ImageWithPlaceHolder from '../../components/ImageWithPlaceHolder';

export default class NewsCard extends React.PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={styles.row}>
          <View style={styles.cover}>
            <ImageWithPlaceHolder
              style={styles.coverImage}
              placeHolderSource={require('../../img/default-cover.png')}
              source={{ uri: `http://www.gitbook.com${this.props.cover}` }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.title}</Text>

            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.desc}>
              size: {this.props.size}kb
            </Text>

            <Text>Downloaded at {moment(this.props.downloadAt).fromNow()}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
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
    fontSize: px2dp(46),
    color: '#000',
  },

  desc: {
    fontSize: px2dp(34),
  },

  time: {
    fontSize: px2dp(38),
    color: '#8e8e8e',
  },
});
