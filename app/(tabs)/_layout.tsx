import React from 'react';
import {Text, View} from "react-native";
import {Tabs} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


type HeaderProps = {
    title: string;
    description: string;
}

const TabIcon = ({ focused, icon, title }) => {
    const color = focused ? '#2563EB' : '#9CA3AF';

    return (
        <View className={"justify-center items-center min-w-[100px]"}>
            <MaterialIcons name={icon} color={color} size={24} />
            <Text className={focused ? "text-blue-600 font-medium" : "text-gray-400"} numberOfLines={1}>{title}</Text>
        </View>
    )
}

const Header = ({title, description}: HeaderProps) => {
    return (
        <View className={"flex justify-center items-start h-[120px] px-4 bg-white"}>
            <Text className={"text-[24px] font-bold"}>{title}</Text>
            <Text className={"text-gray-500 font-medium text-lg"}>{description}</Text>
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
                    header: () => (<Header title={"Good morning! 👋"} description={"Ready to learn something new?"} />),
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
                    header: () => (<Header title={"Settings"} description={"Customize your learning experience"} />),
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={'settings'} title={'Settings'} />
                    )
                }}
            />
        </Tabs>
    );
}
