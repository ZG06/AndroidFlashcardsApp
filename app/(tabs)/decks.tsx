import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Deckws() {

    return (
        <View>
            {
                // Header
            }
            <View className={"flex justify-center items-start h-[160px] px-6 bg-white"}>
                <View className={"flex-row justify-between w-full py-2"}>
                    <Text className={"text-[24px] font-bold mb-4"}>My Decks</Text>
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black h-9 w-[110px] rounded-md px-3"}
                    >
                        <MaterialIcons name={"add"} color={"white"} size={15}/>
                        <Text className={"text-white font-semibold text-[13px]"}>New Deck</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar />
            </View>
            <View className={"justify-center items-center mt-20"}>
                <Text className={"text-gray-500"}>No decks found.</Text>
            </View>
        </View>
    );
}
