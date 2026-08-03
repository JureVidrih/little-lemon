import React from 'react';
import { View, Image } from 'react-native';

import { useAppTheme } from '../../../hooks/';

import Txt from '../../base_components/Txt/Txt.tsx'
import HeroSearch from '../HeroSearch/HeroSearch.tsx';

import styles from './HeroStyles.ts';

type HeroProps = {
    searchAction?: (arg0: string) => void
};

export default function({
    searchAction
    }: HeroProps) {
    const theme = useAppTheme();

    return (
        <View testID="hero-outer-container" style={[styles.container, { backgroundColor: theme.primary_1 }]}>
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
            source={require("../../../../assets/Images/Hero_image.png")}
            resizeMode="cover" />
            {searchAction && <HeroSearch searchAction={searchAction} />}
        </View>
    );
}