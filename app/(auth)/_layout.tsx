import { Stack } from "expo-router";
import React from 'react';

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
                name={'reset-password'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'verify-email'}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={'forgot-password'}
                options={{headerShown: false}}
            />
        </Stack>
    );
}
