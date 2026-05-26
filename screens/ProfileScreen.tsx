import React from 'react';

import { StyleSheet, Text, View, ToastAndroid, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';

export default function App() {
  const insets = useSafeAreaInsets();
  
  return (
    <ScrollView style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]} contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <UIHeader />
        <View style={{ width: '90%', height: 560, justifyContent: 'space-around' }}>
            <Header sizeType={5}>Personal information</Header>
            <InputAvatar 
            // placeholder={'https://images.unsplash.com/photo-1695927621677-ec96e048dce2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=wellington-ferreira-72TE8cWKXRY-unsplash.jpg&w=640'}
            />
            <Input 
            label="First name"
            required={true}
            placeholder="Type your first name here..."
            maxLength={100}
            onChangeText={(newValue) => {  }}
            validate={(newValue) => { return newValue.length != 0; }}
            inputMode="text" />
            <Input 
            label="Last name"
            placeholder="Type your last name here..."
            maxLength={100}
            onChangeText={(newValue) => {  }}
            validate={(newValue) => { return newValue.length != 0; }}
            invalidValueLabel="Provide a valid last name!"
            inputMode="text" />
            <Input 
            label="Email"
            placeholder="Type your email here..."
            maxLength={100}
            onChangeText={(newValue) => {  }}
            inputMode="email"
            validate={(newValue) => { return newValue.includes('@') && newValue.length > 5; }}
            required={false} />
            <Input 
            label="Phone number"
            placeholder="Type your phone number here..."
            maxLength={15}
            onChangeText={(newValue) => {  }}
            inputMode="tel" />
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
