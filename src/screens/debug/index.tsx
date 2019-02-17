import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../elements/Button';
import theme from '../../utils/theme';
import { connect } from '../../context/connect';

const Debug = ({ navigation, clearPersistedStore }) => {
  return (
    <View>
      <Button onPress={() => clearPersistedStore()}>
        Clear persistedStore
      </Button>
      <Button onPress={() => navigation.goBack()}>Close</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingBottom: 80,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 186,
    height: 88
  },
  title: {
    color: theme.color.font.inverted,
    marginBottom: 32,
    fontSize: 32,
    textAlign: 'center'
  }
});

const mapStateToProps = ({ persistedStore }) => ({
  persistedStore
});

const mapActionToProps = ({ persistedStore }) => ({
  clearPersistedStore: persistedStore.clearPersistedStore
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Debug);
