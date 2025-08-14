import Text from "@/components/Text";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, ScrollView, TouchableOpacity, View } from "react-native";


export default function Index() {
    return (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
            <View className={"flex-1 items-center justify-center"}>
                <Image
                className="mb-3"
                    source={require('../../assets/icon.png')}
                    style={{
                        height: 96,
                        width: 96
                    }}
                />
                <Text weight="bold" className={"text-4xl mb-3"}>FlashMaster</Text>
                <Text className={"text-gray-600 text-xl mb-8"}>Digital flashcards for learning</Text>

                {
                    // Create account button
                }
                <TouchableOpacity
                    className={"bg-black items-center justify-center rounded-md w-full max-w-[450px]"}
                    style={{
                        height: Platform.OS === 'web' ? 50 : 40,
                        width: Platform.OS === 'web' ? 400 : 300
                    }}
                    onPress={() => router.push('/register')}
                >
                    <Text weight="medium" className={"text-white text-lg"}>Create Account</Text>
                </TouchableOpacity>

                {
                    // Sign in button
                }
                <TouchableOpacity
                    className={"bg-white items-center justify-center rounded-md w-full max-w-[450px]"}
                    style={{
                        height: Platform.OS === 'web' ? 50 : 40,
                        width: Platform.OS === 'web' ? 400 : 300
                    }}
                    onPress={() => router.push('/login')}
                >
                    <Text weight="medium" className={"text-black text-lg"}>Sign In</Text>
                </TouchableOpacity>
                <Text className={"text-center text-xs text-gray-500 mt-8"}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </ScrollView>
    );
}
