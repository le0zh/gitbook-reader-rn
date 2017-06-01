import React from 'react';
import { View, Text } from 'react-native';

import Feeds from '../../components/Feeds';
import VideoCard from './VideoCard';

export default class Video extends React.Component {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarHidden: false, // make the nav bar hidden
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

  _renderItem = (_renderItem = ({ item }) => (
    <VideoCard onPress={() => this._onItemPress(item.url)} key={item._id} {...item} />
  ));

  render() {
    return <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="休息视频" />;
  }
}
