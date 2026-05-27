import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
            <Text>App loading...</Text>
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
    }
});