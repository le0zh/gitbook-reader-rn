import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ToastAndroid,
  WebView,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackAndroid,
} from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';

import { getReadHisotry } from '../../data';
import { px2dp, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils';

import TOC from './TOC';

const TESTDIR = '/data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution';

const AnimatedToc = Animated.createAnimatedComponent(TOC);

export default class Empty extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true,
    statusBarColor: '#3F51B5',
  };

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      toc: [],
    };

    this.tocLeft = new Animated.Value(-SCREEN_WIDTH);
    this.showToc = false;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    RNFS.readFile(`${TESTDIR}/toc.json`).then(content => {
      const toc = JSON.parse(content);
      console.log(toc);

      this.setState({
        toc,
      });

      this._loadContent('index.html');
    });

    BackAndroid.addEventListener('hardwareBackPess', this._handleBackPress);
  }

  componentWillUnMount() {
    BackAndroid.removeEventListener('hardwareBackPess', this._handleBackPress);
  }

  _closeToc = () => {
    Animated.timing(this.tocLeft, {
      toValue: -SCREEN_WIDTH,
      useNativeDriver: true,
    }).start();

    this.showToc = false;
  };

  _handleBackPress = () => {
    if (this.showToc) {
      this._closeToc();
      return true;
    }
  };

  _loadContent = src => {
    RNFS.readFile(`${TESTDIR}/content/${src}`).then(content => {
      this.setState({
        content,
      });
    });
  };

  onNavigatorEvent(event) {
    if (event.id == 'bottomTabSelected') {
      // this is the same id field from the static navigatorButtons definition
      // this._loadData();
    }
  }

  _onTouch = () => {
    Animated.timing(this.tocLeft, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    this.showToc = true;
  };

  _onNavPress = src => {
    this._closeToc();
    this._loadContent(src);
  };

  render() {
    if (this.state.toc.length === 0) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            html: this.state.content,
            baseUrl: 'file:///data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution/content/',
          }}
          startInLoadingState
          style={styles.webView}
        />
        <TouchableOpacity style={styles.touchArea} onPress={this._onTouch}>
          <View />
        </TouchableOpacity>

        <AnimatedToc
          style={[styles.toc, { transform: [{ translateX: this.tocLeft }] }]}
          onNavPress={this._onNavPress}
          toc={this.state.toc}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchArea: {
    height: 100,
    width: 100,
    // backgroundColor: '#00000010',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: (SCREEN_WIDTH - 100) / 2,
    top: (SCREEN_HEIGHT - 100) / 2,
  },

  topBar: {
    height: px2dp(200),
    width: SCREEN_WIDTH,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  toc: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    // left: -SCREEN_WIDTH,
    left: 0,
    bottom: 0,
    top: 0,
    // transform: [{ translateX: -SCREEN_WIDTH }],
  },

  webView: {
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0,
  },

  full: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
