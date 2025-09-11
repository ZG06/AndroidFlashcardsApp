import ActivityIndicator from "@/components/ActivityIndicator";
import AuthErrorBox from "@/components/AuthErrorBox";
import AuthInput from "@/components/AuthInput";
import { GoogleSignInCustomButton } from "@/components/GoogleSignInCustomButton";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import Text from "@/components/Text";
import { useAuth } from "@/context/authContext";
import { ErrorType } from "@/types/ErrorType";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {login} = useAuth()

    const handleSignIn = async (email: string, password: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Checking if there are empty fields
        if (!password || !email) {
            setErrorType('emptyField');
            return;
        }

        // Email format validation
        if (!regex.test(email)) {
            setErrorType('invalidEmail');
            return;
        }

        // Setting error type to null if there are no errors
        if (errorType) setErrorType(null);

        setIsLoading(true);

        let response = await login(email, password);
        setIsLoading(false);

        if (!response.success) {
            setErrorType(response.msg);
        }
    }

    return (
        <KeyboardAvoidingContainer>
            <View className={"flex-1 items-center justify-center"}>
                <Image
                    source={require('../../assets/icon.png')}
                    className={"mb-2"}
                    style={{
                        height: 80,
                        width: 80
                    }}
                />
                <Text weight="bold" className={"text-3xl mb-3"}>Welcome Back</Text>
                <Text className={"text-gray-500 text-xl mb-8"}>Sign in to your account</Text>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto gap-y-5 mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 500 : 370
                    }}
                >

                    
                    <GoogleSignInCustomButton />

                    <View className="flex-row items-center justify-between gap-x-6 w-full mt-1">
                        <View className="flex-1 border-b border-gray-300" />
                        <Text className="text-gray-500">
                            or continue with email
                        </Text>
                        <View className="flex-1 border-b border-gray-300" />
                    </View>

                    {
                        // Error box
                    }
                    {errorType && (
                        <AuthErrorBox
                            errorType={errorType}
                        />
                    )}

                    {
                        // Email input
                    }
                    <AuthInput
                        label={"Email"}
                        placeholder={"Enter your email"}
                        icon={"email"}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {
                        // Password input
                    }
                    <AuthInput
                        label={"Password"}
                        placeholder={"Enter your password"}
                        icon={"lock"}
                        value={password}
                        onChangeText={setPassword}
                        isPasswordSecure={isPasswordSecure}
                        onShowPasswordPress={() => setIsPasswordSecure(prev => !prev)}
                    />

                    {
                        // Forgot password button
                    }
                    <TouchableOpacity
                        onPress={() => router.push('/forgot-password')}
                    >
                        <Text className={"text-end text-blue-600"}>Forgot password?</Text>
                    </TouchableOpacity>

                    {
                        // Displays an activity indicator or a signIn button depending on the isLoading state
                    }
                    {isLoading ? (
                        <View className={"items-center justify-center"}>
                            <ActivityIndicator size={50} />
                        </View>
                    ) : (
                        <TouchableOpacity
                            className={"bg-black items-center justify-center rounded-md"}
                            style={{
                                height: Platform.OS === 'web' ? 50 : 40
                            }}
                            onPress={() => handleSignIn(email, password)}
                        >
                            <Text weight="medium" className={"text-white text-lg"}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    )}

                    {
                        // Create account button
                    }
                    <View className={"flex-row justify-center"}>
                        <Text className="text-gray-600">
                            Don&#39;t have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/register')}
                        >
                            <Text weight="semibold" className={"text-blue-600 ml-1"}>
                                Create account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingContainer>
    );
}
