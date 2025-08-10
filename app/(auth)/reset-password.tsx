import AuthErrorBox from "@/components/AuthErrorBox";
import AuthInput from "@/components/AuthInput";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig";
import { ErrorType } from "@/types/ErrorType";
import { router, useLocalSearchParams } from "expo-router";
import { verifyPasswordResetCode } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

    export default function ResetPassword() {
        const [newPassword, setNewPassword] = useState('');
        const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
        const [confirmPassword, setConfirmPassword] = useState('');
        const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
        const [errorType, setErrorType] = useState<ErrorType>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [isOobCodeValid, setIsOobCodeValid] = useState<boolean | null>(null);

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

        useEffect(() => {
            const verifyOobCode = async () => {
                try {
                    await verifyPasswordResetCode(auth, normalizedOobCode);
                    setIsOobCodeValid(true);
                } catch {
                    setIsOobCodeValid(false);
                }
            }

            verifyOobCode();
        }, [normalizedOobCode])

        return isOobCodeValid ? (
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
        ) : isOobCodeValid === false ? (
            <ScrollView
                style={{backgroundColor: '#EBF2FF'}}
                contentContainerStyle={{flexGrow: 1}}
            >
                <View className={"flex-1 items-center justify-center"}>

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
                            <Text className={"font-bold text-red-600 text-xl mb-3"}>
                                Invalid Reset Link
                            </Text>
                            <Text className={"text-center text-[16px] text-gray-600 mx-3"}>
                                This password reset link is invalid or has expired.
                            </Text>
                        </View>
                        {
                            // Request new reset link button
                        }
                        <TouchableOpacity
                            className={"bg-black items-center justify-center rounded-md"}
                            onPress={() => router.push('/forgot-password')}
                            style={{
                                height: Platform.OS === 'web' ? 40 : 40
                            }}
                        >
                            <Text className={"text-white font-medium text-[16px]"}>
                                Request New Reset Link
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        ) : isOobCodeValid === null ? (
            <View className={"flex-1 items-center justify-center"}>
                <ActivityIndicator size={50} />
            </View>
        ) : null
    }
