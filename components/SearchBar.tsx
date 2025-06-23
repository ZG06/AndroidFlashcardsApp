import {TextInput, View} from "react-native";
import React, {useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <View className={"flex-row items-center border-gray-200 h-10 border rounded-md px-2 w-full"}>
            <MaterialIcons name={"search"} color={"gray"} size={18} />
            <TextInput
                className={"border-gray-500 pl-2"}
                value={query}
                onChangeText={setQuery}
                placeholder={"Search decks..."}
                placeholderTextColor={"#999"}
                style={{
                    fontSize: 14
                }}
            />
        </View>
    );
}
