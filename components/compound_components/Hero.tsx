import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAppTheme } from '../../hooks/';
import { Txt } from '../base_components/'
import { HeroSearch } from './';

type HeroProps = {
    searchAction?: (arg0: string) => void
};

export default function({
    searchAction
    }: HeroProps) {
    const theme = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.primary_1 }]}>
            <Txt 
            textStyle="displayTitle"
            style={{ color: theme.primary_2, marginTop: -15, marginBottom: -27 }}>Little Lemon</Txt>
            <Txt 
            textStyle="subTitle"
            style={{ color: '#ffffff', marginBottom: 9 }}>Chicago</Txt>
            <Txt 
            textStyle="lead"
            style={{ width: '60%', color: '#ffffff' }}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Txt>
            <Image 
            style={{ 
                width: 150, 
                height: 150, 
                position: 'absolute', 
                top: '50%', 
                right: 14, 
                transform: [{ translateY: '-30%' }] }}
            source={require("../../assets/Images/Hero_image.png")}
            resizeMode="cover" />
            {searchAction && <HeroSearch searchAction={searchAction} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        width: '100%',
        height: 315,
        overflow: 'hidden'
    }
});