import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useAppTheme } from '../../../hooks/';
import Txt from '../Txt/Txt.tsx';

import styles from './InputStyles.ts';

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

    let firstRender = useRef(true);

    const [input, setInput] = useState(value ?? "");
    const [inputValidity, setInputValidity] = useState((validateInitially === true && required === true ? validate?.(input) : null) ?? true);

    useLayoutEffect(() => {
        setInput(value ?? "");
        if(required === true) {
            setInputValidity((firstRender.current === true && validateInitially === false ? true : (validate?.(value ?? "") ?? true)));
        }
    }, [value]);

    useEffect(() => {
        firstRender.current = false;
    }, []);

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