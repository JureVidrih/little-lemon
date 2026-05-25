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
    fullParentHeight?: boolean,
    color?: string
};

export default function({
    children = "Button",
    onPress = () => {},
    border_0,
    border_8,
    border_16,
    fullParentWidth,
    fullParentHeight,
    color = "primary_1" }: ButtonProps) {
    const theme = useAppTheme();

    let borderRadius = 0;
    if(border_8 === true) {
        borderRadius = theme.border_radius_8;
    } else if(border_16 === true) {
        borderRadius = theme.border_radius_16;
    }

    let textColor = '#ffffff';

    switch(color) {
        case "primary_2": textColor = '#000000'; break;
        case "secondary_1": textColor = '#ffffff'; break;
        case "secondary_2": textColor = theme.primary_1; break;
        case "secondary_3": textColor = theme.primary_1; break;
        case "secondary_4": textColor = '#ffffff'; break;
        case "white": textColor = theme.primary_1;
    }

    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[
            styles.container, 
            { backgroundColor: theme[color], borderRadius: borderRadius }, 
            (color === 'white' ? { borderColor: theme.primary_1 } : null),
            (fullParentWidth === true ? { width: '100%' } : null), 
            (fullParentHeight === true ? { height: '100%' } : null)]}>
            <Text style={[styles.label, { color: textColor }]}>{children}</Text>
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