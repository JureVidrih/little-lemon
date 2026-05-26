import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { Svg, Path } from 'react-native-svg';


import { useAppTheme } from '../../hooks/';

type BackButtonProps = {
    mode?: string
};

export default function({
    mode = "normal"
    }: BackButtonProps) {
    const theme = useAppTheme();

    let configuration = {
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
        <View style={[styles.container, {...configuration}]}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        overflow: 'hidden'
    }
});