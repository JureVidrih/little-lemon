import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


import { useAppTheme } from '../../hooks/';

type AvatarProps = {
    mode?: string,
    source?: string
};

export default function({
    mode = "normal",
    source
    }: AvatarProps) {
    const theme = useAppTheme();

    let configuration = {
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
        <View style={[styles.container, {...configuration}]}>
            <Image 
            style={{ width: '100%', height: '100%' }}
            source={(source !== undefined ? { uri: source } : undefined)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        overflow: 'hidden'
    }
});