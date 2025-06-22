import React from 'react';
import {Text, View} from "react-native";
import {Tabs} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


const TabIcon = ({ focused, icon, title }) => {
    const color = focused ? '#2563EB' : '#9CA3AF';

    return (
        <View className={"justify-center items-center min-w-[100px]"}>
            <MaterialIcons name={icon} color={color} size={24} />
            <Text className={focused ? "text-blue-600 font-medium" : "text-gray-400"} numberOfLines={1}>{title}</Text>
        </View>
    )
}

const AppHeader = () => {
    return (
        <View className={"flex justify-center items-start h-[100px] px-4 bg-white"}>
            <Text className={"text-[20px] font-bold"}>Good morning! 👋</Text>
            <Text className={"text-gray-500 font-medium"}>Ready to learn something new?</Text>
        </View>
    )
}

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80
                },
                tabBarItemStyle: {
                    paddingVertical: 10
                }
            }}
        >
            <Tabs.Screen
                name={"index"}
                options={{
                    title: 'Home',
                    header: () => (<AppHeader />),
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={'home'} title={'Home'} />
                    )
                }}
            />
            <Tabs.Screen
                name={"decks"}
                options={{
                    title: 'Decks',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={'layers'} title={'Decks'} />
                    )
                }}
            />
            <Tabs.Screen
                name={"settings"}
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={'settings'} title={'Settings'} />
                    )
                }}
            />
        </Tabs>
    );
}
