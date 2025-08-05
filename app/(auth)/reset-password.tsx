    import React, {useEffect, useState} from "react";
    import {Image, Linking, Platform, Text, TouchableOpacity, View} from "react-native";
    import AuthInput from "@/components/AuthInput";
    import {router, useLocalSearchParams} from "expo-router";
    import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
    import ActivityIndicator from "@/components/ActivityIndicator";
    import {useAuth} from "@/context/authContext";
    import {useSearchParams} from "expo-router/build/hooks";
    import AuthErrorBox from "@/components/AuthErrorBox";
    import {ErrorType} from "@/types/ErrorType";

    export default function ResetPassword() {
        const [newPassword, setNewPassword] = useState('');
        const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
        const [errorType, setErrorType] = useState<ErrorType>(null);
        const [isLoading, setIsLoading] = useState(false);

        const { oobCode } = useLocalSearchParams();
        const {resetPassword} = useAuth();

        const normalizedOobCode = Array.isArray(oobCode) ? oobCode[0] : oobCode;

        const handlePasswordReset = async (code: string, newPassword: string) => {
            // Checking if both passwords are the same
            if (newPassword !== confirmPassword) {
                setErrorType('notSamePasswords');
                return;
            }

            try {
                setIsLoading(true);
                const result = await resetPassword(code, newPassword);
                setIsLoading(false);

                if (result.success) {
                    router.replace('/login');
                }
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <KeyboardAvoidingContainer>
                <View className={"flex-1 items-center justify-center"}>
                    <Image
                        source={require('../../assets/icon.png')}
                        className={"mb-2"}
                        style={{
                            height: 96,
                            width: 96
                        }}
                    />
                    <Text className={"font-bold text-3xl mb-3"}>Reset Password</Text>
                    <Text className={"text-gray-600 text-xl mb-8"}>Enter your new password</Text>
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
                            // New password input
                        }
                        <AuthInput
                            label={"New Password"}
                            placeholder={"Enter new password"}
                            icon={"lock"}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            isPasswordSecure={isNewPasswordSecure}
                            onShowPasswordPress={() => setIsNewPasswordSecure(prev => !prev)}
                        />

                        {
                            // Confirm new Password
                        }
                        <AuthInput
                            label={"Password"}
                            placeholder={"Confirm new password"}
                            icon={"lock"}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            isPasswordSecure={isConfirmPasswordSecure}
                            onShowPasswordPress={() => setIsConfirmPasswordSecure(prev => !prev)}
                        />

                        {
                            // Displays an activity indicator or a Reset Password button depending on the isLoading state
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
                                onPress={() => handlePasswordReset(normalizedOobCode, newPassword)}
                            >
                                <Text className={"text-white font-medium text-lg"}>
                                    Reset Password
                                </Text>
                            </TouchableOpacity>
                        )}

                        {
                            // Sign In button
                        }
                        <View className={"flex-row justify-center"}>
                            <Text>
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
