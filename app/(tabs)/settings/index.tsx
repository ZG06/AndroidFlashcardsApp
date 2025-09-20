import ActivityIndicator from "@/components/ActivityIndicator";
import CustomSlider from "@/components/CustomSlider";
import GeneralHeader from "@/components/GeneralHeader";
import Text from "@/components/Text";
import { NOTIFICATION_MESSAGES } from "@/constants/notifications";
import { useAuth } from "@/context/authContext";
import { auth, db } from "@/firebaseConfig";
import * as Notifications from 'expo-notifications';
import { router, useFocusEffect } from "expo-router";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Settings as SettingsIcon, User } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Platform, ScrollView, TextInput, TouchableOpacity, View } from "react-native";


export default function Settings() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const [dailyGoal, setDailyGoal] = useState(50);
    const [dailyGoalTemp, setDailyGoalTemp] = useState(50);
    const [isEditingGoal, setIsEditingGoal] = useState(false);

    const [studyRemindersTime, setStudyRemindersTime] = useState(0);
    const [studyRemindersTimeTemp, setStudyRemindersTimeTemp] = useState(0);
    const [isEditingReminders, setIsEditingReminders] = useState(false);

    const [isStudySettingsLoading, setIsStudySettingsLoading] = useState(false);

    const {user, logout, getUserData, updateEmailInFirestore} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    const saveDailyGoal = async () => {
        const userId = auth.currentUser?.uid;
        const userRef = doc(db, `users/${userId}`);

        if (!userId) return;

        setIsStudySettingsLoading(true);

        try {
            await updateDoc(userRef, {
                dailyGoal: dailyGoalTemp
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsStudySettingsLoading(false);
            setIsEditingGoal(false);
            setDailyGoal(dailyGoalTemp);
        }
    }

    const saveStudyRemindersTime = async () => {
        const userId = auth.currentUser?.uid;
        const userRef = doc(db, `users/${userId}`);

        if (!userId) return;

        setIsStudySettingsLoading(true);

        {/* Save the time when study-remider notifications should be sent */}
        try {
            await updateDoc(userRef, {
                studyRemindersTime: studyRemindersTimeTemp
            })

            {/* Time when the notifications will be sent */}
            const hours = studyRemindersTimeTemp;

            {/* Clear the previous scheduled notifications */}
            await Notifications.cancelAllScheduledNotificationsAsync();

            {/* Create new scheduled notifications and send them daily */}
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '📚 Study Time!',
                    body: NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)],
                    sound: 'default',
                    data: { type: 'study_reminder' }
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour: hours,
                    minute: 0
                }
            })

        } catch (error) {
            console.error(error);
        } finally {
            setIsStudySettingsLoading(false);
            setIsEditingReminders(false);
            setStudyRemindersTime(studyRemindersTimeTemp);
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

    useEffect(() => {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            setIsStudySettingsLoading(false);
            return;
        }

        setIsStudySettingsLoading(true);
        try {
            const userRef = doc(db, `users/${userId}`);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    const newDailyGoal = Number(data.dailyGoal) ?? 50;
                    const newStudyTime = Number(data.studyRemindersTime) ?? 0;

                    setDailyGoal(newDailyGoal);
                    setDailyGoalTemp(newDailyGoal);
                    setStudyRemindersTime(newStudyTime);
                    setStudyRemindersTimeTemp(newStudyTime);
                }
            });

            return () => unsubscribe();
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsStudySettingsLoading(false);
        }
    }, [auth.currentUser?.uid]);

    return (
        <View className={"flex-1"}>
            {/* Header */}
            <GeneralHeader title={"Settings"} description={"Customize your learning experience"} />

            <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>

                {/* Profile settings block */}
                <View className={"bg-white p-6 border border-gray-200 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-8"}>
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
                                <ActivityIndicator size={50} />
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
                                    className={"border-gray-200 border-[1px] rounded-md px-3 py-2.5"}
                                    onPress={() => router.push('/settings/edit')}
                                >
                                    <Text weight="medium">
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View className={"bg-white p-6 border border-gray-200 rounded-md shadow-sm shadow-gray-200 mb-6 gap-y-5"}>
                    <View className={"flex-row items-center gap-x-1"}>
                        <SettingsIcon size={20} color={'#15A349'} />
                        <Text weight="semibold" className={"text-2xl"}>
                            Study Settings
                        </Text>
                    </View>
                    {/* Study settings block */}
                    {isStudySettingsLoading ? (
                        <View className="items-center justify-center">
                            <ActivityIndicator size={50} />
                        </View>
                    ) : (
                        <>
                            <View className="flex-row items-center justify-between">
                                {/* Daily card study goal */}
                                <View className="gap-y-1">
                                    <Text weight="medium" className="text-[16px]">
                                        Daily Goal
                                    </Text>
        
                                    {/* Display the number of cards to study per day */}
                                    <Text className="text-gray-600">
                                        {dailyGoal} {`card${dailyGoal.toString()[dailyGoal.toString().length - 1] === '1' ? '' : 's'}`} per day
                                    </Text>
                                </View>
                                
                                {/* Change the number of cards to study per day button */}
                                <TouchableOpacity
                                    className="border border-gray-200 rounded-md px-3 py-2"
                                    onPress={() => setIsEditingGoal(!isEditingGoal)}
                                >
                                    <Text weight="medium">
                                    {isEditingGoal ? 'Cancel' : 'Change'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
        
                            {/* Open text input to set daily goal when pressing the 'Change' button */}
                            {isEditingGoal && (
                                <View className="p-4 bg-gray-50 rounded-lg">
                                    <Text className="text-gray-700 mb-2" weight="medium">Set Daily Goal</Text>
                                    <View className="flex-row items-center gap-x-3">
                                        {/* Text input for daily card study goal */}
                                        <TextInput
                                            className="border border-gray-200 rounded-md px-4 py-2 min-w-32"
                                            keyboardType="number-pad"
                                            value={dailyGoalTemp === 0 ? '' : dailyGoalTemp.toString()}
                                            onChangeText={(text) => {
                                                if (text === '') {
                                                    setDailyGoalTemp(0);
                                                } else {
                                                    const num = parseInt(text, 10);
                                                    if (!isNaN(num)) {
                                                        setDailyGoalTemp(Math.min(200, Math.max(1, num)))
                                                    }
                                                }
                                            }}
                                        />
        
                                        {dailyGoal !== dailyGoalTemp && (
                                            // Save new cards per day number
                                            <TouchableOpacity
                                                onPress={saveDailyGoal}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            >
                                                <Text className="text-white" weight="medium">Save</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <Text className="text-xs text-gray-500 mt-2">Number of cards to study daily</Text>
                                </View>
                            )}
                            
                            {/* Divider */}
                            <View className="border-b border-gray-200" />
        
                            <View className="flex-row items-center justify-between">
                                <View className="gap-y-1">
                                    <Text weight="medium" className="text-[16px]">
                                        Study Reminders
                                    </Text>
        
                                    {/* Display current time of study reminders */}
                                    <Text className="text-gray-600">
                                        {studyRemindersTime}:00 daily
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-center gap-x-2">
                                    {(studyRemindersTime !== studyRemindersTimeTemp) && isEditingReminders && (
                                        // Cancel time change button
                                        <TouchableOpacity
                                            className="px-3 py-1.5"
                                            onPress={() => {
                                                setStudyRemindersTimeTemp(studyRemindersTime);
                                                setIsEditingReminders(false);
                                            }}
                                        >
                                            <Text weight="medium" className="text-gray-600 text-[14px]">
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    )}
        
                                    {/* Edit the reminders time button */}
                                    <TouchableOpacity
                                        className="border border-gray-200 rounded-md px-3 py-2"
                                        onPress={() => setIsEditingReminders(prev => !prev)}
                                    >
                                        <Text weight="medium">
                                            {isEditingReminders ? 'Close' : 'Edit'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
        
                            {isEditingReminders && (
                                <View className="p-4 bg-gray-50 rounded-lg">
                                    {/* Custom slider to set the reminders time */}
                                    <CustomSlider
                                        value={studyRemindersTimeTemp}
                                        onValueChange={setStudyRemindersTimeTemp}
                                        minimumValue={0}
                                        maximumValue={23}
                                        step={1}
                                        minimumTrackTintColor="#3B82F6"
                                        maximumTrackTintColor="#E5E7EB"
                                        thumbTintColor="#3B82F6"
                                    />
                                    <View className="flex-row justify-between p-2">
                                        <Text weight="medium" className="">
                                            0:00
                                        </Text>
                                        <Text weight="medium">
                                            23:00
                                        </Text>
                                    </View>
                                    {studyRemindersTime !== studyRemindersTimeTemp && (
                                        // Display the slider's current value and the save button after dragging the slider 
                                        <View>
                                            <Text className={`text-center text-gray-600 ${Platform.OS === 'web' ? 'text-[18px]' : 'text-[14px]'}`}>
                                                Set to {studyRemindersTimeTemp}:00
                                            </Text>
                                            <TouchableOpacity
                                                className="flex-1 items-center justify-center bg-gray-800 rounded-md mt-3"
                                                style={{
                                                    paddingVertical: Platform.OS === 'web' ? 15 : 10
                                                }}
                                                onPress={saveStudyRemindersTime}
                                            >
                                                <Text
                                                    weight="medium"
                                                    className={`text-center text-[13px] text-white ${Platform.OS === 'web' ? 'text-[15px]' : 'text-[12px]'}`}
                                                >
                                                    Save
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}