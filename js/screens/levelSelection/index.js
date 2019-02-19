import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import _ from 'lodash';
import { connect } from '../../context/connect';
import levels from '../../data/levels';
import Button from '../../elements/Button';
import LevelButton from './LevelButton';

class LevelSelection extends React.Component {
  state = {
    selectedLevel: this.props.navigation.getParam(
      'preselectedLevel',
      this.props.unlockedLevel
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Text>Master the Hiragana</Text>
        <View style={styles.levelSelection}>
          {levels.map(({ id }) => {
            return (
              <LevelButton
                onPress={() => this.setState({ selectedLevel: id })}
                highlight={this.state.selectedLevel === id}
                key={id}
                disabled={id > this.props.unlockedLevel}
              >
                {id}
              </LevelButton>
            );
          })}
        </View>
        <Button
          highlight
          onPress={() =>
            this.props.navigation.navigate('Game', {
              level: this.state.selectedLevel
            })
          }
          style={{ marginBottom: 16 }}
        >
          Let's go!
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ACFFF'
  },
  levelSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 280,
    justifyContent: 'space-between'
  }
});

const mapStateToProps = ({ persistedStore }) => {
  return {
    unlockedLevel: persistedStore.unlockedLevel
  };
};

export default connect(mapStateToProps)(LevelSelection);
