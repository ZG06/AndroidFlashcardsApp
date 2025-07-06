import {StatusBar} from "react-native";
import React from "react";
import './globals.css';
import {Stack} from "expo-router";

export default function RootLayout() {

    return (
        <>
            <StatusBar hidden={true} />

            <Stack>
                <Stack.Screen
                    name={'(auth)'}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={'(tabs)'}
                    options={{headerShown: false}}
                />
            </Stack>
        </>
    );
}
