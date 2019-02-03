import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default ({ lives }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: lives }, (_, key) => {
        return (
          <Image
            key={key}
            style={{ width: 20, height: 18, marginRight: 3 }}
            source={require('../../../assets/heart.png')}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
