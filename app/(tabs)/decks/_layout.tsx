import { Stack } from 'expo-router';
import React from 'react';

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
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="edit/[deckId]"
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="study/[deckId]"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="study/index"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}