import AuthInput from "@/components/AuthInput";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import { Lock, Save } from 'lucide-react-native';
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function ChangePasswordSettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
                        <Lock size={20} className="text-blue-600" />
                        <Text className="text-2xl font-semibold">
                            Password Security
                        </Text>
                    </View>

                    {/* Current password input */}
                    <AuthInput
                        label="Current Password"
                        placeholder="Enter your current password"
                        icon="lock"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />

                    {/* New password input */}
                    <AuthInput
                        label="New Password"
                        placeholder="Enter your new password"
                        icon="lock"
                        value={newPassword}
                        onChangeText={setNewPassword}
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
                    />

                    <View className="flex-row items-center justify-between gap-x-12 mt-4">
                        {/* Cancel button */}
                        <TouchableOpacity
                            className={"flex-1 bg-white items-center justify-center rounded-md border border-gray-200"}
                            style={{
                                height: Platform.OS === 'web' ? 40 : 30
                            }}
                        >
                            <Text className={"text-black font-medium text-[16px]"}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        {/* Update password button */}
                        <TouchableOpacity
                            className={"flex-1 flex-row bg-black items-center justify-center rounded-md gap-x-2"}
                            style={{
                                height: Platform.OS === 'web' ? 40 : 30
                            }}
                        >
                            <Save size={16} className="text-white" />
                            <Text className={"text-white font-medium text-[16px]"}>
                                Update Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </KeyboardAvoidingContainer>
    )
}