import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './components/base_components';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <View style={{ width: '80%', height: null, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button 
        border_8
        color={"primary_1"}>Change</Button>
        <Button 
        border_0
        color={"white"}>Remove</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
