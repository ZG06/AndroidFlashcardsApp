import SearchBar from "@/components/SearchBar";
import Text from "@/components/Text";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";


export default function Decks() {

    return (
        <ScrollView style={{backgroundColor: '#E6EDFF'}}>
            {
                // Header
            }
            <View className={"flex justify-center items-start h-[160px] px-6 bg-white"}>
                <View className={"flex-row justify-between w-full py-4"}>
                    <Text weight="bold" className={"text-[24px] mb-4"}>My Decks</Text>
                    {
                        // New deck button
                    }
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black rounded-md px-3"}
                        style={{
                            height: 40,
                            width: 130
                        }}
                        onPress={() => router.push('/decks/new/')}
                    >
                        <Plus color="white" size={16}/>
                        <Text weight="semibold" className={"text-white text-[15px]"}>New Deck</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar />
            </View>
            <View className={"justify-center items-center mt-20"}>
                <Text className={"text-gray-500"}>No decks found.</Text>
            </View>
        </ScrollView>
    );
}
