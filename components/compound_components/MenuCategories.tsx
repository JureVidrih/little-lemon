import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';

import { ToggleButton } from '../base_components';

type MenuCategoriesProps = {

};

export default function({

    }: MenuCategoriesProps) {
    const theme = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: "#ffffff", borderBottomColor: theme.gray }]}>
            <Text style={{ color: "#000000", fontSize: 19, fontWeight: '900' }}>{"Order for delivery!".toUpperCase()}</Text>
            <View style={styles.categoriesContainer}>
                <ToggleButton border_16 dynamicSize={true}>Starters</ToggleButton>
                <ToggleButton border_16 dynamicSize={true}>Mains</ToggleButton>
                <ToggleButton border_16 dynamicSize={true}>Desserts</ToggleButton>
                <ToggleButton border_16 dynamicSize={true}>Drinks</ToggleButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 0,
        width: '100%',
        height: 135,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        overflow: 'hidden'
    },
    categoriesContainer: {
        marginTop: 12,
        width: '100%',
        height: null,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});