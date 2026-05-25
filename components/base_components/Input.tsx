import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useAppTheme } from '../../hooks/';

type InputProps = {
    label?: string,
    value?: string,
    placeholder?: string,
    onChangeText?: (arg0: string) => void
} & TextInputProps;

export default function({
    label = "Input Element Label",
    value,
    placeholder = "",
    onChangeText,
    ...textInputProps
     }: InputProps) {
    const theme = useAppTheme();

    const [input, setInput] = useState(value ?? "");

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.primary_1 }]}>{label}</Text>
            <TextInput 
            style={[styles.inputContainer, { borderColor: theme.gray, color: theme.primary_1 }]}
            placeholder={placeholder}
            value={input}
            onChangeText={(newValue) => {
                onChangeText?.(newValue);
                setInput(newValue);
            }}
            {...textInputProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    label: {
        marginBottom: 4,
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