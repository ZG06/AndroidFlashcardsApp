import TextInput from '@/components/TextInput';
import { Search } from 'lucide-react-native';
import React from "react";
import { View } from "react-native";


type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function SearchBar({searchQuery, setSearchQuery}: Props) {
    return (
        <View className={"flex-row items-center border-gray-200 h-12 border rounded-md pl-2 w-full"}>
            <Search color={"#9CA3AF"} size={18} />
            <TextInput
                className={"flex-1 border-gray-500 ml-2 pl-2 size-full"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={"Search decks..."}
                placeholderTextColor={"#6B7280"}
                style={{
                    fontSize: 14,
                }}
            />
        </View>
    );
}
