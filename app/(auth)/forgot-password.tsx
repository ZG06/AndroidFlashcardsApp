import ActivityIndicator from "@/components/ActivityIndicator";
import AuthErrorBox from "@/components/AuthErrorBox";
import AuthInput from "@/components/AuthInput";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import Text from "@/components/Text";
import { useAuth } from "@/context/authContext";
import { ErrorType } from "@/types/ErrorType";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, ScrollView, TouchableOpacity, View } from "react-native";


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const {sendResetPasswordEmail} = useAuth();

    const handlePasswordReset = async (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Email format validation
        if (!regex.test(email)) {
            setErrorType('invalidEmail');
            return;
        }

        // Clear any previous errors
        if (errorType) setErrorType(null);

        setIsLoading(true);
        const response = await sendResetPasswordEmail(email);

        if (response.success) {
            setIsSent(true);
        } else {
            setErrorType(response.msg);
        }
        // Ensure isLoading is always set to false
        setIsLoading(false);
    }

    return isSent ? (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
            <View className={"flex-1 items-center justify-center"}>
                <Image
                    source={require('../../assets/icon.png')}
                    className={"mb-2"}
                    style={{
                        height: 72,
                        width: 72
                    }}
                />
                <Text weight="bold" className={"text-2xl mb-1"}>Check Your Email</Text>
                <Text className={"text-center text-gray-600 text-[19px] mb-8"}>We&#39;ve sent a password reset link to {email}</Text>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 420 : 320
                    }}
                >
                    {

                    }
                    <View className={"items-center mb-3"}>
                        {
                            // Error box
                        }
                        {errorType && (
                            <AuthErrorBox
                                errorType={errorType}
                            />
                        )}
                        <Text className={"text-center text-[16px] text-gray-600 mx-3"}>
                            Didn&#39;t receive the email? Check your spam folder or try again.
                        </Text>
                    </View>

                    {
                        // Try different email button
                    }
                    <TouchableOpacity
                        className={"bg-white items-center justify-center rounded-md border-[1px] border-gray-200"}
                        style={{
                            height: Platform.OS === 'web' ? 40 : 40
                        }}
                        onPress={() => setIsSent(false)}
                    >
                        <Text weight="medium" className={"text-black text-[16px]"}>
                            Try Different Email
                        </Text>
                    </TouchableOpacity>

                    {
                        // Back to sign in button
                    }
                    <TouchableOpacity
                        className={"bg-black items-center justify-center rounded-md"}
                        onPress={() => router.push('/login')}
                        style={{
                            height: Platform.OS === 'web' ? 40 : 40
                        }}
                    >
                        <Text weight="medium" className={"text-white text-[16px]"}>
                            Back to Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    ) : (
        <KeyboardAvoidingContainer>
            <View className={"flex-1 justify-center"}>
                <View
                    className={"w-full mx-auto px-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 500 : 370
                    }}
                >
                    <View className={"flex-row items-center self-start"} >
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialIcons name={"arrow-back"} size={22} color={"black"} />
                        </TouchableOpacity>
                        <Image
                            source={require('../../assets/icon.png')}
                            className={"mb-2 ml-4 mr-1"}
                            style={{
                                height: 42,
                                width: 42
                            }}
                        />
                        <Text weight="bold" className={"text-xl"}>FlashMaster</Text>
                    </View>
                </View>
                <View className={"items-center"}>
                    <Text weight="bold" className={"text-3xl mb-2 mt-8"}>Forgot Password?</Text>
                    <Text className={"text-gray-600 text-xl mb-8"}>Enter your email to reset your password</Text>
                </View>
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
                        label={"Email Address"}
                        placeholder={"Enter your email"}
                        icon={"email"}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {
                        // Displays an activity indicator or a Send Reset Link button depending on the isLoading state
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
                            onPress={() => handlePasswordReset(email)}
                        >
                            <Text weight="medium" className={"text-white text-[16px]"}>Send Reset Link</Text>
                        </TouchableOpacity>
                    )}

                    {
                        // Back to sign in button
                    }
                    <View className={"flex-row justify-center"}>
                        <Text className={"text-gray-700"}>
                            Remember your password?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/login')}
                        >
                            <Text weight="semibold" className={"text-blue-600 ml-1"}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingContainer>
    );
}
