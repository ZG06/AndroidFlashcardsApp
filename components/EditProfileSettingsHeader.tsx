import Text from "@/components/Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { Save } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";


type Props = {
    title: string,
    description: string;
    isSaveButtonVisible: boolean;
    onSave?: () => void;
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
                            weight="bold"
                            className="text-gray-900"
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
                        className={"flex-row items-center justify-center gap-x-3 bg-black h-10 rounded-md"}
                        style={{
                            paddingHorizontal: Platform.OS === 'web' ? 16 : 12
                        }}
                        onPress={onSave}
                    >
                        <Save size={16} color={"white"}/>
                        <Text
                            weight="medium"
                            className={"text-white"}
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