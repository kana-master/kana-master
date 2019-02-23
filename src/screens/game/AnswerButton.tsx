import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ViewStyle
} from 'react-native';
import _ from 'lodash';
import theme from '../../utils/theme';

const { width } = Dimensions.get('window');

interface Props {
  highlight: boolean;
  disabled: boolean;
  style: ViewStyle;
  onPress: (any) => any;
  // @TODO: this should be pulled from somewhere
  answer: { latinChar: any };
}

interface State {
  pressed: boolean;
}

export default class AnswerButton extends React.Component<Props, State> {
  state = {
    pressed: false
  };

  getAnswerStyle(type, highlight) {
    if (_.isBoolean(highlight)) {
      return highlight
        ? styles[`${type}AnswerCorrect`]
        : styles[`${type}AnswerWrong`];
    }
  }

  render() {
    const { highlight, style, onPress, answer, disabled } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, style, this.getAnswerStyle('button', highlight)]}
        onPress={() => onPress(answer)}
      >
        <Text style={[styles.text, this.getAnswerStyle('text', highlight)]}>
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
