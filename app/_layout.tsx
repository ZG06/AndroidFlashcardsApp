import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from "expo-font";
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import './globals.css';


SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const [loaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    });

    {/* Configure notifications and request permissions for them when the app starts */}
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowBanner: true,
                shouldShowList: true
            }),
        });

        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Notification permissions not granted');
            }
        };
        
        requestPermissions();
    }, [])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded])

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