import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getDownloadItemsAsync, deleteOneDownloadItem } from '../../data/dataBase';
import Feeds from '../../components/Feeds';
import Book from './Book';
import { px2dp } from '../../utils';

const ITEM_HEIGHT = px2dp(380);

export default class Download extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    navBarTitleTextCentered: true,
    statusBarTextColorScheme: 'light',

    // iOS only
    statusBarHideWithNavBar: true,
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'bottomTabSelected') {
      this.feeds.refresh();
    }
  }

  _getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  _readLocal = item => {
    this.props.navigator.push({
      screen: 'app.Reader', // unique ID registered with Navigation.registerScreen
      title: item.title,
      passProps: {
        bookId: item.bookId,
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });
  };

  _deleteOneItem = bookId => {
    this.feeds.removeOne(item => item.bookId === bookId);
    deleteOneDownloadItem(bookId);
  };

  _renderItem = ({ item }) => {
    return (
      <Book
        onPress={() => this._readLocal(item)}
        remove={() => this._deleteOneItem(item.bookId)}
        {...item}
        key={item.bookId}
      />
    );
  };

  render() {
    return (
      <Feeds
        ref={view => (this.feeds = view)}
        getItemLayout={this._getItemLayout}
        navigator={this.props.navigator}
        renderItem={this._renderItem}
        fetchData={getDownloadItemsAsync}
        keyExtractor={item => item.bookId}
      />
    );
  }
}
