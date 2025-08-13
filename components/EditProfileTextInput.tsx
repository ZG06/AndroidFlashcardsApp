import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from 'react';
import { Text, TextInput, View } from "react-native";


type Props = {
    title: string;
    placeholder: string
    icon?: string;
    required?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

function EditProfileTextInput({title, placeholder, icon = '', required = false, value, onChangeText}: Props) {
    return (
        <View className={"gap-y-3"}>
            <Text className={"font-medium"}>
                {title} {required && '*'}
            </Text>
            {icon ? (
                <View className={"flex-row items-center border-gray-200 border rounded-md min-h-12 pl-3"}>
                    <MaterialIcons name={icon as any} size={18} color={'gray'} />
                    <TextInput
                        className={"flex-1 h-full px-2 font-semibold"}
                        placeholder={placeholder}
                        placeholderTextColor={"gray"}
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
            ) : (
                <TextInput
                    className={"font-semibold border-gray-200 border rounded-md min-h-12 px-3"}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    value={value}
                    onChangeText={onChangeText}
                />
            )}
        </View>
    )
}

export default EditProfileTextInput
