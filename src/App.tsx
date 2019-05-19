import * as React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Font } from 'expo';
import Provider from './context/Provider';
import KanaSelection from './screens/kanaSelection';
import LevelSelection from './screens/levelSelection';
import Game from './screens/game';
import Pause from './screens/pause';
import Debug from './screens/debug';
import Store from './screens/store';
import List from './screens/list';

StatusBar.setBarStyle('light-content');
StatusBar.setHidden(true);

const TabBar = createBottomTabNavigator({
  Selection: {
    screen: createStackNavigator(
      {
        KanaSelection,
        LevelSelection
      },
      {
        initialRouteName: 'LevelSelection',
        mode: 'card'
      }
    )
  },
  List,
  Store
});

const AppNavigator = createStackNavigator(
  {
    Main: TabBar,
    Game,
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
