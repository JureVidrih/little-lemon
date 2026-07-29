import React, { useState, useLayoutEffect } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppTheme } from '../../../hooks/';
import { useAvatarState } from '../../../hooks/';

import styles, { configurations } from './AvatarStyles.ts';

type AvatarProps = {
    mode?: "normal" | "header",
    source?: string | null,
    onPress?: () => void
};

export default function({
    mode = "normal",
    source,
    onPress
    }: AvatarProps) {
    const theme = useAppTheme();

    const { avatarUri, firstInitial, lastInitial, setAvatarUri, setFirstInitial, setLastInitial } = useAvatarState((state: any) => state);

    useLayoutEffect(() => {
        if(avatarUri === null || firstInitial === null || lastInitial === null) {
            (async () => {
                if(avatarUri === null) {
                    const temp = await AsyncStorage.getItem("@little-lemon/profile/avatarUri");
                    if(temp !== null) {
                        setAvatarUri(temp);
                    }
                }
                if(firstInitial === null) {
                    const temp = await AsyncStorage.getItem("@little-lemon/profile/firstName");
                    if(temp !== null) {
                        setFirstInitial(temp[0]?.toUpperCase());
                    }
                }
                if(lastInitial === null) {
                    const temp = await AsyncStorage.getItem("@little-lemon/profile/lastName");
                    if(temp !== null) {
                        setLastInitial(temp[0]?.toUpperCase());
                    }
                }
            }
        )();
        }
    }, []);

    const configuration = configurations[mode];

    return (
        <Pressable
        testID="pressableContainer"
        style={[styles.container, {...configuration.container}]}
        onPress={(evt) => {
            evt.stopPropagation();
            onPress?.();
        }}>
            {
                (source !== undefined && source !== null) || (avatarUri !== undefined && avatarUri !== null) ? (
                    <Image
                    testID="avatarImage"
                    style={{ width: '100%', height: '100%' }}
                    source={(source !== undefined && source !== null ? { uri: source } : { uri: avatarUri })}
                    />
                ) : (
                    <View
                    testID="placeholderView"
                    style={[styles.placeholderView, { borderColor: theme.gray }]}>
                        <Text testID="textContainer" style={[styles.placeholderLabel, { ...configuration.label }]}>{firstInitial ?? ""}{lastInitial ?? ""}</Text>
                    </View>
                )
            }
        </Pressable>
    );
}