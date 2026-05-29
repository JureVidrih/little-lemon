import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import { Svg, Circle, Line } from 'react-native-svg';

import { useAppTheme } from '../../hooks/';
import { Input } from '../base_components';

type HeroSearchProps = {
    searchAction?: (arg0: string) => void
};

export default function({
    searchAction
}: HeroSearchProps) {
    const theme = useAppTheme();

    const animation = useRef(new Animated.Value(0)).current;

    const [inputVisible, setInputVisibility] = useState(false);

    const toggleInput = useCallback((toggleOn: boolean) => {
        if(toggleOn === true) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }).start();
        }
    }, []);

    return (
        <View style={[styles.container]}>
            <TouchableOpacity 
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
            <Animated.View style={[styles.inputContainer, { opacity: animation, transform: [{ scaleY: animation }] }]}>
                <Input 
                onChangeText={(newValue) => { searchAction?.(newValue); }}
                hideInvalidLabel={true}
                inputContainerStyle={{ height: 40, paddingVertical: 8, backgroundColor: '#ffffff', borderStyle: 'solid', borderWidth: 1, borderColor: theme.gray }}
                editable={inputVisible} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 14,
        paddingLeft: 28,
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconContainer: {
        padding: 0,
        width: 48,
        height: 48,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    inputContainer: {
        marginLeft: 10,
        width: null, 
        height: '100%', 
        flexDirection: 'row', 
        flex: 1, 
        alignItems: 'center'
    }
});