import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Avatar, BackButton } from './';


import { useAppTheme } from '../../hooks/';

type UIHeaderProps = {

};

export default function({

    }: UIHeaderProps) {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            <BackButton mode="header" />
            <Image 
            style={{ width: 180, height: 60 }} 
            source={require("../../assets/Images/Logo.png")}
            resizeMode="contain" />
            <Avatar mode="header" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});