import React, {useEffect, useState} from "react";
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import AuthInput from "@/components/AuthInput";
import {router} from "expo-router";
import AuthErrorBox from "@/components/AuthErrorBox";
import {ErrorType} from "@/types/ErrorType";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [errorType, setErrorType] = useState<ErrorType>(null);

    const handleSignIn = (email: string, password: string) => {
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
    }

    return (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
            <View className={"flex-1 items-center justify-center"}>
                <Image
                    source={require('../../assets/icon.png')}
                    className={"mb-2"}
                    style={{
                        height: 96,
                        width: 96
                    }}
                />
                <Text className={"font-bold text-3xl mb-3"}>Welcome Back</Text>
                <Text className={"text-gray-600 text-xl mb-8"}>Sign in to your FlashMaster account</Text>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto gap-y-5 mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 500 : 370
                    }}
                >
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
                        onPress={() => router.push('/forgotPassword')}
                    >
                        <Text className={"text-blue-500"}>Forgot password?</Text>
                    </TouchableOpacity>

                    {
                        // Sign In button
                    }
                    <TouchableOpacity
                        className={"bg-black items-center justify-center rounded-md"}
                        style={{
                            height: Platform.OS === 'web' ? 50 : 40
                        }}
                        onPress={() => handleSignIn(email, password)}
                    >
                        <Text className={"text-white font-medium text-lg"}>Sign In</Text>
                    </TouchableOpacity>

                    {
                        // Create account button
                    }
                    <View className={"flex-row justify-center"}>
                        <Text>
                            Don&#39;t have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/register')}
                        >
                            <Text className={"text-blue-500 font-semibold ml-1"}>
                                Create account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
