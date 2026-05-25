import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';

type ButtonProps = {
    children: React.ReactNode,
    onPress?: () => void
};

export default function({
    children = "Button",
    onPress = () => {} }: ButtonProps) {
    const theme = useAppTheme();

    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.container, { backgroundColor: theme.primary_1 }]}>
            <Text style={[styles.label, { color: 'white' }]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 175,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16
    }
});