import ActivityIndicator from "@/components/ActivityIndicator";
import AuthErrorBox from "@/components/AuthErrorBox";
import AuthInput from "@/components/AuthInput";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import { useAuth } from "@/context/authContext";
import { ErrorType } from "@/types/ErrorType";
import { router } from "expo-router";
import { Lock, Save } from 'lucide-react-native';
import { useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";

export default function ChangePasswordSettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [isCurrentPasswordSecure, setIsCurrentPasswordSecure] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isConfirmNewPasswordSecure, setIsConfirmNewPasswordSecure] = useState(true);
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {changePassword} = useAuth();

    const handleChangePassword = async () => {
        // Checking if there are empty fields
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setErrorType('emptyField');
            return;
        }

        // Checking if both new passwords are the same
        if (newPassword !== confirmNewPassword) {
            setErrorType('notSamePasswords');
            return;
        }

        if (newPassword === currentPassword) {
            setErrorType('samePasswords');
            return;
        }

        // Setting error type to null if there are no errors
        if (errorType) setErrorType(null);

        // Settings isLoading to true when registering a user to display an activity indicator
        setIsLoading(true);

        let response = await changePassword(currentPassword, newPassword);
        setIsLoading(false);

        if (!response.success) {
            setErrorType(response.msg);
        } else {
            if (Platform.OS === 'android') {
                Alert.alert(
                    'Success',
                    'Your password has been changed successfully',
                    [
                        {
                            text: 'OK',
                        }
                    ]
                );
            } else if (Platform.OS === 'web') {
                window.alert('Your password has been changed successfully');
            }

            router.replace('/(tabs)');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
    }

    return (
        <KeyboardAvoidingContainer>
            <View className={"flex-1 items-center justify-center"}>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto gap-y-5 mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 500 : 370
                    }}
                >
                    <View className="flex-row items-center gap-x-2 mb-2">
                        <Lock size={20} color={"#2563eb"} />
                        <Text className="text-2xl font-semibold">
                            Password Security
                        </Text>
                    </View>

                    {
                        // Error box
                    }
                    {errorType && (
                        <AuthErrorBox
                            errorType={errorType}
                        />
                    )}

                    {/* Current password input */}
                    <AuthInput
                        label="Current Password"
                        placeholder="Enter your current password"
                        icon="lock"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        isPasswordSecure={isCurrentPasswordSecure}
                        onShowPasswordPress={() => setIsCurrentPasswordSecure(prev => !prev)}
                    />

                    {/* New password input */}
                    <AuthInput
                        label="New Password"
                        placeholder="Enter your new password"
                        icon="lock"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        isPasswordSecure={isNewPasswordSecure}
                        onShowPasswordPress={() => setIsNewPasswordSecure(prev => !prev)}
                    />
                    <Text className="text-gray-500 text-xs -mt-3">
                        Password must contain at least 8 characters with uppercase, lowercase, and numbers
                    </Text>

                    {/* Confirm new password input */}
                    <AuthInput
                        label="Confirm New Password"
                        placeholder="Confirm your new password"
                        icon="lock"
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        isPasswordSecure={isConfirmNewPasswordSecure}
                        onShowPasswordPress={() => setIsConfirmNewPasswordSecure(prev => !prev)}
                    />

                    <View className="flex-row items-center justify-between gap-x-12 mt-4">
                        {/* Cancel button */}
                        <TouchableOpacity
                            className={"flex-1 bg-white items-center justify-center rounded-md border border-gray-200"}
                            style={{
                                height: Platform.OS === 'web' ? 40 : 30
                            }}
                            onPress={() => router.back()}
                        >
                            <Text className={"text-black font-medium text-[16px]"}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        {isLoading ? (
                            // Show activity indicator while waiting for password update
                            <View className={"items-center justify-center"}>
                                <ActivityIndicator size={50} />
                            </View>
                        ) : (
                            // Update password button
                            <TouchableOpacity
                                className={"flex-1 bg-black items-center justify-center rounded-md gap-x-2"}
                                style={{
                                    height: Platform.OS === 'web' ? 40 : 30
                                }}
                                onPress={handleChangePassword}
                            >
                                <View className="flex-row items-center gap-x-2">
                                    <Save size={16} color={'white'} />
                                    <Text className={`text-white font-medium ${Platform.OS === 'web' ? 'text-[16px]' : 'text-[14px]'}`}>
                                        Update Password
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        
                    </View>
                    
                </View>
            </View>
        </KeyboardAvoidingContainer>
    )
}