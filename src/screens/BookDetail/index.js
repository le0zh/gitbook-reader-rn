import React from 'react';
import {
  AlertIOS,
  Image,
  ScrollView,
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import RNFS from 'react-native-fs';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import ImageWithPlaceHolder from '../../components/ImageWithPlaceHolder';
import Badge from './Badge';
import Readme from './Readme';
import { getBook } from '../../data';
import { checkIsDownloadOrNot } from '../../data/dataBase';
import { downloadAsync, checkIsDownloadingOrNot } from '../../data/bookFiles';

export default class BookDetail extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    collapsingToolBarComponent: 'app.BookDetail.Cover',
    navBarTranslucent: true, // Optional, sets a translucent dark background to the TitleBar. Useful when displaying bright colored header to emphasize the title and buttons in the TitleBar
    showTitleWhenExpended: false, // default: true. Show the screens title only when the toolbar is collapsed
    navBarTextColor: '#fff',
    navBarTitleTextCentered: true,
    statusBarColor: '#3F51B5',
    navBarButtonColor: '#fff',
    tabBarHidden: false,
    topBarElevationShadowEnabled: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      downloading: false,
      downloaded: false,
      book: props.book,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.fromSearch) {
      // 如果是从搜索页面来的，则只有book id，需要再获取一下书的详细信息
      getBook(this.props.id).then(res => {
        this.setState({ book: res });
        this.props.navigator.setTitle({
          title: res.title,
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _readOnline = () => {
    this.props.navigator.push({
      screen: 'app.OnlineReader', // unique ID registered with Navigation.registerScreen
      // title: item.title, // navigation bar title of the pushed screen (optional)
      // titleImage: require('../../img/ic_news.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
      passProps: {
        url: this.state.book.urls.read,
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      backButtonTitle: '返回', // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });

    // 保存阅读记录
    // saveReadHistory(this.props.book);
  };

  _readLocal = () => {
    const { book } = this.state;

    this.props.navigator.push({
      screen: 'app.Reader', // unique ID registered with Navigation.registerScreen
      title: book.title,
      passProps: {
        bookId: book.id,
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });

    // 调用FolioReader
    // MyNativeModule.startFolioReader(path);
  };

  _download = () => {
    if (this.state.downloading) {
      if (Platform.OS === 'ios') {
        AlertIOS.alert('message', downloading);
      } else if (Platform.OS === 'android') {
        this.props.navigator.showSnackbar({
          text: 'downloading',
        });
      }

      return;
    }

    if (Platform.OS === 'android') {
      this.props.navigator.showSnackbar({
        text: 'Start to download',
      });
    }

    const { book } = this.state;

    this.setState({
      downloading: true,
    });

    downloadAsync(book).then(res => {
      if (this._isMounted) {
        this.setState({
          downloading: false,
          downloaded: true,
        });
      }
    });
  };

  _renderDownloadButton = (isDownloaded, isDownLoading) => {
    if (isDownloaded) {
      return (
        <TouchableHighlight onPress={this._readLocal}>
          <View style={[styles.button, { backgroundColor: '#C5CAE9' }]}>
            <Text style={styles.buttonText}>Read Local</Text>
          </View>
        </TouchableHighlight>
      );
    }

    if (isDownLoading) {
      return (
        <View style={styles.button}>
          <Text style={styles.buttonText}>Downloading</Text>
        </View>
      );
    }

    return (
      <TouchableHighlight onPress={this._download}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Download</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { book } = this.state;

    if (book === null) {
      return (
        <View style={{ flex: 1, paddingTop: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const isDownloaded = checkIsDownloadOrNot(book.id);
    const isDownLoading = checkIsDownloadingOrNot(book.id);

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainer}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.description}>Last updated {moment(book.dates.build).fromNow()} </Text>

          <View style={styles.infoWrapper}>
            <Badge icon={require('../../img/star.png')} title="Star" value={book.counts.stars} />
            <Badge icon={require('../../img/feed.png')} title="Subscribe" value={book.counts.subscriptions} />
          </View>

          <View style={styles.buttons}>
            <TouchableHighlight onPress={this._readOnline}>
              <View style={styles.button}><Text style={styles.buttonText}>Read Online</Text></View>
            </TouchableHighlight>

            {this._renderDownloadButton(isDownloaded, isDownLoading)}
          </View>
        </View>

        <Readme id={book.id} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
  },

  coverWrapper: {
    width: SCREEN_WIDTH,
    height: px2dp(800),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverImage: {
    width: px2dp(474),
    height: px2dp(622),
    borderWidth: 2,
    borderColor: '#eee',
    elevation: 10,
  },

  title: {
    fontSize: px2dp(60),
    color: '#000',
  },

  description: {
    fontSize: px2dp(40),
  },

  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },

  label: {
    height: px2dp(60),
    borderWidth: 1,
    borderColor: '#e8eaed',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#f6f7f8',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#e8eaed',
    marginRight: 10,
    marginTop: 10,
  },

  buttonText: {
    fontSize: px2dp(40),
    color: '#000',
  },
});
