import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import _ from 'lodash';
import theme from '../../utils/theme';
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
      <LinearGradient
        style={styles.container}
        colors={theme.color.gradient.primary}
      >
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
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Debug')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'red'
          }}
        >
          <Text>Debug</Text>
        </TouchableHighlight>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
