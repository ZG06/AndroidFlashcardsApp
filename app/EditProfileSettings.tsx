import {router, Stack, useNavigation} from "expo-router";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, {useEffect, useState} from "react";
import EditProfileTextInput from "@/components/EditProfileTextInput";
import {useAuth} from "@/context/authContext";
import {pickImageFromLibrary} from "@/utils/imagePicker";
import {auth} from "@/firebaseConfig";

const EditProfileSettingsHeader = () => {
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
                            Edit Profile
                        </Text>
                        <Text
                            className={"text-gray-600 leading-8"}
                            style={{
                                fontSize: Platform.OS === 'web' ? 18 : 14
                            }}
                        >
                            Update your personal information
                        </Text>
                    </View>
                </View>

                {
                    // Save settings button
                }
                <TouchableOpacity
                    className={"flex-row items-center justify-center gap-x-2 bg-black h-10 rounded-md"}
                    style={{
                        paddingHorizontal: Platform.OS === 'web' ? 14 : 8
                    }}
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
            </View>
        </View>
    )
}

export default function EditProfileSettings() {
    const [bioText, setBioText] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const {deleteAccount, uploadProfilePicture, saveProfilePictureURL, fetchProfilePicture} = useAuth();

    const confirmDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const result = await deleteAccount();
                        if (result.success) router.replace('(auth)');
                    }
                }
            ],
            { cancelable: true }
        );
    };


    const onChooseImage = async () => {
        const imageUri = await pickImageFromLibrary();
        if (!imageUri) return;

        const userId = auth.currentUser?.uid;
        if (!userId) {
            alert("You must be logged it");
            return;
        }

        try {
            setIsProfilePictureLoading(true);
            const url = await uploadProfilePicture(userId, imageUri);
            await saveProfilePictureURL(userId, url);
            await fetchProfilePicture(setProfilePicture);
            setIsProfilePictureLoading(false);
        } catch (error) {
            if (isProfilePictureLoading) setIsProfilePictureLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        setIsProfilePictureLoading(true);
        (async () => {
            await fetchProfilePicture(setProfilePicture);
            setIsProfilePictureLoading(false);
        })();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (<EditProfileSettingsHeader />)
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                className={"p-6"}
                style={{backgroundColor: '#E6EDFF'}}
                contentContainerStyle={{ paddingBottom: 60 }}
            >

                {
                    // Profile picture block
                }
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-6"}>
                    <Text className={"text-[24px] font-bold"}>
                        Profile Picture
                    </Text>
                    <View className={"flex-row"}>
                        <View className={"items-center justify-center rounded-full size-16 mr-2"} style={{backgroundColor: '#dbeaff'}}>

                            {
                                // User profile picture
                            }
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
                        <View className={"justify-center"}>
                            <View className={""}>
                                <Text className={"text-lg font-semibold"}>
                                    Change Profile Picture
                                </Text>
                                <Text
                                    className={"text-gray-500 flex-wrap"}
                                    style={{
                                        fontSize: Platform.OS === 'web' ? 16 : 14
                                    }}
                                >
                                    Upload a new profile picture
                                </Text>
                                <View className={"flex-row gap-x-2 mt-2"}>

                                    {
                                        // Upload photo button
                                    }
                                    <TouchableOpacity className={"border rounded-md border-gray-300 px-2.5 py-2"}>
                                        <Text
                                            className={"font-semibold"}
                                            style={{

                                            }}
                                            onPress={onChooseImage}
                                        >
                                            Upload Photo
                                        </Text>
                                    </TouchableOpacity>

                                    {
                                        // Remove photo button
                                    }
                                    <TouchableOpacity className={"border rounded-md border-gray-300 px-2.5 py-2"}>
                                        <Text
                                            className={"font-semibold"}
                                            style={{

                                            }}
                                        >
                                            Remove
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {
                    // Personal information block
                }
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-6"}>
                    <Text className={"text-[24px] font-bold"}>
                        Personal Information
                    </Text>

                    {
                        // Full name input
                    }
                    <EditProfileTextInput title={'Full Name'} placeholder={'Enter your full name'} icon={'person'} required={true} />

                    {
                        // Email address input
                    }
                    <EditProfileTextInput title={'Email Address'} placeholder={'Enter your email'} icon={'email'} required={true} />

                    {
                        // Bio input
                    }
                    <View>
                        <Text className={"font-medium mb-3"}>
                            Bio
                        </Text>
                        <TextInput
                            className={"font-semibold border-gray-200 border rounded-md min-h-20 p-3 mb-1"}
                            multiline={true}
                            maxLength={200}
                            value={bioText}
                            onChangeText={setBioText}
                            placeholder={"Tell us about yourself..."}
                            placeholderTextColor={"gray"}
                        />
                        <Text className={"text-gray-400"}>
                            {bioText.length}/200 characters
                        </Text>
                    </View>

                    {
                        // Location input
                    }
                    <EditProfileTextInput title={'Location'} placeholder={'City, Country'} />

                    {
                        // Website input
                    }
                    <EditProfileTextInput title={'Website'} placeholder={'https://yourwebsite.com'} />
                </View>

                {
                    // Account Settings
                }
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-6"}>
                    <Text className={"text-[24px] font-bold"}>
                        Account Settings
                    </Text>

                    {
                        // Change password
                    }
                    <View className={"flex-1 flex-row justify-between items-center rounded-md bg-gray-100 p-3.5"}>
                        <View className={""}>
                            <Text
                                className={"font-bold"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 16 : 14
                                }}
                            >
                                Change Password
                            </Text>
                            <Text
                                className={"text-gray-600 leading-8"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 14 : 12
                                }}
                            >
                                Update your personal information
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={"border border-gray-300 bg-white rounded-md p-2.5"}
                        >
                            <Text className={"font-medium"}>
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        // Two-Factor authentication
                    }
                    <View className={"flex-1 flex-row justify-between items-center rounded-md bg-gray-100 p-3.5"}>
                        <View className={""}>
                            <Text
                                className={"font-bold"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 16 : 14
                                }}
                            >
                                Two-Factor Authentication
                            </Text>
                            <Text
                                className={"text-gray-600 leading-8"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 14 : 12
                                }}
                            >
                                Add an extra layer of security
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={"border border-gray-300 bg-white rounded-md p-2.5"}
                        >
                            <Text className={"font-medium"}>
                                Enable
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        // Delete account
                    }
                    <View className={"flex-1 flex-row justify-between items-center rounded-md border border-red-300 bg-red-50 p-3.5"}>
                        <View className={""}>
                            <Text
                                className={"font-bold"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 16 : 14
                                }}
                            >
                                Delete Account
                            </Text>
                            <Text
                                className={"color-red-600 font-medium leading-8"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 14 : 12
                                }}
                            >
                                Permanently delete your account and data
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={"border border-red-300 rounded-md p-2.5"}
                            onPress={confirmDeleteAccount}
                        >
                            <Text className={"color-red-600 font-medium"}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    // Bottom buttons
                }
                <View className={"flex-row gap-x-6 mt-6"}>

                    {
                        // Cancel button
                    }
                    <TouchableOpacity
                        className={"flex-1 flex-row items-center justify-center gap-x-2 bg-white h-10 w-[120px] rounded-md px-3"}
                        onPress={() => router.back()}
                    >
                        <MaterialIcons name={"close"} color={"black"} size={15}/>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    {
                        // Save button
                    }
                    <TouchableOpacity
                        className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                    >
                        <MaterialIcons name={"save"} color={"white"} size={15}/>
                        <Text className={"text-white font-semibold text-[13px]"}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}