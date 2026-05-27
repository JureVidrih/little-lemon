import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Avatar, Button, BackButton, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { useSessionStorage } from '../hooks';

export default function () {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<any>();

  const sessionStorage = useSessionStorage();

  const [avatarSource, setAvatarSource] = useState<string | null>(sessionStorage.get("profileAvatarURI"));

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
          return (
              <UIHeader 
                  showAvatar={true} 
                  showBackButton={true}
                  backButtonOnPress={() => {
                      navigation.goBack();
                  }}
                  avatarSource={sessionStorage.get("profileAvatarURI")} />
          );
      }
    });
  }, [avatarSource]);
  
  return (
    <ScrollView style={[styles.container, { marginBottom: insets.bottom }]} contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ width: '90%', height: 560, justifyContent: 'space-around' }}>
            <Header sizeType={5}>Personal information</Header>
            <InputAvatar 
            placeholder={sessionStorage.get("profileAvatarURI")}
            onSelect={(uri) => { 
              if(uri === null) {
                sessionStorage.remove("profileAvatarURI");
              } else {
                sessionStorage.set("profileAvatarURI", uri);
              }
              
              setAvatarSource(uri);
             }}
            />
            <Input 
            label="First name"
            placeholder="Type your first name here..."
            maxLength={100}
            onChangeText={(newValue) => {  }}
            validate={(newValue) => { return newValue.length >= 2; }}
            required={true}
            validateInitially={false}
            inputMode="text" />
            <Input 
            label="Last name"
            placeholder="Type your last name here..."
            maxLength={100}
            onChangeText={(newValue) => {  }}
            validate={(newValue) => { return newValue.length >= 2; }}
            required={true}
            validateInitially={false}
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
    backgroundColor: '#ffffff'
  },
});
