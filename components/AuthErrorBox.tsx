import {Text, View} from "react-native";
import React from "react";
import {ErrorType} from "@/types/ErrorType";


type AuthErrorBoxProps = {
    errorType: ErrorType;
}

const AuthErrorBox = ({errorType}: AuthErrorBoxProps) => {
    return (
        <View
            className={"justify-center border-[1px] border-red-200 rounded-md min-h-12 px-4 py-2"}
            style={{ backgroundColor: '#FEF2F2' }}
        >
            <Text className={"text-[16px]"} style={{color: '#DC2727'}}>
                {errorType === 'invalidEmail' && 'Please enter a valid email address.' }
                {errorType === 'emptyField' && 'Please enter both email and password.'}
                {errorType === 'notSamePasswords' && 'Passwords don’t match.'}
                {errorType === 'emailInUse' && 'This email is already in use.'}
                {errorType === 'invalidCredentials' && 'Wrong email or password.'}
                {errorType === 'emailNotVerified' && 'Please verify your email address before logging in. Check your inbox for a verification email.'}
                {errorType === 'tooManyRequests' && 'You’ve requested verification emails too frequently. Please wait a few minutes before trying again.'}
                {errorType === 'userNotFound' && 'There is no account associated with that email address.'}
                {errorType === 'unexpectedError' && 'An unexpected error occurred. Please try again later.'}
                {errorType === 'tooManyRequests' && 'You have made too many requests. Please try again in a few minutes.'}
                {errorType === 'tooWeakPassword' && 'The new password is too weak. Please choose a password that is at least 6 characters long.'}
                {errorType === 'networkRequestFailed' && 'A network error occurred. Please check your internet connection and try again.'}
                {errorType === 'userDisabled' && 'Your account has been disabled. Please contact support.'}
                {errorType === 'registrationNotAllowed' && 'Email/password registration is not enabled. Please contact support.'}
                {errorType === 'profilePermissionDenied' && 'You don’t have permission to update this profile.'}
                {errorType === 'userDocumentNotFound' && 'User profile not found. Please try again.'}
            </Text>
        </View>
    );
}

export default AuthErrorBox;