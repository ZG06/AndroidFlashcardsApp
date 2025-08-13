import EditProfileSettingsHeader from "@/components/EditProfileSettingsHeader";
import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
                options={{ title: 'Settings Main' }}
            />
            <Stack.Screen
                name="edit"
                options={{
                    header: () => (<EditProfileSettingsHeader />)
                }}
            />
        </Stack>
    );
}