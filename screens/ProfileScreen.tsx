import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { mask } from 'react-native-mask-text';

import { Avatar, Button, BackButton, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { useSessionStorage } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function () {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<any>();

  const sessionStorage = useSessionStorage();

  const [avatarSource, setAvatarSource] = useState<string | null>(sessionStorage.get("profileAvatarURI"));

  const [initialValues, setInitialValues] = useState<
  {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phoneNumber: string | null
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });

  useLayoutEffect(() => {
    (async () => {
      let firstName = await AsyncStorage.getItem("@little-lemon/profile/firstName");
      let lastName = await AsyncStorage.getItem("@little-lemon/profile/lastName");
      let email = await AsyncStorage.getItem("@little-lemon/profile/email");
      let phoneNumber = await AsyncStorage.getItem("@little-lemon/profile/phoneNumber");
      
      setInitialValues({
        firstName,
        lastName,
        email,
        phoneNumber
      });
    })();
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
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ 
              width: '100%',
              height: 350
            }}>
              <Input 
              label="First name"
              value={initialValues.firstName ?? undefined}
              placeholder="Type your first name here..."
              maxLength={100}
              onChangeText={(newValue) => { AsyncStorage.setItem("@little-lemon/profile/firstName", newValue); }}
              validate={(newValue) => { 
                const regex = /^[a-zA-Z]+$/;
                return regex.test(newValue);
              }}
              required={true}
              validateInitially={false}
              inputMode="text" />
              <Input 
              label="Last name"
              value={initialValues.lastName ?? undefined}
              placeholder="Type your last name here..."
              maxLength={100}
              onChangeText={(newValue) => { AsyncStorage.setItem("@little-lemon/profile/lastName", newValue); }}
              validate={(newValue) => { 
                const regex = /^[a-zA-Z]+$/;
                return regex.test(newValue);
              }}
              required={false}
              validateInitially={false}
              invalidValueLabel="Provide a valid last name!"
              inputMode="text" />
              <Input 
              label="Email"
              value={initialValues.email ?? undefined}
              placeholder="Type your email here..."
              maxLength={100}
              onChangeText={(newValue) => { AsyncStorage.setItem("@little-lemon/profile/email", newValue); }}
              validate={(newValue) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(newValue);
              }}
              required={true}
              validateInitially={false}
              invalidValueLabel="Provide a valid email!"
              inputMode="email" />
              <Input 
              label="Phone number"
              value={mask(initialValues.phoneNumber ?? "", "(999) 999-9999")}
              placeholder="Type your phone number here..."
              maxLength={15}
              onChangeText={(newValue) => {
                AsyncStorage.setItem("@little-lemon/profile/phoneNumber", newValue);
                setInitialValues({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: newValue
                });
              }}
              validate={(newValue) => {
                const regex = /^(?:\+1\s?)?(?:\(?([2-9][0-8][0-9])\)?[-.\s]?)([2-9][0-9]{2})[-.\s]?([0-9]{4})$/;
                let condition = regex.test(newValue);

                return condition;
              }}
              required={false}
              validateInitially={false}
              inputMode="tel" />
            </KeyboardAvoidingView>
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
            color={"primary_2"}
            onPress={async () => {
              // await AsyncStorage.setItem("@little-lemon/profile/userLoggedIn", "false");
              let allKeys = await AsyncStorage.getAllKeys();
              allKeys = allKeys.filter((elem) => { return elem.startsWith("@little-lemon")});
              try {
                await AsyncStorage.multiRemove(allKeys);
              } catch(err) {
                console.log(err);
              }

              navigation.reset({
                index: 0,
                routes: [{ name: "OnboardingScreen" }]
              });
            }}>Log out</Button>
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
