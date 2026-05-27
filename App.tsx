import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ToastAndroid, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AppScreenNavigator } from './navigators';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, BackButton, Checkbox, Header, Input } from './components/base_components';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppScreenNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});
