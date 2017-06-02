import React from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import moment from 'moment';
import { Navigation } from 'react-native-navigation';

import { px2dp, SCREEN_WIDTH, getBookCover } from '../../utils';
import ImageWithPlaceHolder from '../../components/ImageWithPlaceHolder';

export default class CoverHeader extends React.PureComponent {
  render() {
    //const cover = '/cover/book/frontendmasters/front-end-handbook.jpg?build=1490223158266';
    const cover = getBookCover();

    return (
      <View style={styles.coverWrapper}>
        <ImageWithPlaceHolder
          style={styles.coverImage}
          placeHolderSource={require('../../img/default-cover.png')}
          source={{ uri: `http://www.gitbook.com${cover}` }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coverWrapper: {
    width: SCREEN_WIDTH,
    height: px2dp(800),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverImage: {
    width: px2dp(474),
    height: px2dp(622),
    borderWidth: 2,
    borderColor: '#eee',
    elevation: 10,
  },
});
