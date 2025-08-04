import {useEffect} from 'react';
import * as Linking from 'expo-linking';
import {useAuth} from "@/context/authContext";
import {router} from "expo-router";

export const usePasswordResetRedirect = () => {

    useEffect(() => {
        const handleDeepLink = (event: { url: string }) => {
            const {url} = event;
            const parsed = Linking.parse(url);
            const oobCode = parsed.queryParams?.oobCode;
            const mode = parsed.queryParams?.mode;

            if (mode === 'resetPassword' && oobCode) {
                router.replace(`/(auth)/resetPassword?oobCode=${oobCode}`);
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({url});
        });

        return () => subscription.remove();
    }, []);
}