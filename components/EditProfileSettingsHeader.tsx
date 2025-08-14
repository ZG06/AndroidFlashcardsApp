import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";


type Props = {
    title: string,
    description: string;
    isSaveButtonVisible: boolean;
    onSave: () => void;
}

const EditProfileSettingsHeader = ({title, description, isSaveButtonVisible, onSave}: Props) => {
    const navigation = useNavigation();

    return (
        <View className={"justify-center h-[130px] px-4 bg-white"}>
            <View className={"flex-row items-center justify-between w-full"}>
                <View className={"flex-row items-center gap-x-4"}>
                    {
                        // Arrow back to settings
                    }
                    <TouchableOpacity onPress={navigation.goBack}>
                        <MaterialIcons name={"arrow-back"} size={24} color={"black"} />
                    </TouchableOpacity>

                    {
                        // Page description
                    }
                    <View>
                        <Text
                            className={"font-bold"}
                            style={{
                                fontSize: Platform.OS === 'web' ? 25 : 20
                            }}
                        >
                            {title}
                        </Text>
                        <Text
                            className={"text-gray-600 leading-8"}
                            style={{
                                fontSize: Platform.OS === 'web' ? 18 : 14
                            }}
                        >
                            {description}
                        </Text>
                    </View>
                </View>

                {isSaveButtonVisible && (
                    // Save settings button
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black h-10 rounded-md"}
                        style={{
                            paddingHorizontal: Platform.OS === 'web' ? 14 : 8
                        }}
                        onPress={onSave}
                    >
                        <MaterialIcons name={"save"} color={"white"} size={Platform.OS === 'web' ? 22 : 16}/>
                        <Text
                            className={"text-white font-medium"}
                            style={{
                                fontSize: Platform.OS === 'web' ? 16 : 14
                            }}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default EditProfileSettingsHeader;