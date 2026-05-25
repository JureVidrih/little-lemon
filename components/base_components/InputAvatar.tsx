import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { useAppTheme } from '../../hooks/';
import { Avatar, Button } from '../base_components/';

type InputAvatarProps = {
    label?: string,
    value?: string,
    placeholder?: string,
    required?: boolean,
    onChange?: (arg0: string) => void
};

export default function({
    label = "Avatar",
    value,
    placeholder = "",
    required = false,
    onChange
     }: InputAvatarProps) {
    const theme = useAppTheme();

    const [input, setInput] = useState(value ?? "");

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.primary_1 }]}>{label}{(required === true ? " *" : null)}</Text>
            <View style={{ width: '90%', height: null, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <Avatar 
                mode="normal"
                source={placeholder} />
                <Button 
                border_8
                color={"primary_1"}>Change</Button>
                <Button 
                border_0
                color={"white"}>Remove</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    label: {
        marginBottom: 3,
        fontSize: 12,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingHorizontal: 19,
        paddingVertical: 12,
        width: '100%',
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8
    }
});