import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';
import { connect } from 'react-redux';
import theme from '../../utils/theme';
import levels from '../../data/levels';
import Button from '../../elements/Button';
import LevelButton from './LevelButton';

interface Props {
  navigation: any;
  unlockedLevel: number;
}

class LevelSelection extends React.Component<Props> {
  state = {
    selectedLevel: this.props.navigation.getParam('preselectedLevel', 1)
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


const mapStateToProps = state => ({
  unlockedLevel: state.progress.unlockedLevel
});

export default connect(
  mapStateToProps,
)(LevelSelection);
