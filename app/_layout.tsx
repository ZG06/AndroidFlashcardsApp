import {StatusBar} from "react-native";
import React, {useEffect} from "react";
import './globals.css';
import {Stack, useRouter, useSegments} from "expo-router";
import {AuthContextProvider, useAuth} from "@/context/authContext";
import {SafeAreaView} from 'react-native-safe-area-context'


const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // check if user is authenticated or not
        if (typeof isAuthenticated === 'undefined') return;

        const inApp = segments[0] === '(tabs)';
        if (isAuthenticated && !inApp) {
            // redirect to home
            router.replace('/(tabs)')
        } else if (isAuthenticated === false) {
            // redirect to signIn
            router.replace('/(auth)');
        }
    }, [isAuthenticated]);

    return (
        <SafeAreaView className={"flex-1"}>
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
        </SafeAreaView>
    );
}

export default function RootLayout() {

    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    );
}
