import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Pressable, View, Text, StyleSheet, Animated } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import { useAppTheme } from '../../hooks/';
import { Txt } from './';

type CheckboxProps = {
    label: string,
    checked?: boolean,
    onSelect?: (arg0: boolean) => void,
};

export default function({
    label,
    checked,
    onSelect = () => {}
    }: CheckboxProps) {
    const theme = useAppTheme();

    const animation = useRef(new Animated.Value((checked === true ? 1 : 0))).current;
    
    const toggleAnimation = useCallback((toggleOn: boolean) => {
        if(toggleOn === true) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 60,
                useNativeDriver: true
            }).start();
        } else if(toggleOn === false) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true
            }).start();
        }
    }, []);

    const [isChecked, setChecked] = useState(checked ?? false);

    useLayoutEffect(() => {
        if(checked !== undefined) {
            toggleAnimation(checked);
            setChecked(checked);
        }
    }, [checked]);

    return (
        <Pressable 
            style={styles.container}
            onPress={(evt) => {
                evt.stopPropagation();
                toggleAnimation(!isChecked);
                onSelect?.(!isChecked);
                setChecked(!isChecked);
            }}>
            <View 
            style={[
                styles.checkBoxContainer,
                { borderColor: theme.primary_1, backgroundColor: theme.primary_1 }
            ]}>
                <Animated.View style={{ opacity: animation }}>
                    <Svg
                    width={24}
                    height={24}
                    viewBox="-6 -5 32 32"
                    fill="none"
                    >
                    <Path
                        d="M5 13L10 18L19 7"
                        stroke={'#ffffff'}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </Svg>
                </Animated.View>
            </View>
            <Txt 
            textStyle="pregular"
            style={styles.label}>{label}</Txt>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    label: {
        marginLeft: 10,
    },
    checkBoxContainer: {
        width: 28,
        height: 28,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8
    }
});