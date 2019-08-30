import * as React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import * as Font from 'expo-font';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import LevelSelection from './screens/levelSelection';
import Game from './screens/game';
import Pause from './screens/pause';
import Store from './screens/store';
import List from './screens/list';
import Success from './screens/success';
import Failure from './screens/failure';
import reducers from './redux/reducers';

StatusBar.setBarStyle('light-content');
StatusBar.setHidden(true);

const store = createStore(reducers, applyMiddleware(logger));

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
    Pause
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
      <Provider store={store}>
        {this.state.fontLoaded && (
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        )}
      </Provider>
    );
  }
}
