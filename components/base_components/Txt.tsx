import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

import { useAppTheme } from '../../hooks/';

type TxtProps = {
    children: React.ReactNode,
    style?: TextStyle,
    textStyle?: string
};

export default function({
    children = "Button",
    style,
    textStyle 
}: TxtProps) {
    const theme = useAppTheme();
    
    let textConfiguration: TextStyle = {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Arial'
    };

    switch(textStyle) {
        case "displayTitle": textConfiguration = {
            fontSize: 64,
            fontWeight: '500',
            color: '#000000',
            fontFamily: 'MarkaziText-Regular'
        }; break;
        case "subTitle": textConfiguration = {
            fontSize: 40,
            fontWeight: '400',
            color: '#000000',
            fontFamily: 'MarkaziText-Regular'
        }; break;
        case "lead": textConfiguration = {
            fontSize: 18,
            fontWeight: '500',
            color: '#000000',
            fontFamily: 'Karla-Regular'
        }; break;
        case "sectionTitle": textConfiguration = {
            fontSize: 20,
            fontWeight: '800',
            color: '#000000',
            fontFamily: 'Karla-Regular'
        }; break;
        case "sectionCategories": textConfiguration = {
            fontSize: 16,
            fontWeight: '800',
            color: '#000000',
            fontFamily: 'Karla-Regular'
        }; break;
        case "cardTitle": textConfiguration = {
            fontSize: 18,
            fontWeight: '700',
            color: '#000000',
            fontFamily: 'Karla-Regular'
        }; break;
        case "pregular": textConfiguration = {
            fontSize: 16,
            fontWeight: '400',
            color: '#495E57',
            fontFamily: 'Karla-Regular'
        }; break;
        case "phighlight": textConfiguration = {
            fontSize: 16,
            fontWeight: '500',
            color: '#495E57',
            fontFamily: 'Karla-Regular'
        }; break;
    }

    return (
        <Text style={[textConfiguration, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
});