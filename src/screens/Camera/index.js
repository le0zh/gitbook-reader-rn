import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Camera from 'react-native-camera';

export default class QRScanner extends Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.scanning = true;
        break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
    }
  }

  scanning = true;

  _onBarCodeRead = e => {
    if (this.scanning) {
      if (e.type === 'QR_CODE') {
        if (e.data.indexOf('www.gitbook.com') > 0) {
          const parts = e.data.split('/');
          const author = parts[parts.length - 3];
          const book = parts[parts.length - 2];

          this._scanDone(author, book);
        } else if (e.data.indexOf('.gitbooks.io') > 0) {
          const parts = e.data.replace('https://', '').split('/');
          const author = parts[0].replace('.gitbooks.io', '');
          const book = parts[1];

          this._scanDone(author, book);
        }
      }
    }
  };

  _scanDone = (author, book) => {
    this.scanning = false;

    this.props.navigator.push({
      screen: 'app.BookDetail', // unique ID registered with Navigation.registerScreen
      passProps: {
        id: `${author}/${book}`,
        book: null,
        fromSearch: true,
      },
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });
  };

  static navigatorStyle = {
    tabBarHidden: true,
    navBarBackgroundColor: '#3F51B5',
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    navBarButtonColor: '#fff',
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          onBarCodeRead={this._onBarCodeRead}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={styles.capture}>Scan the QR code of gitbook's url to get the book</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#ffffff80',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});
