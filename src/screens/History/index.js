import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getReadHisotry } from '../../data';

export default class Empty extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#3F51B5', // This will be the TitleBars color when the react view is hidden and collapsed
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {}

  _loadData = () => {
    getReadHisotry().then(histories => {
      console.log(histories);
      this.setState({
        data: histories,
      });
    });
  };

  onNavigatorEvent(event) {
    console.log(event.id);
    if (event.id == 'bottomTabSelected') {
      // this is the same id field from the static navigatorButtons definition
      this._loadData();
    }
  }

  render() {
    return (
      <View>
        {this.state.data.map(item => <Text>{item.title}</Text>)}
      </View>
    );
  }
}
