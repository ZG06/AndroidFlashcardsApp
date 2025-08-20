import GeneralHeader from "@/components/GeneralHeader";
import Text from "@/components/Text";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig";
import { router, useFocusEffect } from "expo-router";
import { User } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, ScrollView, TouchableOpacity, View } from "react-native";

export default function Settings() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const {user, logout, getUserData, updateEmailInFirestore} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const syncEmailAfterVerification = async () => {
                if (!isAuthReady || !user) return;
                try {
                    await user.reload?.();
                    const authEmail = auth.currentUser?.email;
                    if (!authEmail) return;
                    if (authEmail !== email) {
                        await updateEmailInFirestore(authEmail);
                        setEmail(authEmail);
                    }
                } catch (error) {
                    console.log('syncEmailAfterVerification, edit: ', error);
                }
            }
            
            syncEmailAfterVerification();
        }, [isAuthReady, user])
    )

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                if (!isAuthReady || !user) return;
    
                try {
                    setIsProfilePictureLoading(true);
                    await getUserData({
                        setUsername,
                        setEmail,
                        setProfilePicture
                    });
    
                    setIsProfilePictureLoading(false);
                } catch {
                    setIsProfilePictureLoading(false);
                }
            }
    
            getData();
        }, [isAuthReady, user])
    )

    return (
        <View className={"flex-1"}>
            {/* Header */}
            <GeneralHeader title={"Settings"} description={"Customize your learning experience"} />

            <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>

                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-8"}>
                    <View className={"flex-row justify-between"}>
                        <View className={"flex-row items-center gap-x-2"}>
                            <User size={20} color={'#2863e9'} />
                            <Text weight="semibold" className={"text-2xl"}>
                                Profile
                            </Text>
                        </View>

                        {
                            // Sign out button
                        }
                        <TouchableOpacity
                            className={"border border-red-300 bg-red-50 rounded-md items-center justify-center"}
                            style={{
                                height: 35,
                                width: 90
                            }}
                            onPress={handleLogout}
                        >
                            <Text className={"text-[15px] font-medium color-red-600"}>
                                Sign Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className={"flex-row gap-x-2"}>

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
                                <User size={32} color={'#2863e9'} />
                            )}
                        </View>
                        <View className={"flex-1 flex-row justify-between"}>
                            <View className={"justify-center"}>
                                <View>
                                    <Text weight="semibold" className={"text-lg"}>
                                        {username}
                                    </Text>
                                    <Text className={`text-gray-500 text-[16px] ${Platform.OS === 'android' && 'max-w-[170px]'}`}>
                                        {email}
                                    </Text>
                                </View>
                            </View>
                            <View className={"items-center justify-center"}>

                                {
                                    // Button to profile edit screen
                                }
                                <TouchableOpacity
                                    className={"border-gray-300 border-[1px] rounded-md px-3 py-2.5"}
                                    onPress={() => router.push('/settings/edit')}
                                >
                                    <Text weight="medium" className={"text-[16px]"}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}