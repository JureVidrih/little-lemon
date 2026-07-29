import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAppTheme } from '../../../hooks/';

import Txt from '../../base_components/Txt/Txt.tsx';

import styles from './MenuDishItemStyles.ts';

type MenuDishItemProps = {
    name: string,
    label: string,
    price: number,
    imageSource?: string
};

export default function({
        name,
        label,
        price,
        imageSource
    }: MenuDishItemProps) {
    const theme = useAppTheme();

    let image = null;

    switch(imageSource) {
        case "greekSalad.jpg": image = require("../../../../assets/Images/greekSalad.png"); break;
        case "bruschetta.jpg": image = require("../../../../assets/Images/bruschetta.png"); break;
        case "grilledFish.jpg": image = require("../../../../assets/Images/grilledFish.png"); break;
        case "pasta.jpg": image = require("../../../../assets/Images/pasta.png"); break;
        case "lemonDessert.jpg": image = require("../../../../assets/Images/lemonDessert.png"); break;
    }

    return (
        <View testID="outerContainer" style={[styles.container, { borderColor: theme.gray }]}>
            <View style={styles.leftContainer}>
                <Txt 
                textStyle="cardTitle"
                >{name}</Txt>
                <Txt 
                textStyle="pregular"
                style={[{ color: theme.primary_1 }]} 
                numberOfLines={2}>{label}</Txt>
                <Txt 
                textStyle="phighlight"
                >${price}</Txt>
            </View>
            <View style={styles.rightContainer}>
                <Image style={styles.dishImage} source={image} />
            </View>
        </View>
    );
}