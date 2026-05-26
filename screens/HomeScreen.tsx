import React, { useLayoutEffect, useState } from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { Hero, MenuCategories, MenuDishItem } from '../components/compound_components';

export default function App() {
    const insets = useSafeAreaInsets();

    const [menuData, setMenuData] = useState([]);

    useLayoutEffect(() => {
        fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json")
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            setMenuData(data.menu);
        });
    }, []);

    return (
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
        <UIHeader showAvatar={true} showBackButton={false}/>
        <Hero />
        <View style={{ width: "100%", height: null, paddingHorizontal: 14 }}>
            <MenuCategories />
        </View>
        <View style={{ width: "100%", flex: 1, paddingHorizontal: 14}}>
            <FlatList 
            data={menuData}
            renderItem={({item: {name, description, price, image}}) => {
                return (<MenuDishItem 
                        name={name}
                        label={description}
                        price={price}
                        imageSource={image}
                        />);
            }} />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
});
