import {Text, View} from "react-native";
import React from "react";


type AuthErrorBoxProps = {
    errorType: string
}

const AuthErrorBox = ({errorType}: AuthErrorBoxProps) => {
    return (
        <View
            className={"justify-center border-[1px] border-red-200 rounded-md h-12 pl-4"}
            style={{ backgroundColor: '#FEF2F2' }}
        >
            <Text className={"text-[16px]"} style={{color: '#DC2727'}}>
                {errorType === 'invalidEmail' && 'Please enter a valid email address' }
                {errorType === 'emptyField' && 'Please enter both email and password'}
                {errorType === 'notSamePasswords' && 'Passwords don\'t match'}
                {errorType === 'emailInUse' && 'This email is already in use'}
            </Text>
        </View>
    );
}

export default AuthErrorBox;