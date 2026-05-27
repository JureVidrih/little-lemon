import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen, HomeScreen, ProfileScreen, OnboardingScreen } from '../screens/';

export default function() {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator 
        initialRouteName="SplashScreen">
            <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen 
            name="OnboardingScreen" 
            component={OnboardingScreen}
            />
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} />
            <Stack.Screen 
            name="ProfileScreen" 
            component={ProfileScreen}
            />
        </Stack.Navigator>
    );
}