import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation';
import Button from '../../elements/Button';
import theme from '../../utils/theme';

export default ({ navigation }) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={theme.color.gradient.primary}
    >
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <View>
        <Text style={styles.title}>PAUSED</Text>
        <Button
          onPress={() => {
            const navigateAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Main',
                  params: {},
                  action: NavigationActions.navigate({
                    routeName: 'LevelSelection'
                  })
                })
              ]
            });
            navigation.dispatch(navigateAction);
          }}
          style={{ marginBottom: 16 }}
        >
          Main Menu
        </Button>
        <Button
          onPress={() => console.log('restart')}
          style={{ marginBottom: 16 }}
        >
          Restart
        </Button>
        <Button
          highlight
          onPress={() => navigation.goBack()}
          style={{ marginTop: 8 }}
        >
          Continue
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingBottom: 80,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 186,
    height: 88
  },
  title: {
    color: theme.color.font.inverted,
    marginBottom: 32,
    fontSize: 32,
    textAlign: 'center'
  }
});
