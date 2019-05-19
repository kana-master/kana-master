import * as React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Font } from 'expo';
import Provider from './context/Provider';
import LevelSelection from './screens/levelSelection';
import Game from './screens/game';
import Pause from './screens/pause';
import Debug from './screens/debug';
import Store from './screens/store';
import List from './screens/list';
import Success from './screens/success';
import Failure from './screens/failure';

StatusBar.setBarStyle('light-content');
StatusBar.setHidden(true);

const TabStack = createBottomTabNavigator({
  LevelSelection,
  List,
  Store
});

const GameStack = createStackNavigator(
  {
    Main: Game,
    Success,
    Failure
  },
  {
    mode: 'card',
    headerMode: 'none'
  }
);

const AppNavigator = createStackNavigator(
  {
    Main: TabStack,
    Game: GameStack,
    Pause,
    Debug
  },
  {
    mode: 'card',
    headerMode: 'none'
  }
);

const Routes = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-semibold': require('../assets/fonts/Raleway-SemiBold.ttf')
    });

    this.setState({
      fontLoaded: true
    });
  }

  render() {
    return (
      <Provider>
        {this.state.fontLoaded && (
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        )}
      </Provider>
    );
  }
}
