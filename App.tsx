import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';

import { Button, Checkbox, Header, Input } from './components/base_components';

export default function App() {
  return (
    <View style={styles.container}>
      <Header sizeType={4}>Personal information</Header>
      <View style={{ width: '90%', height: null, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15 }}>
        <Button 
        border_8
        color={"primary_1"}>Change</Button>
        <Button 
        border_0
        color={"white"}>Remove</Button>
      </View>
      <View style={{ width: '90%' }}>
        <Input 
        label="First name"
        placeholder="Type your first name here..."
        value="TESTEST"
        maxLength={20}
        onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
        <Input 
        label="Lasts name"
        placeholder="Type your last name here..."
        value="TESTEST"
        maxLength={20}
        onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
        <Input 
        label="Email"
        placeholder="Type your email here..."
        value="TESTEST"
        maxLength={20}
        onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
        <Input 
        label="Phone number"
        placeholder="Type your phone number here..."
        value="TESTEST"
        maxLength={20}
        onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
        <Checkbox label="Order statuses" checked={true} />
        <Checkbox label="Password changes" checked={true} />
        <Checkbox label="Special offers" checked={true} />
        <Checkbox label="Newsletter" checked={true} />
      </View>
      <View style={{ width: '90%' }}>
        <Button 
        border_8={true} 
        color={"primary_2"}>Log out</Button>
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button 
          border_8
          color={"white"}>Discard changes</Button>
          <Button 
          border_8
          color={"primary_1"}>Save changes</Button>
        </View>
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
    justifyContent: 'space-evenly',
  },
});
