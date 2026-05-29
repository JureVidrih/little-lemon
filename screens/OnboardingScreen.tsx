import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { useSessionStorage, useAvatarState } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function () {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<any>();

  const sessionStorage = useSessionStorage();

  const { setFirstInitial } = useAvatarState((state: any) => state);

  const [inputValidity, setInputValidity] = useState({
    firstName: false,
    email: false
  });
  
  return (
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
      <Image style={{ width: 240, height: 120, marginTop: 25 }} resizeMode="contain" source={require("../assets/Images/Logo.png")} />
      <View style={styles.bodyContainer}>
        <Header sizeType={4} align="center">Let us get to know you</Header>
        <View style={styles.formContainer}>
          <Input 
          label="First Name"
          placeholder="Type your first name here.."
          required
          onChangeText={(newValue) => {
            setFirstInitial(newValue[0]?.toUpperCase());
            AsyncStorage.setItem("@little-lemon/profile/firstName", newValue);
          }}
          validate={(newValue) => {
            const regex = /^[a-zA-Z]+$/;
            let condition = regex.test(newValue);
            if(condition === true) {
              setInputValidity({
                firstName: true,
                email: inputValidity.email
              });
            } else {
              setInputValidity({
                firstName: false,
                email: inputValidity.email
              });
            }
            return condition;
          }}
          invalidValueLabel="Name may contain only letters."
          inputMode="text" />
          <Input 
          label="Email"
          placeholder="Type your email here.."
          required
          onChangeText={(newValue) => {
            AsyncStorage.setItem("@little-lemon/profile/email", newValue);
          }}
          validate={(newValue) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let condition = regex.test(newValue);
            if(condition === true) {
              setInputValidity({
                firstName: inputValidity.firstName,
                email: true
              });
            } else {
              setInputValidity({
                firstName: inputValidity.firstName,
                email: false
              });
            }
            return condition;
          }}
          invalidValueLabel="Specify a valid email address."
          inputMode="email" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
          border_8={true} 
          color={"primary_1"}
          disabled={inputValidity.firstName !== true || inputValidity.email !== true}
          onPress={async () => {
            await AsyncStorage.setItem("@little-lemon/profile/userLoggedIn", "true");
            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }]
            });
          }}>Next</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bodyContainer: {
    position: 'static',
    paddingTop: 25,
    width: '100%',
    flex: 1.4,
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  formContainer: {
    position:  'absolute',
    top: '55%',
    left: '50%',
    width: '72%',
    height: 190,
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    width: '70%',
    transform: [{ translateX: '-50%' }]
  }
});
