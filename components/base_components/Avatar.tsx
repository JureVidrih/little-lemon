import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';


import { useAppTheme } from '../../hooks/';

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

    const configuration = {
        width: 100,
        height: 100,
        borderRadius: 50
    }

    if(mode === "header") {
        configuration.width = 60;
        configuration.height = 60;
        configuration.borderRadius = 30;
    }

    return (
        <Pressable 
        style={[styles.container, {...configuration}]}
        onPress={(evt) => {
            evt.stopPropagation();
            onPress?.();
        }}>
            <Image 
            style={{ width: '100%', height: '100%' }}
            source={(source !== undefined && source !== null ? { uri: source } : undefined)}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        overflow: 'hidden'
    }
});