import { ConfirmAccountDeleteModal } from "@/components/ConfirmAccountDeleteModal";
import EditProfileSettingsHeader from "@/components/EditProfileSettingsHeader";
import EditProfileTextInput from "@/components/EditProfileTextInput";
import EmailChangeModal from "@/components/EmailChangeModal";
import { MemoizedProfilePicture } from "@/components/MemoizedProfilePicture";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig";
import { pickImageFromLibrary } from "@/utils/imagePicker";
import { router, useFocusEffect } from "expo-router";
import { Save, X } from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";


export default function EditProfileSettings() {
    const [isAuthReady, setIsAuthReady] = useState(false);

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [initialEmail, setInitialEmail] = useState('');
    const [isEmailChangeModalVisible, setIsEmailChangeModalVisible] = useState(false);
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
    const [isAccountDeleteLoading, setIsAccountDeleteLoading] = useState(false);
    const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);

    const {
        user,
        deleteAccount,
        uploadProfilePicture,
        saveProfilePictureURL,
        fetchProfilePicture,
        getUserData,
        saveUserData,
        updateEmailInFirestore
    } = useAuth();

    const deleteAccountHandler = async () => {
        setIsAccountDeleteLoading(true);
        const result = await deleteAccount();
        setIsAccountDeleteLoading(false);
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

    useFocusEffect(
        useCallback(() => {
            if (!isAuthReady || !user) return;
        
            const getData = async () => {
                try {
                    setIsProfilePictureLoading(true);
                    await getUserData({
                        setUsername,
                        setEmail,
                        setBio,
                        setLocation,
                        setWebsite,
                        setProfilePicture
                    });
    
                    setInitialEmail(email);
                    
                    setIsProfilePictureLoading(false);
                } catch {
                    setIsProfilePictureLoading(false);
                }
            }
    
            getData();
        }, [isAuthReady, user])
    )
    
    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    const handleSaveProfileData = async () => {
        if (!user) return;

        if (!emailRegex.test(email)) {
            if (Platform.OS === 'web') {
                window.alert('Invalid email format');
            } else {
                Alert.alert('Invalid email format');
            }
            return;
        }

        if (email !== initialEmail) {
            setIsEmailChangeModalVisible(true);
            return;
        }

        try {
            await saveUserData(
                username,
                bio,
                location,
                website,
                profilePicture
            );
            router.replace('settings');
        } catch (error) {
            console.log('handleSave, edit: ', error);
        }
    }
    
    useEffect(() => {
        if (!initialEmail && email) {
          setInitialEmail(email);
        }
    }, [email, initialEmail]);

    useEffect(() => {
        const syncEmailAfterVerification = async () => {
            if (!isAuthReady || !user) return;
            try {
                await user.reload?.();
                const authEmail = auth.currentUser?.email;
                if (!authEmail) return;
                if (authEmail !== email) {
                    await updateEmailInFirestore(authEmail);
                    setEmail(authEmail);
                    setInitialEmail(authEmail);
                }
            } catch (error) {
                console.log('syncEmailAfterVerification, edit: ', error);
            }
        }
        
        syncEmailAfterVerification();
    }, [isAuthReady, user])

    return (
        <View className="flex-1">
            <EditProfileSettingsHeader
                title="Edit Profile"
                description="Update your personal information"
                isSaveButtonVisible={true}
                onSave={handleSaveProfileData}
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
                    <Text weight="bold" className={"text-[24px]"}>
                        Profile Picture
                    </Text>
                    <View className={"flex-row"}>
                        <View className={"items-center justify-center rounded-full size-20 mr-2"} style={{backgroundColor: '#dbeaff'}}>

                            {
                                // User profile picture
                            }
                            <MemoizedProfilePicture
                                isProfilePictureLoading={isProfilePictureLoading}
                                profilePicture={profilePicture}
                                size={74}
                                borderRadius={37}
                            />

                        </View>
                        <View className={"justify-center"}>
                            <View className={""}>
                                <Text weight="semibold" className={"text-lg"}>
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
                                            weight="medium"
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
                                            weight="medium"
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
                    <Text weight="semibold" className={"text-[24px]"}>
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
                        // Email change modal
                    }
                    <EmailChangeModal
                        visible={isEmailChangeModalVisible}
                        email={email}
                        onClose={() => setIsEmailChangeModalVisible(false)}
                        handleSaveProfileData={async () => {
                            setInitialEmail(email);
                            if (Platform.OS === 'web') {
                                window.confirm('Your email has been changed successfully! Please verify your new email address.');
                            } else {
                                Alert.alert('Your email has been changed successfully! Please verify your new email address.');
                            }
                            await handleSaveProfileData();
                            setIsEmailChangeModalVisible(false);
                        }}
                    >

                    </EmailChangeModal>
                        
                    {
                        // Bio input
                    }
                    <View>
                        <Text weight="medium" className={"mb-3 text-gray-700"}>
                            Bio
                        </Text>
                        <TextInput
                            className={"border-gray-200 border rounded-md min-h-20 p-3 mb-1"}
                            multiline={true}
                            maxLength={200}
                            value={bio}
                            onChangeText={setBio}
                            placeholder={"Tell us about yourself..."}
                            placeholderTextColor={"gray"}
                        />
                        <Text className={"text-gray-500 text-[13px] mt-1"}>
                            {bio.length}/200 characters
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
                    <Text weight="semibold" className={"text-[24px]"}>
                        Account Settings
                    </Text>

                    {
                        // Change password
                    }
                    <View className={"flex-1 flex-row justify-between items-center rounded-md bg-gray-100 p-3.5"}>
                        <View>
                            <Text
                                weight={"medium"}
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
                            <Text weight="medium">
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        // Two-Factor authentication
                    }
                    <View className={"flex-1 flex-row justify-between items-center rounded-md bg-gray-100 p-3.5"}>
                        <View>
                            <Text
                                weight="medium"
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
                            <Text weight="medium">
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
                                weight="medium"
                                className="text-red-900"
                                style={{
                                    fontSize: Platform.OS === 'web' ? 16 : 14
                                }}
                            >
                                Delete Account
                            </Text>
                            <Text
                                className={"color-red-600"}
                                style={{
                                    fontSize: Platform.OS === 'web' ? 14 : 12,
                                    maxWidth: Platform.OS === 'android' ? 200 : undefined
                                }}
                            >
                                Permanently delete your account and data
                            </Text>
                        </View>
                        <TouchableOpacity
                            className={"border border-red-300 rounded-md p-2.5"}
                            onPress={() => setIsConfirmDeleteModalVisible(true)}
                        >
                            <Text weight="medium" className={"color-red-600"}>
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
                        <X color="black" size={16}/>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    {
                        // Save button
                    }
                    <TouchableOpacity
                        className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                        onPress={handleSaveProfileData}
                    >
                        <Save color="white" size={16}/>
                        <Text weight="semibold" className={"text-white text-[14px]"}>Save Changes</Text>
                    </TouchableOpacity>
                </View>

                <ConfirmAccountDeleteModal
                    visible={isConfirmDeleteModalVisible}
                    isLoading={isAccountDeleteLoading}
                    onClose={() => setIsConfirmDeleteModalVisible(false)}
                    onDeleteAccount={deleteAccountHandler}
                />
            </ScrollView>
        </View>
        
    );
}