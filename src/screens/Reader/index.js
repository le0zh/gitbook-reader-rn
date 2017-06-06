import React from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';

import RNFS from 'react-native-fs';
import fastXmlParser from 'fast-xml-parser';

import { getReadHisotry } from '../../data';

const TESTDIR = '/data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution/content';

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
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    // RNFS.readDir(TESTDIR).then(res => {
    //   console.log('------------>content dir<------------');
    //   console.log(res);
    // });

    // remove_duplicates_from_sorted_array.html

    // RNFS.readFile(`${TESTDIR}/toc.ncx`).then(content => {
    //   const start = content.indexOf('<navMap>');
    //   const end = content.indexOf('</navMap>');

    //   const navContent = content.substr(start, end - start + 1);

    //   var xml = fastXmlParser.parse(navContent, {
    //     ignoreNonTextNodeAttr: false,
    //     ignoreTextNodeAttr: false,
    //     attrPrefix: '_',
    //   });

    //   console.log(xml.navMap.navPoint);
    // });

    RNFS.readFile(`${TESTDIR}/remove_element.html`).then(content => {
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

  render() {
    if (this.state.content === '') {
      return null;
    }

    return (
      <WebView
        source={{
          html: this.state.content,
          baseUrl: 'file:///data/user/0/com.gitbookreader/files/download/siddontang-leetcode-solution/content/',
        }}
        startInLoadingState
        style={{ flex: 1 }}
      />
    );
  }
}
