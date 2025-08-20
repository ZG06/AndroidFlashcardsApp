import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { useAuth } from '@/context/authContext';
import { ErrorType } from '@/types/ErrorType';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ActivityIndicator from './ActivityIndicator';
import AuthErrorBox from './AuthErrorBox';


type Props = {
    visible: boolean;
    email: string;
    onClose: () => void;
    handleSaveProfileData: () => void;
}

export default function EmailChangeModal({visible, email, onClose, handleSaveProfileData}: Props) {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorType | undefined>(undefined);

    const {changeEmail} = useAuth();

    const handleGetPasswordAndChangeEmail = async () => {
        if (!password.trim()) {
            setError('emptyPassword');
            return;
        }

        setIsLoading(true);
        try {
            const response = await changeEmail(email, password);

            if (!response.success) {
                setPassword('');
                setError(response.error);
                setIsLoading(false);
                return;
            }
            
            await handleSaveProfileData();

            setIsLoading(false);
            setError(undefined);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.5}
            backdropColor={"#111827"}
        >
            {
                // Error box
            }
            {error && (
                <AuthErrorBox
                    errorType={error}
                />
            )}


            
            <View className={"items-center justify-center bg-white"}>
                <Text className={"text-xl font-bold text-center text-gray-700 mb-4 mt-5"}>
                    Changing email requires password
                </Text>
                <View className="w-full px-16 mt-3 items-center">
                    <TextInput
                        className={`rounded-lg text-gray-800 bg-gray-50 border border-gray-200 px-4 h-12 ${Platform.OS === 'web' ? 'w-[300px]' : 'w-[200px]'}`}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                {/* Cancel and Confirm buttons */}
                {isLoading ? (
                    <View className="mt-4 mb-4">
                        <ActivityIndicator size={40} />
                    </View>
                ) : (
                    <View className="flex-row justify-between items-center gap-x-10 mt-10 mb-8 px-14">
                        <TouchableOpacity
                            className="items-center justify-center rounded-md border border-gray-300 bg-white px-5 w-[100px] h-10"
                            onPress={() => {
                                setPassword('');
                                onClose();
                            }}
                        >
                            <Text className="text-black font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="items-center justify-center rounded-md border border-gray-300 bg-white px-5 w-[100px] h-10"
                            onPress={async () => {
                                await handleGetPasswordAndChangeEmail();
                                setPassword('');
                            }}
                        >
                            <Text className="text-black font-bold">Confirm</Text>
                        </TouchableOpacity> 
                    </View>
                )}
                
            </View>
            
        </Modal>
    )
}
