import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ToastAndroid, ScrollView } from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileScreen } from './screens/';
import { Avatar, Button, Checkbox, Header, Input } from './components/base_components';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
