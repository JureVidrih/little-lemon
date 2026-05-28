import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useAppTheme } from '../../hooks/';

type InputProps = {
    label?: string,
    value?: string,
    placeholder?: string,
    required?: boolean,
    validateInitially?: boolean,
    invalidValueLabel?: string,
    onChangeText?: (arg0: string) => void,
    validate?: (arg0: string) => boolean
} & TextInputProps;

export default function({
    label,
    value,
    placeholder = "",
    required = false,
    invalidValueLabel = "Specified value is invalid.",
    onChangeText,
    validate,
    validateInitially = false,
    ...textInputProps
     }: InputProps) {
    const theme = useAppTheme();

    const [input, setInput] = useState(value ?? "");
    const [inputValidity, setInputValidity] = useState((validateInitially === true && required === true ? validate?.(input) : null) ?? true);

    useLayoutEffect(() => {
        setInput(value ?? "");
    }, [value]);

    return (
        <View style={styles.container}>
            {label !== undefined && label !== null && <Text style={[styles.label, { color: theme.primary_1 }]}>{label}{(required === true ? " *" : null)}</Text>}
            <TextInput 
            style={[styles.inputContainer, { borderColor: theme.gray, color: theme.primary_1 }]}
            placeholder={placeholder}
            value={input}
            onChangeText={(newValue) => {
                onChangeText?.(newValue);
                setInput(newValue);
                if(required === true) {
                    setInputValidity(validate?.(newValue) ?? true);
                }
            }}
            {...textInputProps} />
            <Text style={styles.invalidValueLabel}>{(inputValidity === false ? invalidValueLabel : null)}</Text>
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
        borderRadius: 8,
        backgroundColor: '#ffffff'
    },
    invalidValueLabel: {
        marginTop: 2,
        fontSize: 12,
        color: '#ff0000'
    }
});