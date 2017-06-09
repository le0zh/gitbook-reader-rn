import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

import { search } from '../../data/search';
import { px2dp, SCREEN_WIDTH } from '../../utils';

import Feeds from '../../components/Feeds';
import ResultItem from './ResultItem';

const ITEM_HEIGHT = px2dp(250);

export default class Search extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    topBarElevationShadowEnabled: false,
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
  },

  textInputWrapper: {
    backgroundColor: '#3F51B5',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(150),
  },

  input: {
    height: px2dp(100),
    width: SCREEN_WIDTH - 20,
    backgroundColor: '#C5CAE9',
    color: '#fff',
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 4,
  },
});
