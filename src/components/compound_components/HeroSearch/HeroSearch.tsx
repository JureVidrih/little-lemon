import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { Svg, Circle, Line } from 'react-native-svg';

import { useAppTheme } from '../../../hooks/';
import Input from '../../base_components/Input/Input.tsx';

import styles from './HeroSearchStyles.ts';

type HeroSearchProps = {
    searchAction?: (arg0: string) => void
};

export default function({
    searchAction
}: HeroSearchProps) {
    const theme = useAppTheme();

    const animation = useSharedValue(0.01);

    const [inputVisible, setInputVisibility] = useState(false);

    const toggleInput = useCallback((toggleOn: boolean) => {
        if(toggleOn === true) {
            animation.value = withTiming(1, {
                duration: 140
            });
        } else {
            animation.value = withTiming(0.01, {
                duration: 140
            });
        }
    }, []);

    const animatedValues = useAnimatedStyle(() => { 
        return { 
            opacity: animation.value,
            transform: [{ scaleY: animation.value }]
        }
    });

    return (
        <View testID="herosearch-outer-container" style={[styles.container]}>
            <TouchableOpacity 
            testID="herosearch-show-button"
            style={styles.iconContainer}
            onPress={() => {
                toggleInput(!inputVisible);
                setInputVisibility(!inputVisible);
            }}>
                <Svg
                width={28}
                height={28}
                viewBox="0 0 24 24"
                fill="none"
                >
                {/* Lens */}
                <Circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke={'#000000'}
                    strokeWidth={3}
                />

                {/* Handle */}
                <Line
                    x1="16.65"
                    y1="16.65"
                    x2="21"
                    y2="21"
                    stroke={'#000000'}
                    strokeWidth={3}
                    strokeLinecap="round"
                />
                </Svg>
            </TouchableOpacity>
            <Animated.View style={[styles.inputContainer, { flex: 1 }, animatedValues]}>
                <Input 
                onChangeText={(newValue) => { searchAction?.(newValue); }}
                hideInvalidLabel={true}
                inputContainerStyle={{ height: 40, paddingVertical: 8, backgroundColor: '#ffffff', borderStyle: 'solid', borderWidth: 1, borderColor: theme.gray }}
                editable={inputVisible} />
            </Animated.View>
        </View>
    );
}