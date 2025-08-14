import ActivityIndicator from "@/components/ActivityIndicator";
import AuthErrorBox from "@/components/AuthErrorBox";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import Text from "@/components/Text";
import { useAuth } from "@/context/authContext";
import { ErrorType } from "@/types/ErrorType";
import { router } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";


export default function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorType, setErrorType] = useState<ErrorType>(null);

    const {resendVerificationEmail} = useAuth();

    const handleSendVerificationEmail = async () => {
        setIsLoading(true);

        let response = await resendVerificationEmail();

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
                        height: 64,
                        width: 64
                    }}
                />
                <Text weight="bold" className={"text-2xl mb-1"}>Verify Your Email</Text>
                <Text className={"text-gray-600 text-[18px] mb-8"}>We&#39;ve sent a verification link to your email</Text>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 460 : 320
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
                        <CheckCircle size={64} color={'#22C55E'} style={{ marginBottom: 16 }} />
                        <Text weight="semibold" className={"text-center text-lg mb-3"}>
                            Check your inbox
                        </Text>
                        <Text className={"text-center text-[15px] text-gray-600 mx-3"}>
                            Click the verification link in the email we sent you to activate your account.
                        </Text>
                    </View>

                    {
                        // Displays an activity indicator or a Resend Email button depending on the isLoading state
                    }
                    {isLoading ? (
                        <View className={"items-center justify-center"}>
                            <ActivityIndicator size={50} />
                        </View>
                    ) : (
                        <TouchableOpacity
                            className={"bg-white items-center justify-center rounded-md border-[1px] border-gray-200"}
                            style={{
                                height: Platform.OS === 'web' ? 40 : 40
                            }}
                            onPress={handleSendVerificationEmail}
                        >
                            <Text weight="medium" className={"text-black text-[14px]"}>Resend Email</Text>
                        </TouchableOpacity>
                    )}

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
                        <Text weight="medium" className={"text-white text-[14px]"}>Back to Sign In</Text>
                    </TouchableOpacity>

                    {
                        // Horizontal divider
                    }
                    <View className={"border-b-[1px] border-b-gray-200 my-4"} />

                    {
                        // Instruction text
                    }
                    <Text className={"text-center text-xs text-gray-500"}>
                        Didn&#39;t receive the email? Check your spam folder or contact support.
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingContainer>
    );
}
