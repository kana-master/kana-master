import React from 'react';
import { StyleSheet, View, Text, Animated, Image, Easing } from 'react-native';
import _ from 'lodash';
import Gem from './Gem';

export default class GemSpawner extends React.Component {
  state = {
    spawnAnimationDone: false,
    earnedGems: this.props.earnedGems.map(value => ({
      ...value,
      fadeInValue: new Animated.Value(0),
      movementValue: new Animated.ValueXY({ x: Math.random() * 300, y: 300 })
    }))
  };

  componentDidMount() {
    const fadeInAnimations = this.state.earnedGems.map(value => {
      return Animated.timing(value.fadeInValue, {
        toValue: 1,
        duration: 250,
        easing: Easing.bezier(0.34, 0.7, 0.28, 1.93)
        // useNativeDriver: true
      });
    });

    const movementAnimations = this.state.earnedGems.map(value => {
      return Animated.timing(value.movementValue, {
        toValue: { x: 360, y: 20 }, // Animate to opacity: 1 (opaque)
        duration: 500, // Make it take a while
        easing: Easing.circle,
        useNativeDriver: true
      });
    });

    Animated.stagger(250, fadeInAnimations).start(() =>
      //   Animated.stagger(250, movementAnimations).start()
      console.log('ijidj')
    );
  }

  removeGem = id => {
    this.setState({
      earnedGems: this.state.earnedGems.filter(gem => gem.id !== id)
    });

    if (!this.state.earnedGems.length) {
      this.props.setupNextSyllable('hiragana', 1);
    }
  };

  render() {
    return (
      <View style={gemSpawnerStyles.container}>
        {this.state.earnedGems.map(value => {
          return (
            <Gem
              key={value.id}
              id={value.id}
              fadeAnim={value.fadeInValue}
              //   movementAnim={value.movementValue}
              //   startMovement={this.state.spawnAnimationDone}
              //   removeGem={this.removeGem}
            />
          );
        })}
      </View>
    );
  }
}

const gemSpawnerStyles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0
  }
});
