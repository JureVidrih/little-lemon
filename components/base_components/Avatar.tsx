import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';


import { useAppTheme, useSessionStorage } from '../../hooks/';

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
                        <Text style={[styles.placeholderLabel, { fontSize: configuration.labelSize }]}>{sessionStorage.get("profile/firstName")?.[0]?.toUpperCase()}{sessionStorage.get("profile/lastName")?.[0]?.toUpperCase()}</Text>
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