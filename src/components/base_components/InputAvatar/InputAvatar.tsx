import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppTheme, useAvatarState } from '../../../hooks/';
import styles from './InputAvatarStyles.ts';

import Avatar from '../Avatar/Avatar.tsx';
import Button from '../Button/Button.tsx';
import Txt from '../Txt/Txt.tsx';

type InputAvatarProps = {
    label?: string,
    placeholder?: string,
    required?: boolean,
    onSelect?: (arg0: string | null) => void
};

export default function({
    label = "Avatar",
    placeholder,
    required = false,
    onSelect
     }: InputAvatarProps) {
    const theme = useAppTheme();

    const { setAvatarUri } = useAvatarState((state: any) => state);

    const [input, setInput] = useState(placeholder ?? null);

    const pickImage = useCallback(async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted) {
            Alert.alert("Permission required", "Permission to access the media library is required.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if(!result.canceled) {
            onSelect?.(result.assets[0].uri);
            setAvatarUri(result.assets[0].uri);
            setInput(result.assets[0].uri);
            await AsyncStorage.setItem("@little-lemon/profile/avatarUri", result.assets[0].uri);
        }

    }, []);

    return (
        <View testID="outerContainer" style={styles.container}>
            <Txt 
            textStyle="pregular"
            style={[styles.label, { }]}>{label}{(required === true ? " *" : null)}</Txt>
            <View testID="innerContainer" style={styles.innerContainer}>
                <Avatar 
                mode="normal"
                source={input} />
                <Button 
                border_8
                color={"primary_1"}
                onPress={() => {
                    pickImage();
                }}>Change</Button>
                <Button 
                border_0
                color={"white"}
                onPress={() => {
                    onSelect?.(null);
                    setAvatarUri(null);
                    AsyncStorage.removeItem("@little-lemon/profile/avatarUri");
                    setInput(null);
                }}>Remove</Button>
            </View>
        </View>
    );
}