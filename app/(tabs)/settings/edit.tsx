import EditProfileTextInput from "@/components/EditProfileTextInput";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig";
import { pickImageFromLibrary } from "@/utils/imagePicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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


export default function EditProfileSettings() {
    const [isAuthReady, setIsAuthReady] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bioText, setBioText] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const {
        user,
        deleteAccount,
        uploadProfilePicture,
        saveProfilePictureURL,
        fetchProfilePicture,
        getUserData,
        saveUserData
    } = useAuth();

    const confirmDeleteAccount = () => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            );

            if (confirmed) {
                deleteAccountHandler();
            }
        }
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
                    onPress: deleteAccountHandler
                }
            ],
            { cancelable: true }
        );
    };

    const deleteAccountHandler = async () => {
        const result = await deleteAccount();
        if (result.success) router.replace('(auth)');
    }


    const onChooseImage = async () => {
        const imageUri = await pickImageFromLibrary();
        if (!imageUri) return;

        const userId = auth.currentUser?.uid;

        if (!userId) return;

        try {
            setIsProfilePictureLoading(true);
            const url = await uploadProfilePicture(imageUri);
            await saveProfilePictureURL(userId, url);
            await fetchProfilePicture(setProfilePicture);
            setIsProfilePictureLoading(false);
        } catch (error) {
            if (isProfilePictureLoading) setIsProfilePictureLoading(false);
            console.log(error);
        }
    }

    const onRemoveImage = async () => {
        const userId = auth.currentUser?.uid;

        if (!userId) return;

        setIsProfilePictureLoading(true);
        try {
            await saveProfilePictureURL(userId, '');
            setProfilePicture(null);
            setIsProfilePictureLoading(false);
        } catch (error) {
            console.error("Error removing profile picture", error);
        }
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isAuthReady || !user) return;
        
        const getData = async () => {
            try {
                setIsProfilePictureLoading(true);
                await getUserData(
                    setUsername,
                    setEmail,
                    setBioText,
                    setLocation,
                    setWebsite,
                    setProfilePicture
                );
                
                setIsProfilePictureLoading(false);
            } catch (error) {
                console.log('UseEffect, edit: ', error);
                setIsProfilePictureLoading(false);
            }
        }

        getData();
    }, [isAuthReady, user])
    
    const handleSaveProfileData = async () => {
        if (!user) return;

        try {
            await saveUserData(
                username,
                email,
                bioText,
                location,
                website,
                profilePicture
            );
            router.replace('settings');
        } catch (error) {
            console.log('handleSave, edit: ', error);
        }
    }

    return (
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
                                        onPress={onRemoveImage}
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
                    // Username input
                }
                <EditProfileTextInput
                    title={'Username'}
                    placeholder={'Enter your username'}
                    icon={'person'}
                    required={true}
                    value={username}
                    onChangeText={setUsername}
                />

                {
                    // Email address input
                }
                <EditProfileTextInput
                    title={'Email Address'}
                    placeholder={'Enter your email'} 
                    icon={'email'}
                    required={true}
                    value={email}
                    onChangeText={setEmail}
                />

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
                <EditProfileTextInput
                    title={'Location'}
                    placeholder={'City, Country'}
                    value={location}
                    onChangeText={setLocation}
                />

                {
                    // Website input
                }
                <EditProfileTextInput
                    title={'Website'}
                    placeholder={'https://yourwebsite.com'}
                    value={website}
                    onChangeText={setWebsite}
                />
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
                        onPress={() => router.push('/settings/change-password')}
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
                    onPress={() => router.push('settings')}
                >
                    <MaterialIcons name={"close"} color={"black"} size={15}/>
                    <Text>Cancel</Text>
                </TouchableOpacity>

                {
                    // Save button
                }
                <TouchableOpacity
                    className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                    onPress={handleSaveProfileData}
                >
                    <MaterialIcons name={"save"} color={"white"} size={15}/>
                    <Text className={"text-white font-semibold text-[13px]"}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}