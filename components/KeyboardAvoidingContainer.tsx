import {KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableWithoutFeedback} from "react-native";
import React, {ReactNode} from "react";


type Props = {
    children: ReactNode;
};

const KeyboardAvoidingContainer = ({ children }: Props) => {
    return (
        <SafeAreaView
            className={"flex-1"}
        >
            <TouchableWithoutFeedback>
                <KeyboardAvoidingView
                    className={"flex-1"}
                    behavior={"padding"}
                >
                    <ScrollView
                        style={{backgroundColor: '#EBF2FF'}}
                        contentContainerStyle={{flexGrow: 1}}
                    >
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default KeyboardAvoidingContainer;