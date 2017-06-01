import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { px2dp, SCREEN_WIDTH } from '../../utils';

import Feeds from '../../components/Feeds';
import FeedsCard from './FeedsCard';

export default class Home extends React.Component {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarHidden: true, // make the nav bar hidden
    // collapsingToolBarComponent: 'app.News.Header',
    navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
    // navBarTextFontFamily: 'font-name', // Changes the title font
    navBarBackgroundColor: '#000', // change the background color of the nav bar (remembered across pushes)
    // drawUnderTabBar: true, // draw the screen content under the tab bar (the tab bar is always translucent)
    statusBarBlur: true, // blur the area under the status bar, works best with navBarHidden:true
    navBarBlur: true, // blur the entire nav bar, works best with drawUnderNavBar:true
  };

  _onItemPress = url => {
    this.props.navigator.push({
      screen: 'app.News.Reader', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      // titleImage: require('../../img/ic_news.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
      passProps: {
        url,
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

  // 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App

  _renderItem = (_renderItem = ({ item }) => (
    <FeedsCard onPress={() => this._onItemPress(item.url)} key={item._id} {...item} />
  ));

  render() {
    return (
      <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: '#000' }}>
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="前端" tabLabel="前端" />
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="Android" tabLabel="Android" />
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="iOS" tabLabel="iOS" />
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="拓展资源" tabLabel="拓展资源" />
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="App" tabLabel="App" />
        <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="瞎推荐" tabLabel="瞎推荐" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  header: {
    height: px2dp(335),
    backgroundColor: '#000',
  },

  itemSeparator: {
    height: px2dp(35),
    width: SCREEN_WIDTH,
    backgroundColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
  },
});
