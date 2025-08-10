import * as Linking from 'expo-linking';
import { router } from "expo-router";
import { useEffect } from 'react';

export const usePasswordResetRedirect = () => {

    useEffect(() => {
        const handleDeepLink = (event: { url: string }) => {
            const {url} = event;
            const parsed = Linking.parse(url);
            const oobCode = parsed.queryParams?.oobCode;
            const mode = parsed.queryParams?.mode;

            if (mode === 'resetPassword' && oobCode) {
                router.replace(`/(auth)/reset-password?oobCode=${oobCode}`);
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({url});
        });

        return () => subscription.remove();
    }, []);
}