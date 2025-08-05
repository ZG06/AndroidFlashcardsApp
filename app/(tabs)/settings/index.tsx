import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useAuth} from "@/context/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {router, useFocusEffect} from "expo-router";

export default function Settings() {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const {logout, fetchProfilePicture} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadProfilePicture = async () => {
                setIsProfilePictureLoading(true);
                await fetchProfilePicture((url: string) => {
                    if (isActive) {
                        setProfilePicture(url);
                    }
                });
                if (isActive) {
                    setIsProfilePictureLoading(false);
                }
            };

            loadProfilePicture();

            return () => {
                isActive = false;
            }
        }, [])
    )

    return (
        <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>
            <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-8"}>
                <View className={"flex-row justify-between"}>
                    <View className={"flex-row items-center gap-x-2"}>
                        <MaterialIcons name={'person'} size={26} color={'#2863e9'} />
                        <Text className={"text-3xl font-bold"}>
                            Profile
                        </Text>
                    </View>

                    {
                        // Sign out button
                    }
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

                    {
                        // User profile with name and email
                    }
                    <View className={"items-center justify-center rounded-full size-16 mr-2"} style={{backgroundColor: '#dbeaff'}}>
                        {isProfilePictureLoading ? (
                            <ActivityIndicator size={'small'} />
                        ) : profilePicture ? (
                            <Image
                                source={{uri: profilePicture}}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 30,
                                    resizeMode: 'cover',
                                }}
                            />
                        ) : (
                            <MaterialIcons name={'person'} size={38} color={'#2863e9'} />
                        )}
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

                            {
                                // Button to profile edit screen
                            }
                            <TouchableOpacity
                                className={"border-gray-300 border-[1px] rounded-md px-3 py-2.5"}
                                onPress={() => router.push('/settings/EditProfileSettings')}
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