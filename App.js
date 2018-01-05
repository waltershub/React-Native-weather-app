import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import RootNavigation from './navigation/RootNavigation';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
