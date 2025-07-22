import React, {useState} from "react";
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import AuthInput from "@/components/AuthInput";
import {router} from "expo-router";
import {ErrorType} from "@/types/ErrorType";
import AuthErrorBox from "@/components/AuthErrorBox";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import {useAuth} from "@/context/authContext";
import ActivityIndicator from "@/components/ActivityIndicator";


export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {register} = useAuth();

    const handleAccountCreate = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Checking if there are empty fields
        if (!username || !password || !email || !confirmPassword) {
            setErrorType('emptyField');
            return;
        }

        // Email format validation
        if (!regex.test(email)) {
            setErrorType('invalidEmail');
            return;
        }

        // Checking if both passwords are the same
        if (password !== confirmPassword) {
            setErrorType('notSamePasswords');
            return;
        }

        // Setting error type to null if there are no errors
        if (errorType) setErrorType(null);

        // Settings isLoading to true when registering a user to display an activity indicator
        setIsLoading(true);

        // Registering a user and settings isLoading to false afterwards
        let response = await register(username, email, password);
        setIsLoading(false);

        if (!response.success) {
            // TODO add another type for unsuccessful account creation
        }
    }

    return (
        <KeyboardAvoidingContainer>
            <View className={"flex-1 items-center justify-center"}>
                <Image
                    source={require('../../assets/icon.png')}
                    className={"mb-2"}
                    style={{
                        height: 96,
                        width: 96
                    }}
                />
                <Text className={"font-bold text-3xl mb-3"}>Create Account</Text>
                <Text className={"text-gray-600 text-xl mb-8"}>Join FlashMaster today</Text>
                <View
                    className={"bg-white p-6 rounded-md shadow-md w-full mx-auto gap-y-5 mt-2"}
                    style={{
                        maxWidth: Platform.OS === 'web' ? 500 : 370
                    }}
                >
                    {
                        // Error box
                    }
                    {errorType && (
                        <AuthErrorBox
                            errorType={errorType}
                        />
                    )}

                    {
                        // Username input
                    }
                    <AuthInput
                        label={"Login"}
                        placeholder={"Enter your login"}
                        icon={"person"}
                        value={username}
                        onChangeText={setUsername}
                    />

                    {
                        // Email input
                    }
                    <AuthInput
                        label={"Email"}
                        placeholder={"Enter your email"}
                        icon={"email"}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {
                        // Password input
                    }
                    <AuthInput
                        label={"Password"}
                        placeholder={"Create password"}
                        icon={"lock"}
                        value={password}
                        onChangeText={setPassword}
                        isPasswordSecure={isPasswordSecure}
                        onShowPasswordPress={() => setIsPasswordSecure(prev => !prev)}
                    />

                    {
                        // Confirm password input
                    }
                    <AuthInput
                        label={"Confirm Password"}
                        placeholder={"Confirm password"}
                        icon={"lock"}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        isPasswordSecure={isConfirmPasswordSecure}
                        onShowPasswordPress={() => setIsConfirmPasswordSecure(prev => !prev)}
                    />

                    {
                        // Displays an activity indicator or a Create Account button depending on the isLoading state
                    }
                    {isLoading ? (
                        <View className={"items-center justify-center"}>
                            <ActivityIndicator size={50} />
                        </View>
                    ) : (
                        <TouchableOpacity
                            className={"bg-black items-center justify-center rounded-md"}
                            style={{
                                height: Platform.OS === 'web' ? 50 : 40
                            }}
                            onPress={() => handleAccountCreate(username, email, password, confirmPassword)}
                        >
                            <Text className={"text-white font-medium text-lg"}>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    )}

                    {
                        // Create account button
                    }
                    <View className={"flex-row justify-center"}>
                        <Text>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/login')}
                        >
                            <Text className={"text-blue-500 font-semibold ml-1"}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingContainer>
    );
}