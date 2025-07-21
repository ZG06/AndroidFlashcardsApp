import React, {useState} from "react";
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import AuthInput from "@/components/AuthInput";
import {router} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    return (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
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
                        // Send reset link button
                    }
                    <TouchableOpacity
                        className={"bg-black items-center justify-center rounded-md"}
                        style={{
                            height: Platform.OS === 'web' ? 50 : 40
                        }}
                    >
                        <Text className={"text-white font-medium text-[16px]"}>Send Reset Link</Text>
                    </TouchableOpacity>

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
        </ScrollView>
    );
}
