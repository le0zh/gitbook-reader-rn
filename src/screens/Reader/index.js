import React from 'react';
import { View, Text, StyleSheet, ToastAndroid, WebView, ScrollView, TouchableOpacity, Modal } from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';

import { getReadHisotry } from '../../data';
import { px2dp, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils';

import TOC from './TOC';

const TESTDIR = '/data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution';

export default class Empty extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true,
    statusBarColor: '#3F51B5',
  };

  constructor(props) {
    super(props);

    this.state = {
      toc: [],
      content: '',
      showToolBars: false,
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    RNFS.readFile(`${TESTDIR}/toc.json`).then(content => {
      const toc = JSON.parse(content);
      console.log(toc);

      this.setState({
        toc,
      });
    });

    RNFS.readFile(`${TESTDIR}/content/remove_element.html`).then(content => {
      this.setState({
        content,
      });
    });
  }

  _loadData = () => {};

  onNavigatorEvent(event) {
    console.log(event.id);
    if (event.id == 'bottomTabSelected') {
      // this is the same id field from the static navigatorButtons definition
      this._loadData();
    }
  }

  _onTouch = () => {
    // ToastAndroid.show('show operation', ToastAndroid.SHORT);
    this.setState(prevState => {
      return { showToolBars: !prevState.showToolBars };
    });
  };

  _renderTopBar = () => {
    // return <View style={styles.topBar} />;
    return <TOC style={styles.full} toc={this.state.toc} />;
  };

  _onRequestClose = () => {
    this.setState({
      showToolBars: false,
    });
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
          style={{ flex: 1 }}
        />
        <TouchableOpacity style={styles.touchArea} onPress={this._onTouch}>
          <View />
        </TouchableOpacity>

        <Modal visible={this.state.showToolBars} onRequestClose={this._onRequestClose}>
          <View style={{ flex: 1 }}>
            <Text>标题</Text>
            <TOC toc={this.state.toc} />
          </View>
        </Modal>
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
