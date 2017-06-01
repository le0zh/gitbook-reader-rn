import React from 'react';
import { Image, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';

// "_id": "58d24805421aa90f033451c1",
// "createdAt": "2017-03-22T17:46:45.109Z",
// "desc": "一份小组协同开发可以使用的Android代码规范",
// "images": [
// "http://img.gank.io/15e2d305-1742-4129-8dce-146666494993"
// ],
// "publishedAt": "2017-03-24T12:12:34.753Z",
// "source": "web",
// "type": "Android",
// "url": "https://github.com/LoranWong/Android-Code-Style/blob/master/README.md",
// "used": true,
// "who": "黄灰红"

import { px2dp, SCREEN_WIDTH } from '../../utils';

var zh = require('moment/locale/zh-cn');
moment.updateLocale('zh-cn', zh);

export default class NewsCard extends React.PureComponent {
  getImageSource = () => {
    if (this.props.images && this.props.images.length > 0) {
      return { uri: this.props.images[0] };
    }

    // todo: 根据标题中的关键字返回一些默认图片
    return require('../../img/react-native.png');
  };

  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={styles.row}>
          <View style={styles.authorWrapper}>
            <Text style={styles.author}>{this.props.who}</Text>
            <Text style={styles.time}>{moment(this.props.publishedAt).fromNow()}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{this.props.desc}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: px2dp(120 + 300),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },

  authorWrapper: {
    height: px2dp(120),
    width: SCREEN_WIDTH,
    paddingLeft: px2dp(50),
    paddingRight: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  author: {
    fontSize: px2dp(38),
    color: '#03a665',
  },

  time: {
    fontSize: px2dp(38),
    color: '#8e8e8e',
  },

  titleWrapper: {
    height: px2dp(300),
    width: SCREEN_WIDTH,
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
    paddingLeft: px2dp(50),
    paddingRight: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  title: {
    fontSize: px2dp(46),
    fontWeight: 'bold',
  },
});
