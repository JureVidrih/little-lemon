import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';

import { Txt } from '../base_components';

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
        case "greekSalad.jpg": image = require("../../assets/Images/greekSalad.png"); break;
        case "bruschetta.jpg": image = require("../../assets/Images/bruschetta.png"); break;
        case "grilledFish.jpg": image = require("../../assets/Images/grilledFish.png"); break;
        case "pasta.jpg": image = require("../../assets/Images/pasta.png"); break;
        case "lemonDessert.jpg": image = require("../../assets/Images/lemonDessert.png"); break;
    }

    return (
        <View style={[styles.container, { borderColor: theme.gray }]}>
            <View style={styles.leftContainer}>
                <Txt 
                textStyle="cardTitle"
                style={styles.dishName}>{name}</Txt>
                <Txt 
                textStyle="pregular"
                style={[styles.dishLabel, { color: theme.primary_1 }]} 
                numberOfLines={2}>{label}</Txt>
                <Txt 
                textStyle="phighlight"
                style={[styles.dishPrice]}>${price}</Txt>
            </View>
            <View style={styles.rightContainer}>
                <Image style={styles.dishImage} source={image} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        width: '100%',
        height: 100,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    leftContainer: {
        width: 100,
        height: '100%',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    rightContainer: {
        paddingLeft: 14,
        paddingTop: 7,
        width: null,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dishImage: {
        width: 72,
        height: 72
    },
    dishName: {

    },
    dishLabel: {

    },
    dishPrice: {

    }
});