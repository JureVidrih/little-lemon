import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

import Animated from 'react-native-reanimated';

import { useAppTheme } from '../../../hooks/';
import textStyles from './TextStyles.ts';
import type { textStylesType } from './TextStyles.ts';

type TxtProps = {
    testID?: string,
    children: React.ReactNode,
    style?: TextStyle | TextStyle[],
} & TextStyle & TextProps & textStylesType;

export default function({
    children = "/",
    style,
    textStyle,
    ...textProps
}: TxtProps) {
    const theme = useAppTheme();
    
    let textConfiguration: any = {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Arial'
    };

    if(textStyle !== undefined) {
        textConfiguration = textStyles[textStyle];
    }

    return (
        <Animated.Text testID="text-container" style={[textConfiguration, style]} {...textProps}>
            {children}
        </Animated.Text>
    );
}