import React, {useEffect} from "react";
import './globals.css';
import {Stack, useRouter, useSegments} from "expo-router";
import {AuthContextProvider, useAuth} from "@/context/authContext";
import {SafeAreaView} from 'react-native-safe-area-context'
import {usePasswordResetRedirect} from "@/hooks/usePasswordResetRedirect";


const MainLayout = () => {
        const {isAuthenticated} = useAuth();
        const segments = useSegments();
        const router = useRouter();

        usePasswordResetRedirect();

        useEffect(() => {
            if (isAuthenticated === undefined) {
                return;
            }

            const currentPath = segments.join('/')
            const PUBLIC_ROUTES = [
                '(auth)',
                '(auth)/login',
                '(auth)/register',
                '(auth)/verify-email',
                '(auth)/forgot-password',
                '(auth)/reset-password',
                '+not-found'
            ];

            const isPublicRoute = PUBLIC_ROUTES.some(route => currentPath.startsWith(route));

            const inApp = segments.includes('(tabs)');

            if (isAuthenticated && !inApp) {
                router.replace('/(tabs)')
            } else if (isAuthenticated === false && !isPublicRoute) {
                router.replace('/(auth)');
            }
        }, [isAuthenticated, segments, router]);

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
