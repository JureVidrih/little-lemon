import React from 'react';

import { StyleSheet, Text, View, ToastAndroid, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Checkbox, Header, Input } from '../components/base_components';

export default function App() {
  const insets = useSafeAreaInsets();
  
  return (
    <ScrollView style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]} contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ width: '100%', height: 100 }}></View>
        <View style={{ width: '90%', height: 500, justifyContent: 'space-around' }}>
            <Header sizeType={5}>Personal information</Header>
            <View style={{ width: '90%', height: null, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Avatar 
            mode="normal" />
            <Button 
            border_8
            color={"primary_1"}>Change</Button>
            <Button 
            border_0
            color={"white"}>Remove</Button>
            </View>
            <Input 
            label="First name"
            required={true}
            placeholder="Type your first name here..."
            maxLength={20}
            onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
            <Input 
            label="Lasts name"
            placeholder="Type your last name here..."
            maxLength={20}
            onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
            <Input 
            label="Email"
            placeholder="Type your email here..."
            maxLength={20}
            onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
            <Input 
            label="Phone number"
            placeholder="Type your phone number here..."
            maxLength={20}
            onChangeText={(newValue) => { ToastAndroid.show(newValue, 300); }} />
        </View>
        <View style={{ width: '90%' }}>
            <Header sizeType={5}>Email notifications</Header>
            <Checkbox label="Order statuses" checked={true} />
            <Checkbox label="Password changes" checked={true} />
            <Checkbox label="Special offers" checked={true} />
            <Checkbox label="Newsletter" checked={true} />
        </View>
        <View style={{ width: '90%', marginTop: 30 }}>
            <Button 
            border_8={true} 
            color={"primary_2"}>Log out</Button>
            <View style={{ marginVertical: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button 
            border_8
            color={"white"}>Discard changes</Button>
            <Button 
            border_8
            color={"primary_1"}>Save changes</Button>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
