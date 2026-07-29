import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';

import styles from './ToggleButtonStyles.ts';
import { useAppTheme } from '../../../hooks/';
import Txt from '../Txt/Txt.tsx';

type ToggleButtonProps = {
    children: React.ReactNode,
    toggled?: boolean,
    onPress?: (arg0: boolean) => void,
    border_0?: boolean,
    border_8?: boolean,
    border_16?: boolean,
    fullParentWidth?: boolean,
    fullParentHeight?: boolean,
    dynamicSize?: boolean
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
    dynamicSize = true }: ToggleButtonProps) {
    const theme = useAppTheme();

    const animation = useSharedValue((toggled === true ? 1 : 0));

    const toggleAnimation = useCallback((toggleOn: boolean) => {
        if(toggleOn === true) {
            animation.value = withTiming(1, {
                duration: 140
            });
        } else {
            animation.value = withTiming(0, {
                duration: 140
            });
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

    const animatedValues = useAnimatedStyle(() => { 
        return { 
            borderColor: interpolateColor(animation.value, [0, 1], [theme.gray, theme.primary_1]),
            backgroundColor: interpolateColor(animation.value, [0, 1], [theme.gray, theme.primary_1])
        }
    });

    const animatedLabel = useAnimatedStyle(() => { 
        return { 
            color: interpolateColor(animation.value, [0, 1], [theme.primary_1, "#ffffff"])
        }
    });

    return (
        <Pressable
        testID="toggleButtonOuterContainer"
        style={styles.pressableContainer}
        onPress={(evt) => {
            evt.stopPropagation();

            toggleAnimation(!isToggled);
            onPress?.(!isToggled);
            setToggleStatus(!isToggled);
        }}
        >
            <Animated.View
            testID="animatedContainer"
            style={[
            styles.container, 
            { 
                width: configuration.width,
                height: configuration.height,
                borderRadius: configuration.borderRadius, 
            }, 
            animatedValues,
            (dynamicSize === true ? { width: null, height: null} : null),
            (fullParentWidth === true ? { width: '100%' } : null), 
            (fullParentHeight === true ? { height: '100%' } : null)]}>
                <Txt
                testID="buttonLabel"
                textStyle="sectionCategories"
                style={[animatedLabel]}
                >{children}</Txt>
            </Animated.View>
        </Pressable>
    );
}