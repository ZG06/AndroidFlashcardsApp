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
                {errorType === 'notSamePasswords' && 'Passwords don\'t match.'}
                {errorType === 'emailInUse' && 'This email is already in use.'}
                {errorType === 'invalidCredentials' && 'Wrong email or password.'}
                {errorType === 'emailNotVerified' && 'Please verify your email address before logging in. Check your inbox for a verification email.'}
                {errorType === 'tooManyRequests' && 'You’ve requested verification emails too frequently. Please wait a few minutes before trying again.'}
            </Text>
        </View>
    );
}

export default AuthErrorBox;