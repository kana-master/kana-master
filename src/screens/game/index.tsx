import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import QuestionView from './QuestionView';
import AnswerView from './AnswerView';
import Hearts from './Hearts';
import Diamonds from './Diamonds';
import { connect } from 'react-redux';
import {
  resetGameState,
  setupNextSyllable,
  setGivenAnswer
} from '../../redux/actions';

const PAUSE = 500;
const DEFAULT_LEVEL = 1;

interface Props {
  setupNextSyllable: (arg0: any, arg1: any) => any;
  navigation: any;
  game: any;
  unlockedLevel: any;
  setGivenAnswer: (any) => any;
  resetGameState: () => any;
}

class Game extends React.Component<Props> {
  state = {
    currentLevel: this.props.navigation.getParam('level') || DEFAULT_LEVEL
  };

  componentDidMount() {
    const { setupNextSyllable, navigation } = this.props;

    setupNextSyllable('hiragana', navigation.getParam('level', DEFAULT_LEVEL));
  }

  componentDidUpdate() {
    const { currentLevel } = this.state;
    const { game, setupNextSyllable } = this.props;

    if (game.pending) {
      setTimeout(() => {
        if (game.level !== currentLevel) {
          // setPersistedStore({ unlockedLevel: game.level });

          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Game',
                action: NavigationActions.navigate({
                  routeName: 'Success'
                })
              })
            ]
          });

          this.props.navigation.dispatch(resetAction);
        } else if (game.lives === 0) {
          // setPersistedStore({ unlockedLevel: game.level });

          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Game',
                action: NavigationActions.navigate({
                  routeName: 'Failure'
                })
              })
            ]
          });

          this.props.navigation.dispatch(resetAction);
        } else {
          setupNextSyllable('hiragana', game.level);
        }
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
      <View style={styles.container}>
        {game.initialized ? (
          <React.Fragment>
            <View style={styles.statusContainer}>
              <Hearts lives={game.lives} />
              <Diamonds score={game.score} />
            </View>
            <QuestionView game={game} />
            <AnswerView
              answers={game.choices}
              givenAnswer={game.givenAnswer}
              checkAnswer={this.checkAnswer}
              disabled={game.status === 'spawnGems'}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Pause')}
              style={{ marginHorizontal: 25 }}
            >
              <Image
                style={{ width: 32, height: 23 }}
                source={require('../../../assets/back.png')}
              />
            </TouchableOpacity>
            <Text>level {game.level}</Text>
          </React.Fragment>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ACFFF'
  },
  statusContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%'
  }
});

const mapStateToProps = state => ({
  game: state.game,
  unlockedLevel: 1
});

const mapDispatchToProps = {
  setupNextSyllable,
  resetGameState,
  setGivenAnswer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
