import React, { useRef, useState } from 'react';

import { StyleSheet, Text, View, ToastAndroid, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { useSessionStorage } from '../hooks';

export default function ({navigateToHome}: {navigateToHome: () => void}) {
  const insets = useSafeAreaInsets();

  const sessionStorage = useSessionStorage();

  const [inputValidity, setInputValidity] = useState({
    firstName: false,
    email: false
  });
  
  return (
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
      <UIHeader showAvatar={false} showBackButton={false} />
      <View style={styles.bodyContainer}>
        <Header sizeType={4} align="center">Let us get to know you</Header>
        <View style={styles.formContainer}>
          <Input 
          label="First Name"
          placeholder="Type your first name here.."
          required
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
            return regex.test(newValue);
          }}
          invalidValueLabel="Name may contain only letters." />
          <Input 
          label="Email"
          placeholder="Type your email here.."
          required
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
            return regex.test(newValue);
          }}
          invalidValueLabel="Specify a valid email address." />
        </View>
        <View style={styles.buttonContainer}>
          <Button
          border_8={true} 
          color={"primary_1"}
          disabled={inputValidity.firstName !== true || inputValidity.email !== true}>Next</Button>
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
    paddingTop: 25,
    width: '100%',
    flex: 1.4,
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  formContainer: {
    position:  'absolute',
    top: '50%',
    left: '50%',
    width: '72%',
    justifyContent: 'center',
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
