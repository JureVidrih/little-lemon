import React, { useState, useLayoutEffect } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';


import { useAppTheme, useSessionStorage } from '../../hooks/';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AvatarProps = {
    mode?: string,
    source?: string | null,
    onPress?: () => void
};

export default function({
    mode = "normal",
    source,
    onPress
    }: AvatarProps) {
    const theme = useAppTheme();

    const sessionStorage = useSessionStorage();

    const[initials, setInitials] = useState({
        first: "",
        last: ""
    });

    useLayoutEffect(() => {
        (async () => {
            let first = await AsyncStorage.getItem("@little-lemon/profile/firstName") ?? "";
            let last = await AsyncStorage.getItem("@little-lemon/profile/lastName") ?? "";

            setInitials({
                first: first[0].toUpperCase(),
                last: last[0].toUpperCase()
            });
        })();
    }, []);

    const configuration = {
        width: 100,
        height: 100,
        borderRadius: 50,
        labelSize: 36
    }

    if(mode === "header") {
        configuration.width = 60;
        configuration.height = 60;
        configuration.borderRadius = 30;
        configuration.labelSize = 28;
    }

    return (
        <Pressable 
        style={[styles.container, {...configuration}]}
        onPress={(evt) => {
            evt.stopPropagation();
            onPress?.();
        }}>
            {
                source !== undefined && source !== null ? (
                    <Image 
                    style={{ width: '100%', height: '100%' }}
                    source={(source !== undefined && source !== null ? { uri: source } : undefined)}
                    />
                ) : (
                    <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#298dff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.placeholderLabel, { fontSize: configuration.labelSize }]}>{initials.first}{initials.last}</Text>
                    </View>
                )
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        overflow: 'hidden'
    },
    placeholderLabel: {
        color: '#ffffff'
    }
});