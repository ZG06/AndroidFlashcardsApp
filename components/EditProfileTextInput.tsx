import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { Mail, User } from "lucide-react-native";
import React from 'react';
import { View } from "react-native";


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
            <Text weight="medium" className="text-gray-700">
                {title} {required && '*'}
            </Text>
            {icon ? (
                <View className={"flex-row items-center border-gray-200 border rounded-md min-h-12 pl-3"}>
                    {icon === 'person' && <User size={18} color={'#9CA3AF'} style={{ marginRight: 10 }} />}
                    {icon === 'email' && <Mail size={18} color={'#9CA3AF'} style={{ marginRight: 10 }} />}
                    <TextInput
                        className={"flex-1 h-full px-2"}
                        placeholder={placeholder}
                        placeholderTextColor={"gray"}
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
            ) : (
                <TextInput
                    className={"border-gray-200 border rounded-md min-h-12 px-3"}
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
