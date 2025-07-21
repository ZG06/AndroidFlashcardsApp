import React, {useState} from "react";
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import AuthInput from "@/components/AuthInput";
import {router} from "expo-router";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";


export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

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
                        // Reset password button
                    }
                    <TouchableOpacity
                        className={"bg-black items-center justify-center rounded-md"}
                        style={{
                            height: Platform.OS === 'web' ? 50 : 40
                        }}
                    >
                        <Text className={"text-white font-medium text-lg"}>Reset Password</Text>
                    </TouchableOpacity>

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
