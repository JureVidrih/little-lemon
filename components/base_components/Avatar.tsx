import React, { useState, useLayoutEffect } from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';

import { useAppTheme, useSessionStorage } from '../../hooks/';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAvatarState } from '../../hooks/';

type AvatarProps = {
    mode?: string,
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

    const configuration = {
        width: 100,
        height: 100,
        borderRadius: 50,
        labelSize: 36
    }

    if(mode === "header") {
        configuration.width = 60;
        configuration.height = 60;
        configuration.borderRadius = 30;
        configuration.labelSize = 28;
    }

    return (
        <Pressable 
        style={[styles.container, {...configuration}]}
        onPress={(evt) => {
            evt.stopPropagation();
            onPress?.();
        }}>
            {
                (source !== undefined && source !== null) || (avatarUri !== undefined && avatarUri !== null) ? (
                    <Image 
                    style={{ width: '100%', height: '100%' }}
                    source={(source !== undefined && source !== null ? { uri: source } : { uri: avatarUri })}
                    />
                ) : (
                    <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#298dff',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius: '50%',
                        borderColor: theme.gray,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.placeholderLabel, { fontSize: configuration.labelSize }]}>{firstInitial ?? ""}{lastInitial ?? ""}</Text>
                    </View>
                )
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        overflow: 'hidden'
    },
    placeholderLabel: {
        color: '#ffffff'
    }
});