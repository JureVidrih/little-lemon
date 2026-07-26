import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';

import { useFonts } from 'expo-font';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppTheme, useAvatarState } from '../../hooks/';

import styles from './SplashScreenStyles.ts';

export default function() {
    const theme = useAppTheme();

    const navigation = useNavigation<any>();

    const [loaded, error] = useFonts({
        'Karla-Regular': require("../../../assets/Fonts/Karla-Regular.ttf"),
        'MarkaziText-Regular': require("../../../assets/Fonts/MarkaziText-Regular.ttf")
    });

    const { setAvatarUri, setFirstInitial, setLastInitial } = useAvatarState((state: any) => state);

    useEffect(() => {
        if(loaded || error) {
            (async () => {
                const isUserLoggedIn = await AsyncStorage.getItem("@little-lemon/profile/userLoggedIn");

                let temp = await AsyncStorage.getItem("@little-lemon/profile/avatarUri");
                if(temp !== null) {
                    setAvatarUri(temp);
                }

                temp = await AsyncStorage.getItem("@little-lemon/profile/firstName");
                if(temp !== null) {
                    setFirstInitial(temp[0]?.toUpperCase());
                }

                temp = await AsyncStorage.getItem("@little-lemon/profile/lastName");
                if(temp !== null) {
                    setLastInitial(temp[0]?.toUpperCase());
                }

                setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: (isUserLoggedIn === "true" ? "HomeScreen" : "OnboardingScreen") }]
                });
                }, 1500);
            })();
        }
    }, [loaded, error]);

    return (
        <View style={styles.container}>
            <Image 
            style={styles.logo} 
            source={require("../../../assets/Images/logoIcon.png")} 
            resizeMode="contain" />
            <ActivityIndicator 
            style={styles.indicator}
            size={(Platform.OS === 'android' ? 80 : 'large')}
            color={theme.primary_2} />
        </View>
    );
}