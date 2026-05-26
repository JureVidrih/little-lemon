import React from 'react';

import { StyleSheet, Text, View, ToastAndroid, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { Hero, MenuCategories } from '../components/compound_components';

export default function App() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
        <UIHeader showAvatar={false} showBackButton={false}/>
        <Hero />
        <View style={{ width: '100%', flex: 1, paddingHorizontal: 14 }}>
            <MenuCategories />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
});
