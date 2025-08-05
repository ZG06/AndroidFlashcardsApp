import React from 'react';
import { Stack } from 'expo-router';
import EditProfileSettingsHeader from "@/components/EditProfileSettingsHeader";

export default function SettingsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
                options={{ title: 'Settings Main' }}
            />
            <Stack.Screen
                name="EditProfileSettings"
                options={{
                    header: () => (<EditProfileSettingsHeader />)
                }}
            />
        </Stack>
    );
}