import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';

import Camera from 'react-native-camera';

import { search } from '../../data/search';
import { px2dp, SCREEN_WIDTH } from '../../utils';

import Feeds from '../../components/Feeds';
import ResultItem from './ResultItem';

const ITEM_HEIGHT = px2dp(250);

export default class Search extends React.PureComponent {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    statusBarTextColorScheme: 'light',

    // iOS only
    statusBarHideWithNavBar: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: 'init',
    };

    this.q = '';
  }

  _doSearch = e => {
    if (e.nativeEvent.text.trim() === '') {
      return;
    }

    this.q = e.nativeEvent.text.trim();

    if (this.state.mode === 'show') {
      // 已经显示结果了，直接刷新下Feeds
      this.feeds && this.feeds.refresh();
    } else {
      this.setState({
        mode: 'show',
      });
    }
  };

  _gotoDetail = (id, title) => {
    // saveBookCover(item.cover.large);

    this.props.navigator.push({
      screen: 'app.BookDetail', // unique ID registered with Navigation.registerScreen
      title: title, // navigation bar title of the pushed screen (optional)
      backButtonTitle: '', // override the back button title (optional)
      passProps: {
        id,
        book: null,
        fromSearch: true,
      },
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });
  };

  _renderItem = ({ item }) => {
    return <ResultItem {...item} onPress={() => this._gotoDetail(item.id, item.title)} />;
  };

  _getItemLayout = (data, index) => {
    return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
  };

  _doScan = () => {
    this.props.navigator.push({
      screen: 'app.Camera', // unique ID registered with Navigation.registerScreen
      title: 'QR',
    });
  };

  _renderSearchResult = () => {
    return (
      <Feeds
        ref={view => (this.feeds = view)}
        navigator={this.props.navigator}
        renderItem={this._renderItem}
        fetchData={page => search(this.q, page)}
        keyExtractor={item => item.id}
        getItemLayout={this._getItemLayout}
      />
    );
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent"
            placeholder="Type Here..."
            blurOnSubmit
            onEndEditing={this._doSearch}
            returnKeyType="search"
            inlineImageLeft="search"
          />
          <TouchableHighlight onPress={this._doScan}>
            <Image style={styles.scanIcon} source={require('../../img/scan.png')} />
          </TouchableHighlight>
        </View>

        {this.state.mode === 'show' ? this._renderSearchResult() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  textInputWrapper: {
    backgroundColor: '#3F51B5',
    width: SCREEN_WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: px2dp(100),
  },

  input: {
    height: px2dp(90),
    marginLeft: 5,
    width: SCREEN_WIDTH - 70,
    backgroundColor: '#C5CAE9',
    color: '#fff',
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 4,
  },

  scanIcon: {
    height: 40,
    width: 40,
  },
});
