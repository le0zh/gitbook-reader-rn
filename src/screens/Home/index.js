import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';

import { px2dp, SCREEN_WIDTH, saveBookCover } from '../../utils';

import Feeds from '../../components/Feeds';
import Book from './Book';
import { getAllBooks } from '../../data';

const ITEM_HEIGHT = px2dp(380);

export default class Home extends React.Component {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    statusBarTextColorScheme: 'light',

    // iOS only
    statusBarHideWithNavBar: true,
  };

  constructor(props) {
    super(props);
  }

  _gotoDetail = item => {
    saveBookCover(item.cover.large);

    this.props.navigator.push({
      screen: 'app.BookDetail', // unique ID registered with Navigation.registerScreen
      title: item.title, // navigation bar title of the pushed screen (optional)
      // titleImage: require('../../img/ic_news.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
      passProps: {
        book: item,
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      backButtonTitle: '返回', // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
      navigatorStyle: {
        // navBarHideOnScroll: true,
        // navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
        // // navBarTextFontFamily: 'font-name', // Changes the title font
        // navBarBackgroundColor: '#000', // change the background color of the nav bar (remembered across pushes)
        // drawUnderTabBar: true, // draw the screen content under the tab bar (the tab bar is always translucent)
        // statusBarBlur: true, // blur the area under the status bar, works best with navBarHidden:true
        // navBarBlur: true, // blur the entire nav bar, works best with drawUnderNavBar:true
        // navBarButtonColor: '#fff',
      }, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
    });
  };

  _renderItem = ({ item }) => {
    return <Book onPress={() => this._gotoDetail(item)} key={item.id} {...item} />;
  };

  _getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  render() {
    return (
      <Feeds
        key="home"
        getItemLayout={this._getItemLayout}
        navigator={this.props.navigator}
        renderItem={this._renderItem}
        fetchData={getAllBooks}
        keyExtractor={item => item.id}
      />
    );
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
});
