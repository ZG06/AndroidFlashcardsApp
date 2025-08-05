import React, {useState} from "react";
import {Alert, Image, Platform, Text, TouchableOpacity, View} from "react-native";
import AuthInput from "@/components/AuthInput";
import {router} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {ErrorType} from "@/types/ErrorType";
import AuthErrorBox from "@/components/AuthErrorBox";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import ActivityIndicator from "@/components/ActivityIndicator";
import {useAuth} from "@/context/authContext";


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            // Display a success message to the user
            Alert.alert("Success", "A password reset link has been sent to your email address.");
            // Redirect the user back to the login screen
            router.replace('/(auth)/login');
        } else {
            setErrorType(response.msg);
        }
        // Ensure isLoading is always set to false
        setIsLoading(false);
    }

    return (
        <KeyboardAvoidingContainer>
            <View className={"flex-1 items-starts justify-center"}>
                <View className={"flex-row items-center mx-auto"}>
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
                    <Text className={"font-bold text-xl"}>FlashMaster</Text>
                </View>
                <View className={"items-center"}>
                    <Text className={"font-bold text-3xl mb-3"}>Forgot Password?</Text>
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
                            <Text className={"text-white font-medium text-[16px]"}>Send Reset Link</Text>
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
                            <Text className={"text-blue-500 font-semibold ml-1"}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingContainer>
    );
}
