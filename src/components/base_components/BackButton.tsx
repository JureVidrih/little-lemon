import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Svg, Path } from 'react-native-svg';


import { useAppTheme } from '../../hooks/';

type BackButtonProps = {
    mode?: string,
    onPress?: () => void
};

export default function({
    mode = "normal",
    onPress
    }: BackButtonProps) {
    const theme = useAppTheme();

    const configuration = {
        width: 32,
        height: 32,
        borderRadius: 16
    }

    if(mode === "header") {
        configuration.width = 40;
        configuration.height = 40;
        configuration.borderRadius = 20;
    }

    return (
        <TouchableOpacity 
        style={[styles.container, {...configuration}, { backgroundColor: theme.primary_1, borderColor: theme.primary_1 }]}
        onPress={() => {
            onPress?.();
        }}>
            <Svg
            width={configuration.width*0.75}
            height={configuration.height*0.75}
            viewBox="0 0 24 24"
            fill="none"
            >
            <Path
                d="M19 12H5"
                stroke={'#ffffff'}
                strokeWidth={2}
                strokeLinecap="round"
            />

            <Path
                d="M11 18L5 12L11 6"
                stroke={'#ffffff'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </Svg>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});