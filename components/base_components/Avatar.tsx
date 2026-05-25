import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { useAppTheme } from '../../hooks/';

type Avatar = {
    mode?: string
};

export default function({
    mode = "normal"
    }: Avatar) {
    const theme = useAppTheme();

    let configuration = {
        width: 100,
        height: 100,
        borderRadius: 50
    }

    if(mode === "header") {
        configuration.width = 50;
        configuration.height = 50;
        configuration.borderRadius = 50;
    }

    return (
        <View style={[styles.container, {...configuration}]} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray'
    }
});