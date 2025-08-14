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
                    headerShown: true,
                    header: () => (
                        <EditProfileSettingsHeader
                            title="Edit Profile"
                            description="Update your personal information"
                            isSaveButtonVisible={true}
                        />
                    )
                }}
            />
            <Stack.Screen 
                name="change-password"
                options={{
                    headerShown: true,
                    header: () => (
                        <EditProfileSettingsHeader
                            title="Change Password"
                            description="Update your account password"
                            isSaveButtonVisible={false}
                        />
                    )
                }}
            />
        </Stack>
    );
}