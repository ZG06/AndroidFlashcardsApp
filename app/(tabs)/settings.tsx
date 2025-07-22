import {Pressable, Text, View} from "react-native";
import React from "react";
import {useAuth} from "@/context/authContext";

export default function Settings() {
    const {logout} = useAuth();
    const handleLogout = async () => {
        await logout();
    }

    return (
        <View className={"items-center justify-center h-full"}>
            <Pressable onPress={handleLogout}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    );
}