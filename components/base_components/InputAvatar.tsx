import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppTheme, useAvatarState } from '../../hooks/';
import { Avatar, Button, Txt } from '../base_components/';

type InputAvatarProps = {
    label?: string,
    value?: string,
    placeholder?: string,
    required?: boolean,
    onSelect?: (arg0: string | null) => void
};

export default function({
    label = "Avatar",
    value,
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
        <View style={styles.container}>
            <Txt 
            textStyle="pregular"
            style={[styles.label, { }]}>{label}{(required === true ? " *" : null)}</Txt>
            <View style={{ width: '90%', height: null, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    label: {
        marginBottom: 3,
        fontSize: 12,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingHorizontal: 19,
        paddingVertical: 12,
        width: '100%',
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8
    }
});