import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { mask } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Avatar, Button, BackButton, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { useSessionStorage, useAvatarState } from '../hooks';

export default function () {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<any>();

  const { reset, setFirstInitial, setLastInitial } = useAvatarState((state: any) => state);

  let initialValues = useRef<any>(null);

  const [changedValues, setChangedValues] = useState<any>(null);
  const [requiredFieldsValidity, setRequiredFieldsValidity] = useState<any>({
    firstName: true,
    email: true
  });

  useLayoutEffect(() => {
    (async () => {
      let firstName = await AsyncStorage.getItem("@little-lemon/profile/firstName");
      let lastName = await AsyncStorage.getItem("@little-lemon/profile/lastName");
      let email = await AsyncStorage.getItem("@little-lemon/profile/email");
      let phoneNumber = await AsyncStorage.getItem("@little-lemon/profile/phoneNumber");

      let orderStatuses = await AsyncStorage.getItem("@little-lemon/profile/orderStatuses");
      let passwordChanges = await AsyncStorage.getItem("@little-lemon/profile/passwordChanges");
      let specialOffers = await AsyncStorage.getItem("@little-lemon/profile/specialOffers");
      let newsletter = await AsyncStorage.getItem("@little-lemon/profile/newsletter");
      
      initialValues.current = {
        firstName,
        lastName,
        email,
        phoneNumber,
        orderStatuses,
        passwordChanges,
        specialOffers,
        newsletter
      };

      setChangedValues({...initialValues.current})
    })();
    navigation.setOptions({
      header: () => {
          return (
              <UIHeader 
                  showAvatar={true} 
                  showBackButton={true}
                  backButtonOnPress={() => {
                      navigation.goBack();
                  }} />
          );
      }
    });
  }, []);
  
  return (
    <ScrollView style={[styles.container, { marginBottom: insets.bottom }]} contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ width: '90%', height: 560, justifyContent: 'space-around' }}>
            <Header sizeType={5}>Personal information</Header>
            <InputAvatar 
            placeholder={undefined}
            onSelect={(uri) => { 

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
              value={changedValues?.firstName ?? undefined}
              placeholder="Type your first name here..."
              maxLength={100}
              onChangeText={(newValue) => {
                setChangedValues({ ...changedValues, firstName: newValue });
              }}
              validate={(newValue) => { 
                const regex = /^[a-zA-Z]+$/;
                const condition = regex.test(newValue);
                setRequiredFieldsValidity({...requiredFieldsValidity, firstName: condition});
                return condition;
              }}
              required={true}
              validateInitially={false}
              inputMode="text" />
              <Input 
              label="Last name"
              value={changedValues?.lastName ?? undefined}
              placeholder="Type your last name here..."
              maxLength={100}
              onChangeText={(newValue) => {
                setChangedValues({ ...changedValues, lastName: newValue });
              }}
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
              value={changedValues?.email ?? undefined}
              placeholder="Type your email here..."
              maxLength={100}
              onChangeText={(newValue) => { setChangedValues({ ...changedValues, email: newValue }); }}
              validate={(newValue) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const condition = regex.test(newValue);
                setRequiredFieldsValidity({...requiredFieldsValidity, email: condition});
                return condition;
              }}
              required={true}
              validateInitially={false}
              invalidValueLabel="Provide a valid email!"
              inputMode="email" />
              <Input 
              label="Phone number"
              value={mask(changedValues?.phoneNumber ?? "", "(999) 999-9999")}
              placeholder="Type your phone number here..."
              maxLength={15}
              onChangeText={(newValue) => {
                setChangedValues({ ...changedValues, phoneNumber: newValue });
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
            <Checkbox 
            label="Order statuses" 
            checked={changedValues?.orderStatuses === "true"}
            onSelect={(value: boolean) => {
              setChangedValues({ ...changedValues, orderStatuses: value+"" });
            }} />
            <Checkbox 
            label="Password changes" 
            checked={changedValues?.passwordChanges === "true"}
            onSelect={(value: boolean) => {
              setChangedValues({ ...changedValues, passwordChanges: value+"" });
            }} />
            <Checkbox 
            label="Special offers" 
            checked={changedValues?.specialOffers === "true"}
            onSelect={(value: boolean) => {
              setChangedValues({ ...changedValues, specialOffers: value+"" });
            }} />
            <Checkbox 
            label="Newsletter" 
            checked={changedValues?.newsletter === "true"}
            onSelect={(value: boolean) => {
              setChangedValues({ ...changedValues, newsletter: value+"" });
            }} />
        </View>
        <View style={{ width: '90%', marginTop: 30 }}>
            <Button 
            border_8={true} 
            color={"primary_2"}
            onPress={async () => {
              let allKeys = await AsyncStorage.getAllKeys();
              allKeys = allKeys.filter((elem) => { return elem.startsWith("@little-lemon/")});
              try {
                await AsyncStorage.multiRemove(allKeys);
              } catch(err) {
                console.log(err);
              }

              reset();

              navigation.reset({
                index: 0,
                routes: [{ name: "OnboardingScreen" }]
              });
            }}>Log out</Button>
            <View style={{ marginVertical: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button 
            border_8
            color={"white"}
            onPress={() => {
              setChangedValues({...initialValues.current});
              setRequiredFieldsValidity({ firstName: true, email: true });
            }}>Discard changes</Button>
            <Button
            disabled={(requiredFieldsValidity.firstName === false || requiredFieldsValidity.email === false)}
            border_8
            color={"primary_1"}
            onPress={() => {
              setFirstInitial(changedValues?.firstName[0]?.toUpperCase() ?? null);
              AsyncStorage.setItem("@little-lemon/profile/firstName", changedValues?.firstName ?? "");

              setLastInitial(changedValues?.lastName[0]?.toUpperCase() ?? null);
              AsyncStorage.setItem("@little-lemon/profile/lastName", changedValues?.lastName ?? "");

              AsyncStorage.setItem("@little-lemon/profile/email", changedValues?.email ?? "");
              AsyncStorage.setItem("@little-lemon/profile/phoneNumber", changedValues?.phoneNumber ?? "");

              AsyncStorage.setItem("@little-lemon/profile/orderStatuses", changedValues?.orderStatuses ?? "");
              AsyncStorage.setItem("@little-lemon/profile/passwordChanges", changedValues?.passwordChanges ?? "");
              AsyncStorage.setItem("@little-lemon/profile/specialOffers", changedValues?.specialOffers ?? "");
              AsyncStorage.setItem("@little-lemon/profile/newsletter", changedValues?.newsletter ?? "");
              initialValues.current = {...changedValues};
            }}>Save changes</Button>
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
