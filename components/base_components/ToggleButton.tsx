import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Animated } from 'react-native';

import { useAppTheme } from '../../hooks/';
import { Txt } from './';

type ToggleButtonProps = {
    children: React.ReactNode,
    toggled?: boolean,
    onPress?: (arg0: boolean) => void,
    border_0?: boolean,
    border_8?: boolean,
    border_16?: boolean,
    fullParentWidth?: boolean,
    fullParentHeight?: boolean,
    dynamicSize?: boolean,
    mode?: string
};

export default function({
    children = "Button",
    toggled = false,
    onPress,
    border_0,
    border_8,
    border_16,
    fullParentWidth,
    fullParentHeight,
    dynamicSize = true,
    mode = "normal" }: ToggleButtonProps) {
    const theme = useAppTheme();

    const animation = useRef(new Animated.Value((toggled === true ? 1 : 0))).current;

    const toggleAnimation = useCallback((toggleOn: boolean) => {
        if(toggleOn === true) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 140,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 140,
                useNativeDriver: false
            }).start();
        }
    }, []);

    const [isToggled, setToggleStatus] = useState(toggled ?? false);

    const configuration = {
        borderRadius: 0,
        width: 80,
        height: 35
    }

    if(border_8 === true) {
        configuration.borderRadius = theme.border_radius_8;
    } else if(border_16 === true) {
        configuration.borderRadius = theme.border_radius_16;
    }

    const animatedValues = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.gray, theme.primary_1]
    });

    const animatedLabel = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.primary_1, "#ffffff"]
    });

    return (
        <Pressable 
        style={styles.pressableContainer}
        onPress={(evt) => {
            evt.stopPropagation();

            toggleAnimation(!isToggled);
            onPress?.(!isToggled);
            setToggleStatus(!isToggled);
        }}
        >
            <Animated.View
            style={[
            styles.container, 
            { 
                width: configuration.width,
                height: configuration.height,
                borderRadius: configuration.borderRadius, 
                borderColor: animatedValues,
                backgroundColor: animatedValues
            }, 
            (fullParentWidth === true ? { width: '100%' } : null), 
            (fullParentHeight === true ? { height: '100%' } : null),
            (dynamicSize === true ? { width: null, height: null} : null)]}>
                <Txt 
                textStyle="sectionCategories"
                style={[styles.label, { color: animatedLabel }]}
                >{children}</Txt>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressableContainer: {
        width: null,
        height: null
    },
    container: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1
    },
    label: {

    }
});