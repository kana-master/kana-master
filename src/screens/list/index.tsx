import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default () => <View style={styles.container}></View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingBottom: 80,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
