import React from 'react';
import { Image, ScrollView, View, Text, StyleSheet, WebView, ActivityIndicator } from 'react-native';
import moment from 'moment';

import { px2dp, SCREEN_WIDTH } from '../../utils';
import { get } from '../../data';

const injectedScript = function() {
  var wrapper = document.createElement('div');
  wrapper.id = 'height-wrapper';
  while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
  }
  document.body.appendChild(wrapper);

  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    } else {
      let height = wrapper.clientHeight;
      postMessage(height);
    }
  }
  waitForBridge();

  window.addEventListener('load', function() {
    waitForBridge();
    setTimeout(waitForBridge, 1000);
  });

  window.addEventListener('resize', waitForBridge);
};

export default class ReadMe extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      content: '',
      webViewHeight: 300,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    get(`https://api.gitbook.com/book/${this.props.id}/contents/README.json`).then(res => {
      this.setState({
        ready: true,
        content: res.sections[0].content.replaceAll('<a', '<span ').replaceAll('/a>', '/span>'),
      });
    });

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onMessage = e => {
    const newHeight = parseInt(e.nativeEvent.data, 10) + 100;
    if (this._isMounted && this.state.webViewHeight !== newHeight) {
      this.setState({
        webViewHeight: newHeight,
      });
    }
  };

  // webView自适应高度参考：
  // https://github.com/scazzy/react-native-webview-autoheight
  // https://gist.github.com/epeli/10c77c1710dd137a1335

  render() {
    if (!this.state.ready) {
      return <ActivityIndicator size="small" />;
    }

    const htmlStr = `
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
      <link rel="stylesheet" href="https://www.gitbook.com/assets/style.css?version=19.6.14">
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      <style>
        body, html, #height-wrapper {
            margin: 0;
            padding: 0;
        }
        #height-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        </style>
    </head>
    <body>
      ${this.state.content}
    </body>
    </html>
    `;

    const webViewSource = { html: htmlStr };

    return (
      <View style={styles.wrapper}>
        <WebView
          javaScriptEnabled
          style={{
            height: this.state.webViewHeight,
            width: SCREEN_WIDTH - 30,
          }}
          onMessage={this._onMessage}
          source={webViewSource}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
          startInLoadingState
          injectedJavaScript={'(' + String(injectedScript) + ')();'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
});
