import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import { useAppTheme } from '../../hooks/';

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

    const [isChecked, setChecked] = useState(checked ?? false);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => {
                onSelect?.(!isChecked);
                setChecked(!isChecked);
            }}
            style={[
                styles.checkBoxContainer,
                { borderColor: theme.primary_1, backgroundColor: theme.primary_1 }
            ]}>
                { isChecked === true ? (
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
                ) : null}
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
        </View>
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
        fontSize: 18
    },
    checkBoxContainer: {
        width: 28,
        height: 28,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8
    }
});