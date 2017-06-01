import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight, CameraRoll, ToastAndroid } from 'react-native';

import { px2dp, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils';

export default class NewsCard extends React.PureComponent {
  static navigatorStyle = {
    navBarHidden: true, // make the nav bar hidden
  };

  _dismissModal = () => {
    this.props.navigator.dismissAllModals({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  };

  render() {
    return (
      <View style={styles.bg}>
        <TouchableHighlight onPress={this._dismissModal}>
          <Image ref={view => (this.image = view)} style={styles.image} source={{ uri: this.props.url }} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
  },

  image: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    resizeMode: 'contain',
  },

  aciton: {
    height: px2dp(72),
    width: px2dp(72),
  },

  operation: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    height: px2dp(80),
    alignItems: 'center',
    bottom: px2dp(80),
  },
});
