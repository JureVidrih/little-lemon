import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


import { useAppTheme } from '../../hooks/';

type HeroProps = {

};

export default function({

    }: HeroProps) {
    const theme = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.primary_1 }]}>
            <Text style={{ color: theme.primary_2, fontSize: 36, fontWeight: 'bold' }}>Little Lemon</Text>
            <Text style={{ color: '#ffffff', fontSize: 25 }}>Chicago</Text>
            <Text style={{ marginTop: 25, width: '55%', color: '#ffffff', fontSize: 18 }}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
            <Image 
            style={{ 
                width: 150, 
                height: 150, 
                position: 'absolute', 
                top: '50%', 
                right: 14, 
                transform: [{ translateY: '-50%' }] }}
            source={require("../../assets/Images/Hero_image.png")}
            resizeMode="cover" />
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