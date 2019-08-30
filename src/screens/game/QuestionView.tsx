import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import theme from '../../utils/theme';
// import GemSpawner from './GemSpawner';
import EllipseSVG from '../../../assets/game-ellipse.svg';

const { width } = Dimensions.get('window');
const BottomEllipse = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 0
    }}
  >
    <EllipseSVG width={width} height={40} />
  </View>
);

export default ({ game }) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.background} />
      <Text style={styles.questionText}>{game.correctAnswer.kanaChar}</Text>
      <BottomEllipse />
      {/* {game.status === 'spawnGems' && (
        <GemSpawner earnedGems={game.earnedGems} setupNextSyllable={setupNextSyllable} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    flex: 1
  },
  background: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    top: 0
  },
  questionText: {
    fontSize: 92,
    lineHeight: 92,
    color: theme.color.font.secondary
  }
});
