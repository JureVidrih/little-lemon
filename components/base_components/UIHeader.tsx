import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Avatar, BackButton } from './';


import { useAppTheme } from '../../hooks/';

type UIHeaderProps = {
    showBackButton?: boolean,
    showAvatar?: boolean
};

export default function({
        showBackButton = false,
        showAvatar = false
    }: UIHeaderProps) {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            {showBackButton === true ? <BackButton mode="header" /> : <View style={{ width: 40, height: 40 }} />}
            <Image 
            style={{ width: 180, height: 60 }} 
            source={require("../../assets/Images/Logo.png")}
            resizeMode="contain" />
            {showAvatar === true ? <Avatar mode="header" /> : <View style={{ width: 60, height: 60 }} />}
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