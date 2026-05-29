import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Avatar, BackButton } from './';

import { useAppTheme, useSessionStorage } from '../../hooks/';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UIHeaderProps = {
    showBackButton?: boolean,
    showAvatar?: boolean,
    avatarSource?: string | null,
    backButtonOnPress?: () => void,
    avatarOnPress?: () => void
};

export default function({
        showBackButton = false,
        showAvatar = false,
        avatarSource,
        backButtonOnPress,
        avatarOnPress
    }: UIHeaderProps) {
    const insets = useSafeAreaInsets();

    const theme = useAppTheme();

    const sessionStorage = useSessionStorage();

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            {showBackButton === true ? <BackButton mode="header" onPress={backButtonOnPress} /> : <View style={{ width: 40, height: 40 }} />}
            <Image 
            style={{ width: 180, height: 60 }} 
            source={require("../../assets/Images/Logo.png")}
            resizeMode="contain" />
            {showAvatar === true ? <Avatar mode="header" onPress={avatarOnPress} source={avatarSource} /> : <View style={{ width: 60, height: 60 }} />}
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
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
});