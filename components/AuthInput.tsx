import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";


type AuthProps = {
    label: string;
    placeholder: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    value: string;
    onChangeText: (text: string) => void;
    isPasswordSecure?: boolean;
    onShowPasswordPress?: () => void;
};

const AuthInput = ({
   label,
   placeholder,
   icon,
   value,
   onChangeText,
   onShowPasswordPress,
   isPasswordSecure
}: AuthProps) => {
    return (
        <View>
            <Text className={"text-gray-700 font-[500] mb-3"}>{label}</Text>
            <View className={`flex-row border-[0.5px] border-gray-300 rounded-lg items-center h-12 ${icon === 'lock' ? 'pr-1' : ''}`}>
                <MaterialIcons name={icon} size={18} color={"gray"} className={"ml-2"} />
                <View className={"flex-1 flex-row justify-between items-center space-x-2 size-full"}>
                    <TextInput
                        className={"flex-1 ml-2 pl-2 pr-2 size-full"}
                        placeholder={placeholder}
                        placeholderTextColor={"gray"}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={isPasswordSecure}
                    />
                    {icon === 'lock' && (
                        <TouchableOpacity
                            className={"items-center justify-center size-6"}
                            onPress={onShowPasswordPress}
                        >
                            <MaterialIcons name={`${isPasswordSecure ? 'visibility-off' : 'visibility'}`} size={18} color={"gray"} className={"text-center"} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

export default AuthInput;