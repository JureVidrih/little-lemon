import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

import Txt from '../Txt/Txt.tsx';

import { useAppTheme } from '../../../hooks/';
import styles, { fontSizes } from './HeaderStyles.ts';
import type { fontSizeType } from './HeaderStyles.ts';

type HeaderProps = {
    children: React.ReactNode,
    sizeType?: fontSizeType,
    align?: TextStyle['textAlign']
};

export default function({
    children,
    sizeType = 1,
    align = "left"
    }: HeaderProps) {
    const theme = useAppTheme();

    let fontSize = fontSizes[sizeType];

    return (
        <View testID="viewContainer" style={styles.container}>
            <Txt 
            textStyle='subTitle'
            style={[styles.headerText, { fontSize: fontSize, textAlign: align }]}>{children}</Txt>
        </View>
    );
}