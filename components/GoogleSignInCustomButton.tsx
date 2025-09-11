import ActivityIndicator from '@/components/ActivityIndicator';
import Text from '@/components/Text';
import { auth } from '@/firebaseConfig';
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes
} from '@react-native-google-signin/google-signin';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity, View } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

export const GoogleSignInCustomButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: 'REDACTED',
        responseType: 'id_token'
    });


    // Android Google sign in function
    const handleAndroidGoogleSignIn = async () => {

        try {
            GoogleSignin.configure({
                webClientId: "REDACTED",
            });
            
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(response.data?.idToken);
            await signInWithCredential(auth, googleCredential);
            router.replace('/(tabs)');
        } catch (error) {
            if (isErrorWithCode(error)) {
              switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    Alert.alert('Sign in is in progress');
                  break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    Alert.alert('Play services not available');
                  break;
              }
            } else {
                Alert.alert('An unexpected error occured');
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Web Google sign in function
    const handleWebSignIn = async () => {
        try {
            setIsLoading(true);
            const result = await promptAsync();

            if (result?.type === 'success') {
                const idToken = result.params?.id_token;
                const accessToken = result.params?.access_token;
                
    
                if (idToken) {
                    const credential = GoogleAuthProvider.credential(idToken, accessToken);
                    setIsLoading(true);
                    
                    await signInWithCredential(auth, credential);
                    router.replace('/(tabs)');
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Decides what Google sign in function to use depending on the user OS
    const handleSignIn = async () => {
        if (Platform.OS === 'web') {
            await handleWebSignIn();
        } else {
            await handleAndroidGoogleSignIn();
        }
    }

    return isLoading ? (
        <View className="flex-row items-center justify-center border border-gray-300 rounded-md gap-x-3 py-3 opacity-50">
            <ActivityIndicator size={20} />
            <Text weight='medium' className='text-gray-700'>
                Signing in...
            </Text>
        </View>
    ) : (
        <TouchableOpacity
            className='flex-row items-center justify-center border border-gray-300 rounded-md gap-x-3 py-3'
            onPress={handleSignIn}
            disabled={isLoading}
        >
            <Image
                source={require('@/assets/images/google_icon.png')}
                resizeMode='contain'
                style={{
                    height: 20,
                    width: 20
                }}
            />
            <Text weight='medium' className='text-gray-700'>
                Sign in with Google
            </Text>
        </TouchableOpacity>
    )
}