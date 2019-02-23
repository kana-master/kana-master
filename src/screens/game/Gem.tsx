import * as React from 'react';
import { StyleSheet, View, Text, Animated, Image, Easing } from 'react-native';
import _ from 'lodash';

export default class Gem extends React.Component<any> {
  state = {
    animPosition: new Animated.ValueXY({ x: Math.random() * 300, y: 300 })
  };

  componentWillReceiveProps(newProps) {
    // if (newProps.startMovement) {
    //   Animated.timing(
    //     this.state.animPosition, // The animated value to drive
    //     {
    //       toValue: { x: 20, y: 20 }, // Animate to opacity: 1 (opaque)
    //       duration: 400, // Make it take a while
    //       easing: Easing.circle
    //     }
    //   ).start(() => {
    //     this.props.removeGem(this.props.id);
    //   });
    // }
  }

  render() {
    console.log(this.props.movementAnim);
    return (
      <Animated.View
        style={[
          gemStyles.container,
          {
            transform: [
              { scale: this.props.fadeAnim }
              //   { translateX: this.props.movementAnim.x },
              //   { translateY: this.props.movementAnim.y }
            ]
          }
        ]}
      >
        <Image
          style={{
            width: 23,
            height: 22
          }}
          source={require('../../../assets/gem.png')}
        />
      </Animated.View>
    );
  }
}

const gemStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    transform: [
      {
        translateY: 300
      }
    ]
  }
});
