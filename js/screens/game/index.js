import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import QuestionView from './QuestionView';
import AnswerView from './AnswerView';
import Hearts from './Hearts';
import Diamonds from './Diamonds';
import { connect } from '../../context/connect';

const PAUSE = 500;
const DEFAULT_LEVEL = 1;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.props.setupNextSyllable(
      'hiragana',
      this.props.navigation.getParam('level', DEFAULT_LEVEL)
    );
  }

  componentDidUpdate() {
    const { game, setupNextSyllable } = this.props;

    if (game.pending) {
      setTimeout(() => {
        if (game.lives === 0) {
          this.props.navigation.navigate('LevelSelection', {
            preselectedLevel: game.level
          });
        }

        setupNextSyllable('hiragana', game.level);
      }, PAUSE);
    }
  }

  componentWillUnmount() {
    this.props.resetGameState();
  }

  checkAnswer = givenAnswer => {
    const { setGivenAnswer, game } = this.props;

    setGivenAnswer({
      ...givenAnswer,
      correct: game.correctAnswer.latinChar === givenAnswer.latinChar
    });
  };

  render() {
    const { game, navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {game.initialized ? (
          <React.Fragment>
            <View style={styles.statusContainer}>
              <Hearts lives={game.lives} />
              <Diamonds score={game.score} />
            </View>
            <QuestionView game={game} />
            <AnswerView
              answers={game.choices}
              correctAnswer={game.correctAnswer}
              givenAnswer={game.givenAnswer}
              checkAnswer={this.checkAnswer}
              disabled={game.status === 'spawnGems'}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Pause')}
              style={{ marginHorizontal: 25, marginBottom: 16 }}
            >
              <Image
                style={{ width: 32, height: 23 }}
                source={require('../../../assets/back.png')}
              />
            </TouchableOpacity>
          </React.Fragment>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ACFFF',
    position: 'relative'
  },
  statusContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    flex: 0
  }
});

const mapStateToProps = ({ game, persistedStore }) => ({
  game,
  unlockedLevel: persistedStore.unlockedLevel
});

const mapActionToProps = ({ game, persistedStore }) => {
  return {
    setupNextSyllable: game.setupNextSyllable,
    resetGameState: game.resetGameState,
    setGivenAnswer: game.setGivenAnswer,
    checkGivenAnswer: game.checkGivenAnswer,
    setPersistedStore: persistedStore.setPersistedStore
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(Game);
