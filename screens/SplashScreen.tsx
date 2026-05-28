import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppTheme, useAvatarState } from '../hooks/';

export default function() {
    const theme = useAppTheme();

    const navigation = useNavigation<any>();

    const { setAvatarUri, setFirstInitial, setLastInitial } = useAvatarState((state: any) => state);

    useEffect(() => {
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
    }, []);

    return (
        <View style={styles.container}>
            <Image 
            style={styles.logo} 
            source={require("../assets/Images/logoIcon.png")} 
            resizeMode="contain" />
            <ActivityIndicator 
            style={styles.indicator}
            size={(Platform.OS === 'android' ? 80 : 'large')}
            color={theme.primary_2} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: 250, 
        height: 250,
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    },
    indicator: {
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    }
});