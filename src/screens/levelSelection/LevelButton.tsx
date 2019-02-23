import React, { ReactChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
import theme from '../../utils/theme';

interface Props {
  children: any,
  highlight: boolean,
  disabled: boolean,
  style?: ViewStyle,
  onPress: (any) => any
};

export default ({ children, highlight, disabled, style, ...props }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        highlight && styles.buttonHighlighted,
        disabled && styles.buttonDisabled,
        style
      ]}
      disabled={disabled}
      {...props}
    >
      {disabled ? (
        <Image
          style={{ width: 23, height: 27 }}
          source={require('../../../assets/lock.png')}
        />
      ) : (
        <Text style={[styles.text, highlight && styles.textHighlighted]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.color.background.primary,
    width: 50,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  text: {
    color: theme.color.font.primary,
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonHighlighted: {
    backgroundColor: theme.color.background.secondary
  },
  textHighlighted: {
    color: theme.color.font.inverted
  },
  buttonDisabled: {
    backgroundColor: theme.color.background.inverted
  },
  textDisabled: {
    color: theme.color.font.inverted
  }
});
