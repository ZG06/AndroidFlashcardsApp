import * as Linking from 'expo-linking';
import { router } from "expo-router";
import { useEffect } from 'react';

export const usePasswordResetRedirect = () => {

    useEffect(() => {
        const handleDeepLink = (event: { url: string }) => {
            const {url} = event;
            if (!url.startsWith('https://flashcard-app.expo.app') && !url.startsWith('flash-master://')) return;

            const parsed = Linking.parse(url);
            const oobCode = parsed.queryParams?.oobCode;

            if (oobCode) {
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