import React from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';
import Provider from './js/context/Provider';
import KanaSelection from './js/screens/kanaSelection';
import LevelSelection from './js/screens/levelSelection';
import Game from './js/screens/game';
import Pause from './js/screens/pause';
import Debug from './js/screens/debug';
import { clearPersistedStore } from './js/context/utils';

StatusBar.setBarStyle('light-content');
StatusBar.setHidden(true);

const Routes = StackNavigator(
  {
    Main: {
      screen: StackNavigator(
        {
          KanaSelection: {
            screen: KanaSelection
          },
          LevelSelection: {
            screen: LevelSelection
          },
          Game: {
            screen: Game
          }
        },
        {
          initialRouteName: 'Game',
          navigationOptions: {
            header: null
          },
          mode: 'card',
          headerMode: 'screen'
        }
      )
    },
    Pause: {
      screen: Pause
    },
    Debug: {
      screen: Debug
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-semibold': require('./assets/fonts/Raleway-SemiBold.ttf')
    });

    this.setState({
      fontLoaded: true
    });
  }

  render() {
    return <Provider>{this.state.fontLoaded && <Routes />}</Provider>;
  }
}
