import React from 'react';
import {Stack} from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={'index'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'register'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'login'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'resetPassword'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'verifyEmail'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'forgotPassword'}
                options={{headerShown: false}}
            />
        </Stack>
    );
}
