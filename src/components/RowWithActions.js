import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, Slider } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

export default class Row extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }

  _trash = () => {
    this.props.onTrash && this.props.onTrash();
  };

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ position: 'absolute', left: 0, right: 0 }} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.trashHolder,
              {
                height: this.props.height,
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [-78, 0],
                      outputRange: [0, 78],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity onPress={this._trash} style={styles.button}>
              <Image style={styles.button} source={require('../img/delete.png')} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[{ x: 0, damping: 0.7, tension: 300 }, { x: -78, damping: 0.7, tension: 300 }]}
          animatedValueX={this._deltaX}
        >
          {this.props.children}
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
  },
  trashHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 78,
    width: Screen.width,
    paddingLeft: 18,
    backgroundColor: '#E91E63',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
