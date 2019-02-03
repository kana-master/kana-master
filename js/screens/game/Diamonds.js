import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from '../../context/connect';
import theme from '../../utils/theme';

const Diamonds = ({ score, requiredScore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <Image
        style={styles.diamond}
        source={require('../../../assets/diamond.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  score: {
    backgroundColor: '#9ACFFF',
    borderWidth: 2,
    borderColor: theme.color.font.inverted,
    borderRadius: 14,
    height: 28,
    minWidth: 28,
    marginTop: 14,
    marginRight: 24,
    color: theme.color.font.inverted,
    fontSize: 18,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 6
  },
  diamond: {
    width: 49,
    height: 47,
    position: 'absolute',
    zIndex: -1,
    right: 0,
    top: 0
  }
});

const mapStateToProps = ({ game }) => {
  return {
    score: game.score,
    requiredScore: game.level.goal
  };
};

export default connect(mapStateToProps)(Diamonds);
