import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Authentication extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Grok!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});