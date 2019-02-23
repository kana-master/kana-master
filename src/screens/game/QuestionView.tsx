import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Svg } from 'expo';
import theme from '../../utils/theme';
// import GemSpawner from './GemSpawner';

const { width } = Dimensions.get('window');

const BottomEllipse = () => (
  <Svg
    height={52}
    width={width} /* style={{ position: 'absolute', bottom: 0 }} */
  >
    <Svg.Ellipse
      cx={width / 2}
      cy={0}
      rx={width / 2 + 50}
      ry={50}
      strokeWidth={2}
      stroke="#CCE1FD"
      fill="#fff"
    />
  </Svg>
);

export default ({ game }) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.background} />
      <BottomEllipse />
      <Text style={styles.questionText}>{game.correctAnswer.kanaChar}</Text>
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
    marginBottom: 24
  },
  background: {
    height: 268,
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
