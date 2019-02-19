import React from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import AnswerButton from './AnswerButton';

export default ({ answers, givenAnswer, checkAnswer, disabled }) => {
  return (
    <View style={styles.answerButtonContainer}>
      {answers.map((syllable, i) => {
        const highlight =
          givenAnswer && syllable.latinChar === givenAnswer.latinChar
            ? givenAnswer.correct
            : null;

        return (
          <AnswerButton
            disabled={disabled}
            answer={syllable}
            key={i}
            highlight={highlight}
            onPress={checkAnswer}
            style={{
              marginRight: i % 2 ? 0 : 16
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  answerButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 24,
    marginTop: 16
  }
});
