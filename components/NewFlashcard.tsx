import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function NewFlashcard({
    index = 1,
    onDelete,
    canDelete
}: {
    index?: number;
    onDelete?: () => void;
    canDelete: boolean;
}) {
    const [frontValue, setFrontValue] = useState('');
    const [backValue, setBackValue] = useState('');

    return (
        <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
            <View className={"flex-row justify-between"}>
                <Text className={"font-semibold text-[16px] mb-5"}>Card {index}</Text>
                <View className={"flex-row items-center gap-x-10"}>
                    {
                        // Preview icon
                    }
                    <TouchableOpacity className={"flex-row gap-x-1 hover:bg-gray-100 hover:rounded-md h-6 w-20 justify-center"}>
                        <MaterialIcons name="visibility" size={18} color="black" />
                        <Text className={"text-sm"}>Preview</Text>
                    </TouchableOpacity>
                    {
                        // Delete icon
                    }
                    {canDelete && (
                        <TouchableOpacity
                            className={"hover:bg-gray-100 hover:rounded-md h-6 w-8 items-center"}
                            onPress={onDelete}
                        >
                            <MaterialIcons name={"delete"} size={18} color={"red"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {
                // Deck question
            }
            <View className={"mb-5"}>
                <Text className={"mb-1.5"}>Front (Question)</Text>
                <TextInput
                    multiline={true}
                    value={frontValue}
                    onChangeText={setFrontValue}
                    className={"border-gray-200 border rounded-md px-3 text-gray-500 min-h-[70px] pt-2.5"}
                    placeholder={"Enter the question or prompt..."}
                />
            </View>
            <View>
                {
                    // Deck answer
                }
                <Text className={"mb-1.5"}>Back (Answer)</Text>
                <TextInput
                    multiline={true}
                    value={backValue}
                    onChangeText={setBackValue}
                    className={"border-gray-200 border rounded-md px-3 text-gray-500 min-h-[70px] pt-2.5"}
                    placeholder={"Enter the answer or explanation..."}
                />
            </View>
        </View>
    );
}
