import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Avatar from '../Avatar/Avatar.tsx';
import BackButton from '../BackButton/BackButton.tsx';

import { useAppTheme, useSessionStorage } from '../../../hooks/';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './UIHeaderStyles.ts';

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

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            {showBackButton === true ? <BackButton mode="header" onPress={backButtonOnPress} /> : <View style={{ width: 40, height: 40 }} />}
            <Image 
            style={{ width: 180, height: 60 }} 
            source={require("../../../../assets/Images/Logo.png")}
            resizeMode="contain" />
            {showAvatar === true ? <Avatar mode="header" onPress={avatarOnPress} source={avatarSource} /> : <View style={{ width: 60, height: 60 }} />}
        </View>
    );
}