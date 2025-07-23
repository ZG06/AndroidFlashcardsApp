import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useAuth} from "@/context/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Settings() {
    const {logout} = useAuth();
    const handleLogout = async () => {
        await logout();
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>
            {
                // Today's progress card
            }
            <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-8"}>
                <View className={"flex-row justify-between"}>
                    <View className={"flex-row items-center gap-x-2"}>
                        <MaterialIcons name={'person'} size={26} color={'#2863e9'} />
                        <Text className={"text-3xl font-bold"}>
                            Profile
                        </Text>
                    </View>
                    <TouchableOpacity
                        className={"border border-red-300 bg-red-50 rounded-md px-3 py-2.5"}
                        onPress={handleLogout}
                    >
                        <Text className={"text-[16px] font-medium color-red-600"}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className={"flex-row"}>
                    <View className={"items-center justify-center rounded-full size-16 mr-2"} style={{backgroundColor: '#dbeaff'}}>
                        <MaterialIcons name={'person'} size={38} color={'#2863e9'} />
                    </View>
                    <View className={"flex-1 flex-row justify-between"}>
                        <View className={"justify-center"}>
                            <View className={""}>
                                <Text className={"text-lg font-semibold"}>
                                    John Doe
                                </Text>
                                <Text className={"text-gray-500 text-[16px]"}>
                                    john.doe@example.com
                                </Text>
                            </View>
                        </View>
                        <View className={"items-center justify-center"}>
                            <TouchableOpacity
                                className={"border-gray-300 border-[1px] rounded-md px-3 py-2.5"}
                            >
                                <Text className={"text-[16px] font-medium"}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}