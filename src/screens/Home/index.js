import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';

import { px2dp, SCREEN_WIDTH } from '../../utils';

import Feeds from '../../components/Feeds';
import Book from './Book';

export default class Home extends React.Component {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
  };

  constructor(props) {
    super(props);
  }

  _renderItem = (_renderItem = ({ item }) => <Book key={item.id} {...item} />);

  render() {
    return <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="前端" tabLabel="前端" />;
  }
}

const styles = StyleSheet.create({
  subtitleWrapper: {
    height: px2dp(90),
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

  subtitle: {
    color: '#212121',
    fontSize: px2dp(38),
    fontWeight: 'bold',
  },

  item: {
    padding: 25,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: px2dp(1),
  },

  itemSeparator: {
    height: px2dp(90),
    width: SCREEN_WIDTH,
    backgroundColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },
});
