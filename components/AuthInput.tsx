import {Text, TextInput, TouchableOpacity, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";


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
            <Text className={"text-gray-800 font-[500] mb-3"}>{label}</Text>
            <View className={"flex-row border-[0.5px] border-gray-300 rounded-lg items-center h-12"}>
                <MaterialIcons name={icon} size={18} color={"gray"} className={"ml-2"} />
                <TextInput
                    className={"flex-1 ml-2 mr-2"}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPasswordSecure}
                />
                {icon === 'lock' && (
                    <TouchableOpacity
                        onPress={onShowPasswordPress}
                    >
                        <MaterialIcons name={`${isPasswordSecure ? 'visibility-off' : 'visibility'}`} size={18} color={"gray"} className={"mr-3"} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default AuthInput;