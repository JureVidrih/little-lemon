import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';

import { useAppTheme } from '../hooks/';
import { useNavigation } from '@react-navigation/native';

export default function() {
    const theme = useAppTheme();

    const navigation = useNavigation<any>();

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }]
            });
        }, 1500);
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
        top: '70%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    }
});