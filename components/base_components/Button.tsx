import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';

type ButtonProps = {
    children: React.ReactNode,
    onPress?: () => void,
    border_0?: boolean,
    border_8?: boolean,
    border_16?: boolean,
    fullParentWidth?: boolean,
    fullParentHeight?: boolean
};

export default function({
    children = "Button",
    onPress = () => {},
    border_0,
    border_8,
    border_16,
    fullParentWidth,
    fullParentHeight }: ButtonProps) {
    const theme = useAppTheme();

    let borderRadius = 0;
    if(border_8 === true) {
        borderRadius = theme.border_radius_8;
    } else if(border_16 === true) {
        borderRadius = theme.border_radius_16;
    }

    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[
            styles.container, 
            { backgroundColor: theme.primary_1, borderRadius: borderRadius }, 
            (fullParentWidth === true ? { width: '100%' } : null), 
            (fullParentHeight === true ? { height: '100%' } : null)]}>
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
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ffffffff'
    },
    label: {
        fontSize: 16
    }
});