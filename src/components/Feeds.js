import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  InteractionManager,
} from 'react-native';

import { getAllBooks } from '../data';
import { px2dp, SCREEN_WIDTH } from '../utils/';

export default class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      page: 0,
      seed: 1,
      error: null,
      refreshing: false,
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent);
  }

  componentDidMount() {
    this._fetchData();
  }

  _onNavigatorEvent = event => {
    console.log(event.id);
    if (event.id === 'bottomTabReselected') {
      this.flatList && this.flatList.scrollToIndex({ viewPosition: 0.5, index: 0 });
      this._handleRefresh();
    }
  };

  _fetchData = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true });

      const { page } = this.state;

      getAllBooks(page).then(res => {
        this.setState({
          data: page === 0 ? res.list : [...this.state.data, ...res.list],
          loading: false,
          refreshing: false,
        });
      });
    });
  };

  _keyExtractor = (item, index) => item.id;

  _renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this._fetchData();
      }
    );
  };

  _loadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this._fetchData();
      }
    );
  };

  _renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  render() {
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={styles.wrapper}>
          <Text>暂无内容 ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <FlatList
          ref={view => (this.flatList = view)}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this.props.renderItem}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={30}
          refreshing={this.state.refreshing}
          onEndReached={this._loadMore}
          onRefresh={this._handleRefresh}
          ItemSeparatorComponent={this._renderItemSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  header: {
    height: px2dp(335),
    backgroundColor: '#000',
  },

  itemSeparator: {
    height: px2dp(35),
    width: SCREEN_WIDTH,
    backgroundColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    // elevation: 5,
  },
});
