import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './components/base_components';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <View style={{ width: '75%', height: 100 }}>
        <Button 
        border_16
        fullParentWidth
        fullParentHeight>Gumb</Button>
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
