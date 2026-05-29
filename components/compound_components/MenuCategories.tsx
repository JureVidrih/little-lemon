import React, { useLayoutEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';

import { ToggleButton, Txt } from '../base_components';

type MenuCategoriesProps = {
    onItemSelect: (arg0: any) => void
};

export default function({
        onItemSelect
    }: MenuCategoriesProps) {
    const theme = useAppTheme();

    const activeCategoriesSet = useRef(new Set()).current;

    useLayoutEffect(() => {
        onItemSelect([...activeCategoriesSet]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: "#ffffff", borderBottomColor: theme.gray }]}>
            <Txt 
            textStyle="sectionTitle"
            style={{ }}>{"Order for delivery!".toUpperCase()}</Txt>
            <View style={styles.categoriesContainer}>
                <ToggleButton 
                border_16 
                dynamicSize={true}
                onPress={() => {
                    if(activeCategoriesSet.has("starters") === true) {
                        activeCategoriesSet.delete("starters");
                    } else {
                        activeCategoriesSet.add("starters");
                    }
                    onItemSelect([...activeCategoriesSet]);
                }}>Starters</ToggleButton>
                <ToggleButton 
                border_16 
                dynamicSize={true}
                onPress={() => {
                    if(activeCategoriesSet.has("mains") === true) {
                        activeCategoriesSet.delete("mains");
                    } else {
                        activeCategoriesSet.add("mains");
                    }
                    onItemSelect([...activeCategoriesSet]);
                }}>Mains</ToggleButton>
                <ToggleButton 
                border_16 
                dynamicSize={true}
                onPress={() => {
                    if(activeCategoriesSet.has("desserts") === true) {
                        activeCategoriesSet.delete("desserts");
                    } else {
                        activeCategoriesSet.add("desserts");
                    }
                    onItemSelect([...activeCategoriesSet]);
                }}>Desserts</ToggleButton>
                <ToggleButton 
                border_16 
                dynamicSize={true}
                onPress={() => {
                    if(activeCategoriesSet.has("drinks") === true) {
                        activeCategoriesSet.delete("drinks");
                    } else {
                        activeCategoriesSet.add("drinks");
                    }
                    onItemSelect([...activeCategoriesSet]);
                }}>Drinks</ToggleButton>
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