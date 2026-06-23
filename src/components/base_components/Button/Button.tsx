import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { useAppTheme } from '../../../hooks/';
import Txt from '../Txt/Txt.tsx';

type ButtonProps = {
    children: React.ReactNode,
    disabled?: boolean,
    onPress?: () => void,
    border_0?: boolean,
    border_8?: boolean,
    border_16?: boolean,
    fullParentWidth?: boolean,
    fullParentHeight?: boolean,
    color?: "primary_1" | "primary_2" | "secondary_1" | "secondary_2" | "secondary_3" | "secondary_4" | "white",
    dynamicSize?: boolean
};

export default function({
    children = "Button",
    disabled = false,
    onPress = () => {},
    border_0,
    border_8,
    border_16,
    fullParentWidth,
    fullParentHeight,
    color = "primary_1",
    dynamicSize = true }: ButtonProps) {
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
        testID="touchableContainer"
        disabled={disabled}
        onPress={() => {
            if(disabled !== true) {
                onPress?.();
            }
        }}
        style={[
            styles.container, 
            { backgroundColor: theme[color], borderRadius: borderRadius, borderColor: theme[color] }, 
            (color === 'white' ? { borderColor: theme.primary_1 } : null),
            (dynamicSize === true ? { width: null, height: null} : null),
            (fullParentWidth === true ? { width: '100%' } : null), 
            (fullParentHeight === true ? { height: '100%' } : null),
            (disabled === true ? { backgroundColor: theme.gray, borderColor: theme.gray } : null)]}>
            <Txt
            testID="buttonLabel"
            textStyle="sectionCategories" 
            style={[{ color: textColor }]}>{children}</Txt>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 19,
        paddingVertical: 12,
        width: 175,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1
    }
});