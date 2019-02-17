import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import _ from 'lodash';
import theme from '../../utils/theme';

const { width } = Dimensions.get('window');

export default class AnswerButton extends React.Component {
  state = {
    pressed: false
  };

  getAnswerStyle(type) {
    if (_.isBoolean(this.props.highlight)) {
      return this.props.highlight
        ? styles[`${type}AnswerCorrect`]
        : styles[`${type}AnswerWrong`];
    }
  }

  render() {
    const { onPress, answer, disabled } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, this.props.style, this.getAnswerStyle('button')]}
        onPress={() => onPress(answer)}
      >
        <Text style={[styles.text, this.getAnswerStyle('text')]}>
          {answer.latinChar}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.color.background.primary,
    width: width / 2 - 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginBottom: 16,
    borderRadius: 3,
    shadowColor: '#CBE0FD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0
  },
  buttonAnswerCorrect: {
    backgroundColor: theme.color.background.secondary,
    shadowColor: '#3A7FD0'
  },
  buttonAnswerWrong: {
    backgroundColor: theme.color.highlight.error
  },
  text: {
    color: theme.color.font.primary,
    fontSize: 42,
    fontFamily: 'raleway-semibold'
  },
  textAnswerCorrect: {
    color: theme.color.font.inverted
  },
  textAnswerWrong: {
    color: theme.color.font.inverted
  }
});
