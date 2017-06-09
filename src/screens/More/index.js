import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { getReadHisotry } from '../../data';

export default class Empty extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: false,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={require('../../img/logo.png')} />
        <Text>Gitbook Reader v1.0.0 @le0zh</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    height: 200,
    width: 200,
  },
});
