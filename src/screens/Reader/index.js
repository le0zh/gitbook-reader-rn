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
  BackHandler,
} from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';
import Interactable from 'react-native-interactable';

import { getReadPreogress } from '../../data/dataBase';
import { px2dp, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils';
import { getDirFromBookId } from '../../data/bookFiles';
import TOC from './TOC';

const AnimatedToc = Animated.createAnimatedComponent(TOC);

const SideMenuWidth = SCREEN_WIDTH * 4 / 5;
const RemainingWidth = SCREEN_WIDTH - SideMenuWidth;

const injectedScript = `
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}

ready(function(){
  setTimeout(function(){window.scrollTo(0, -100);}, 0);
})
`;

export default class Empty extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    // navBarHideOnScroll: true,
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    navBarButtonColor: '#fff',
    navBarBackgroundColor: '#3F51B5',
    navBarTextColor: '#fff',
  };

  static navigatorButtons = {
    rightButtons: [],
    leftButtons: [
      {
        title: 'TOC', // if you want a textual button
        buttonColor: '#fff',
        id: 'sideMenu', // id of the button which will pass to your press event handler. See the section bellow for Android specific button ids
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      toc: [],
    };

    this.bookDir = getDirFromBookId(this.props.bookId);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.initalPage = getReadPreogress(this.props.bookId);
  }

  componentDidMount() {
    RNFS.readFile(`${this.bookDir}/toc.json`).then(content => {
      const toc = JSON.parse(content);

      this.setState({ toc });

      this._loadContent(this.initalPage);
    });
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'sideMenu') {
        this.interactableView.setVelocity({ x: 2000 });
      }
    }
  }

  _loadContent = src => {
    // 修改页面样式
    // todo: 修改字体大小，默认为 font-size: 1.125em;
    const fixedStyle = ' style="padding: 0 10px; font-size: 1em" ';
    const fixedMeta = '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">';

    RNFS.readFile(`${this.bookDir}/content/${src}`).then(content => {
      this.setState({
        content: content
          // .replace('<meta content="" name="description">', fixedMeta)
          .replace('<body ', `<body ${fixedStyle} `),
      });
    });
  };

  _onTouch = () => {
    this.interactableView.setVelocity({ x: 2000 });
  };

  _onNavPress = src => {
    this.interactableView.setVelocity({ x: -2000 });
    this._loadContent(src);
  };

  render() {
    if (this.state.toc.length === 0) {
      return null;
    }

    return (
      <View style={styles.wrapper}>
        <WebView
          source={{
            html: this.state.content,
            baseUrl: `file:///${this.bookDir}/content/`,
          }}
          startInLoadingState
          style={styles.webView}
          injectedJavaScript={injectedScript}
        />

        <View style={styles.sideMenuContainer} pointerEvents="box-none">
          <Interactable.View
            ref={view => (this.interactableView = view)}
            horizontalOnly={true}
            snapPoints={[{ x: 0 }, { x: -SideMenuWidth }]}
            boundaries={{ right: RemainingWidth / 2 }}
            initialPosition={{ x: -SideMenuWidth }}
          >
            <TOC
              style={styles.sideMenu}
              bookId={this.props.bookId}
              initSelectedSrc={this.initalPage}
              onNavPress={this._onNavPress}
              toc={this.state.toc}
            />
          </Interactable.View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },

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

  sideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: -RemainingWidth,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1002,
  },

  sideMenu: {
    left: 0,
    width: SCREEN_WIDTH,
    paddingLeft: RemainingWidth,
    backgroundColor: '#eee',
    paddingTop: 0,
    elevation: 5,
  },

  webView: {
    flex: 1,
  },
});
