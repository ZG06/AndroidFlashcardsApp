import TextInput from '@/components/TextInput';
import { Search } from 'lucide-react-native';
import React, { useState } from "react";
import { View } from "react-native";

export default function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <View className={"flex-row items-center border-gray-200 h-12 border rounded-md px-2 w-full"}>
            <Search color={"#9CA3AF"} size={18} />
            <TextInput
                className={"border-gray-500 pl-2"}
                value={query}
                onChangeText={setQuery}
                placeholder={"Search decks..."}
                placeholderTextColor={"#6B7280"}
                style={{
                    fontSize: 14,
                }}
            />
        </View>
    );
}
