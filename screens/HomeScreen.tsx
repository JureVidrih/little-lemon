import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import { Avatar, Button, Checkbox, Header, Input, InputAvatar, UIHeader } from '../components/base_components';
import { Hero, MenuCategories, MenuDishItem } from '../components/compound_components';
import { useSessionStorage } from '../hooks';
import * as db from '../database/database.ts';

export default function () {
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<any>();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return (
                    <UIHeader 
                        showAvatar={true} 
                        showBackButton={false}
                        avatarOnPress={() => {
                            navigation.navigate("ProfileScreen");
                        }}
                        avatarSource={sessionStorage.get("profileAvatarURI")} />
                );
            }
        });
    }, []);
    
    const sessionStorage = useSessionStorage();

    const [menuData, setMenuData] = useState([]);

    useLayoutEffect(() => {
        (async () => {
            await db.createTable();
            await db.fetchData("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json");

            const data: any = await db.getData(null, null);
            setMenuData(data);
        })();
    }, []);

    return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
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
