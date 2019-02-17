import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../utils/theme';

export default ({ children, highlight, style, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, highlight && styles.buttonHighlighted, style]}
    >
      <Text style={[styles.text, highlight && styles.textHighlighted]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.color.background.primary,
    width: 240,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  text: {
    color: theme.color.font.primary,
    fontSize: 24
  },
  buttonHighlighted: {
    backgroundColor: theme.color.background.inverted
  },
  textHighlighted: {
    color: theme.color.font.inverted
  }
});
