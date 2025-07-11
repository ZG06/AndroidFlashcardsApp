import React from "react";
import {Text, View, Image, TouchableOpacity, ScrollView, Platform} from "react-native";
import {router} from "expo-router";


export default function Index() {
    return (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
            <View className={"flex-1 items-center justify-center"}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{
                        height: 128,
                        width: 128
                    }}
                />
                <Text className={"font-bold text-4xl mb-3"}>FlashMaster</Text>
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
                    <Text className={"text-white font-bold text-lg"}>Create Account</Text>
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
                    <Text className={"text-black font-bold text-lg"}>Sign In</Text>
                </TouchableOpacity>
                <Text className={"text-center text-gray-500 mt-8"}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </ScrollView>
    );
}
