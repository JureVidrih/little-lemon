import React, { useLayoutEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

import { useAppTheme } from '../../../hooks/';

import ToggleButton from '../../base_components/ToggleButton/ToggleButton.tsx';
import Txt from '../../base_components/Txt/Txt.tsx';

import styles from './MenuCategoriesStyles.ts';

type MenuCategoriesProps = {
    onItemSelect: (arg0: any) => void
};

export default function({
        onItemSelect
    }: MenuCategoriesProps) {
    const dimensions = useWindowDimensions();
    const theme = useAppTheme();

    const activeCategoriesSet = useRef(new Set()).current;

    useLayoutEffect(() => {
        onItemSelect?.([...activeCategoriesSet]);
    }, []);

    return (
        <View testID="menucategories-outer-container" style={[styles.container, { backgroundColor: "#ffffff", borderBottomColor: theme.gray }]}>
            <Txt 
            textStyle="sectionTitle">{"Order for delivery!".toUpperCase()}</Txt>
            <View style={[styles.categoriesContainer, (dimensions.width >= 600 ? { justifyContent: 'flex-start' } : null)]}>
                <ToggleButton 
                style={(dimensions.width >= 600 ? { marginRight: 10 } : null)}
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
                style={(dimensions.width >= 600 ? { marginRight: 10 } : null)}
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
                style={(dimensions.width >= 600 ? { marginRight: 10 } : null)}
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
                style={(dimensions.width >= 600 ? { marginRight: 10 } : null)}
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