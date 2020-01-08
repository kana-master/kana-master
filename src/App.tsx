import * as React from 'react';
import { StatusBar, SafeAreaView, AsyncStorage } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import * as Font from 'expo-font';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import LevelSelection from './screens/levelSelection';
import Game from './screens/game';
import Pause from './screens/pause';
import Store from './screens/store';
import List from './screens/list';
import Success from './screens/success';
import Failure from './screens/failure';
import rootReducer from './redux/reducers';

StatusBar.setBarStyle('light-content');
StatusBar.setHidden(true);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['progress']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store)
 
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
        <PersistGate loading={null} persistor={persistor}>
          {this.state.fontLoaded && (
            <SafeAreaView style={{ flex: 1 }}>
              <Routes />
            </SafeAreaView>
          )}
        </PersistGate>
      </Provider>
    );
  }
}
