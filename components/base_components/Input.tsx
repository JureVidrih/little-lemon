import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useAppTheme } from '../../hooks/';
import { Txt } from './';

type InputProps = {
    inputContainerStyle?: ViewStyle
    label?: string,
    value?: string,
    placeholder?: string,
    required?: boolean,
    validateInitially?: boolean,
    invalidValueLabel?: string,
    hideInvalidLabel?: boolean,
    onChangeText?: (arg0: string) => void,
    validate?: (arg0: string) => boolean
} & TextInputProps;

export default function({
    inputContainerStyle,
    label,
    value,
    placeholder = "",
    required = false,
    invalidValueLabel = "Specified value is invalid.",
    hideInvalidLabel = false,
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
        if(required === true) {
            setInputValidity(validate?.(value ?? "") ?? true);
        }
    }, [value]);

    return (
        <View style={styles.container}>
            {label !== undefined && label !== null && <Txt textStyle="pregular" style={[styles.label, { color: theme.primary_1 }]}>{label}{(required === true ? " *" : null)}</Txt>}
            <TextInput 
            style={[styles.inputContainer, { borderColor: theme.gray, color: theme.primary_1 }, inputContainerStyle]}
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
            {hideInvalidLabel === false && <Txt textStyle="pregular" style={styles.invalidValueLabel}>{(inputValidity === false ? invalidValueLabel : null)}</Txt>}
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
        marginVertical: 2,
        fontSize: 12,
        color: '#ff0000'
    }
});