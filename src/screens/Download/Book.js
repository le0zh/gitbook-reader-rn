import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import moment from 'moment';
import Interactable from 'react-native-interactable';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import ImageWithPlaceHolder from '../../components/ImageWithPlaceHolder';
import RowWithActions from '../../components/RowWithActions';

export default class NewsCard extends React.PureComponent {
  _showSize = size => {
    if (size > 1000) {
      const inKb = size / 1000;

      if (inKb > 1000) {
        const inMb = inKb / 1000;
        return `${inMb.toFixed(2)} MB`;
      }

      return `${inKb.toFixed(2)} kB`;
    }

    return `${size} bytes`;
  };

  render() {
    return (
      <RowWithActions height={px2dp(380)} onTrash={this.props.remove}>
        <TouchableHighlight onPress={this.props.onPress}>
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
                size: {this._showSize(this.props.size)}
              </Text>

              <Text>Downloaded at {moment(this.props.downloadAt).fromNow()}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </RowWithActions>
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
});
