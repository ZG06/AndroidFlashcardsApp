import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native';
import React from "react";
import { TouchableOpacity, View } from "react-native";


type AuthProps = {
    label: string;
    placeholder: string;
    icon: string;
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
            <Text weight="medium" className={"text-gray-700 mb-3"}>{label}</Text>
            <View className={`flex-row border-[0.5px] border-gray-300 rounded-lg items-center h-12 ${icon === 'lock' ? 'pr-1' : ''}`}>
            {icon === 'email' && <Mail size={16} color={"#9CA3AF"} style={{ marginLeft: 10 }} />}
            {icon === 'lock' && <Lock size={16} color={"#9CA3AF"} style={{ marginLeft: 10 }} />}
            {icon === 'person' && <User size={16} color={"#9CA3AF"} style={{ marginLeft: 10 }} />}
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
                            {isPasswordSecure ? (
                                <EyeOff size={16} color={"gray"} />
                            ) : (
                                <Eye size={16} color={"gray"} />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

export default AuthInput;