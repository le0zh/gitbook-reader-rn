import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getDownloadItemsAsync } from '../../data/dataBase';
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
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {}

  onNavigatorEvent(event) {
    if (event.id == 'bottomTabSelected') {
      // todo: reload data
    }
  }

  _getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  _readLocal = item => {
    console.log('start to read local');
  };

  _renderItem = ({ item }) => {
    console.log(item.bookId);
    return <Book onPress={() => this._readLocal(item)} {...item} key={item.bookId} />;
  };

  render() {
    return (
      <Feeds
        key="download"
        getItemLayout={this._getItemLayout}
        navigator={this.props.navigator}
        renderItem={this._renderItem}
        fetchData={getDownloadItemsAsync}
      />
    );
  }
}
