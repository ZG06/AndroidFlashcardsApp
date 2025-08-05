import React from 'react';
import {Stack} from 'expo-router';

export default function DecksLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="new/index"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}