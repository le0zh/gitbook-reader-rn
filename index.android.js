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
      icon: require('./src/img/book.png'),
      selectedIcon: require('./src/img/book.png'), // iOS only
      title: 'Explore',
    },
    {
      label: 'Search',
      screen: 'app.Search', // this is a registered name for a screen
      icon: require('./src/img/search.png'),
      selectedIcon: require('./src/img/search.png'), // iOS only
      title: 'Search',
    },
    {
      label: 'Download',
      screen: 'app.Download',
      icon: require('./src/img/download.png'),
      selectedIcon: require('./src/img/download.png'), // iOS only
      title: 'Download',
    },
    {
      label: 'More',
      screen: 'app.More',
      icon: require('./src/img/more.png'),
      selectedIcon: require('./src/img/more.png'), // iOS only
      title: 'More',
    },
  ],
  appStyle: {
    tabBarSelectedButtonColor: '#3F51B5', // change the color of the selected tab icon and text (only selected)
    forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
  },
});
