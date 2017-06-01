import React from 'react';
import { View, Text } from 'react-native';

import Feeds from '../../components/Feeds';
import PicCard from './PicCard';

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
    this.props.navigator.showModal({
      screen: 'app.Fuli.FullScreenViewer', // unique ID registered with Navigation.registerScreen
      title: 'Modal', // title of the screen as appears in the nav bar (optional)
      passProps: { url }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-up', // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  _renderItem = (_renderItem = ({ item }) => (
    <PicCard onPress={() => this._onItemPress(item.url)} key={item._id} {...item} />
  ));

  render() {
    return <Feeds navigator={this.props.navigator} renderItem={this._renderItem} category="福利" />;
  }
}
