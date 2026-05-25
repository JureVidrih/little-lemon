import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { useAppTheme } from '../../hooks/';

type HeaderProps = {
    children: React.ReactNode,
    sizeType?: number
};

export default function({
    children,
    sizeType = 1
    }: HeaderProps) {
    const theme = useAppTheme();

    let fontSize;

    switch(sizeType) {
        case 1: fontSize = 40; break;
        case 2: fontSize = 32; break;
        case 3: fontSize = 28; break;
        case 4: fontSize = 26; break;
        case 5: fontSize = 22; break;
        case 6: fontSize = 19; break;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.headerText, { fontSize: fontSize, color: theme.primary_1 }]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    headerText: {
        marginVertical: 10,
        fontWeight: 'bold'
    }
});