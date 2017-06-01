import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens(); // this is where you register all of your app's screens

// 内置对象扩展
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Explore',
      screen: 'app.Home', // this is a registered name for a screen
      icon: require('./src/img/ic_local_cafe.png'),
      selectedIcon: require('./src/img/ic_local_cafe.png'), // iOS only
      title: 'Explore',
    },
    {
      label: '干货',
      screen: 'app.Home', // this is a registered name for a screen
      icon: require('./src/img/ic_news.png'),
      selectedIcon: require('./src/img/ic_news.png'), // iOS only
      title: '干货集中营',
    },
    // {
    //   label: '视频',
    //   screen: 'app.Video',
    //   icon: require('./src/img/ic_video.png'),
    //   selectedIcon: require('./src/img/ic_video.png'), // iOS only
    //   title: '休息视频',
    // },
    {
      label: '福利',
      screen: 'app.Home',
      icon: require('./src/img/ic_pics.png'),
      selectedIcon: require('./src/img/ic_pics.png'), // iOS only
      title: '福利',
    },
  ],
  appStyle: {
    tabBarSelectedButtonColor: '#3F51B5', // change the color of the selected tab icon and text (only selected)
    forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
  },
});
