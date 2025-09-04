import ActivityIndicator from '@/components/ActivityIndicator';
import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { AlertTriangle, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';


type Props = {
    visible: boolean;
    isLoading: boolean;
    onClose: () => void;
    onDeleteAccount: () => void;
}

export const ConfirmAccountDeleteModal = ({visible, isLoading, onClose, onDeleteAccount}: Props) => {
    const [inputText, setInputText] = useState('');

    const modalContent = (
        <>
            <View
                className='size-16 items-center justify-center bg-red-100 mb-4'
                style={{
                    borderRadius: 999
                }}
            >
                <Trash2 color='red' size={32} />
            </View>
            <Text weight='bold' className='text-red-900 text-xl mb-3'>
                Delete Account
            </Text>
            <Text
                className='text-red-700 text-[16px] text-center mb-5'
                numberOfLines={5}
                style={{
                    lineHeight: 25
                }}
            >
                Are you sure you want to delete your account? This will permanently remove all your flashcards, study progress, and personal data. This action cannot be undone.
            </Text>
            {isLoading ? (
                <View>
                    <ActivityIndicator size={50} />
                </View>
            ) : (
                <>
                    <View className='flex-row items-center  self-start gap-x-1 mb-1.5'>
                        <Text weight='medium' className='text-gray-700'>
                            Type
                        </Text>
                        <View className='items-center justify-center bg-red-50 px-1.5 py-1'>
                            <Text weight='medium' className='text-red-600 text-[12px]'>
                                DELETE
                            </Text>
                        </View>
                        <Text weight='medium' className='text-gray-700'>
                            to confirm:
                        </Text>
                    </View>
                    <TextInput
                        className={`border border-gray-300 rounded-md pl-3 ${
                            (inputText !== 'DELETE' && inputText !== '') ? 'bg-red-100/50 border border-red-300' : ''
                        }`}
                        value={inputText}
                        onChangeText={setInputText}
                        style={{
                            height: 40,
                            width: '100%',
                            minWidth: '100%',
                            maxWidth: '100%',
                        }}
                        placeholder='Type "DELETE" here'
                        placeholderTextColor={'#9ca3af'}
                    />
                    {inputText !== 'DELETE' && inputText !== '' && (
                        <Text className='text-xs self-start text-red-600 mt-0.5'>
                            Text doesn't match. Please try again.
                        </Text>
                    )}
                    <View className='flex-row items-center gap-x-3 w-full mt-6'>
                        <TouchableOpacity
                            className='flex-1 items-center justify-center border border-gray-200 rounded-md p-3'
                            onPress={onClose}
                        >
                            <Text weight='medium'>
                                Keep Account
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 items-center justify-center border border-gray-200 rounded-md p-3 bg-red-500 ${inputText !== 'DELETE' && 'opacity-60'}`}
                            disabled={inputText !== 'DELETE'}
                            onPress={onDeleteAccount}
                        >
                            <Text weight='medium' className='text-white'>
                                Delete Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <View
                className='flex-row items-center justify-center border border-red-200 bg-red-50 rounded-md mt-4 h-10 gap-x-1'
                style={{
                    minWidth: '100%',
                    maxWidth: '100%'
                }}
            >
                <AlertTriangle color='red' size={12} />
                <Text className='text-red-600 text-xs'>
                    This action cannot be undone
                </Text>
            </View>
        </>
    )

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.3}
            backdropColor='rgba(255, 100, 100, 0.7)'
            animationIn={'fadeInLeft'}
            animationOut={'fadeOutRight'}
            style={{
                margin: 0
            }}
        >
            {Platform.OS === 'web' ? (
                <View className='flex-1 items-center justify-center'>
                    <View className='absolute inset-0 bg-red-100/30 backdrop-blur-sm' />
                    <View className='bg-white/90 items-center border-2 border-red-200 p-6 rounded-md w-11/12 max-w-md'>
                        {modalContent}
                    </View>
                </View>
            ) : (
                <View className='flex-1 justify-center items-center bg-red-100/30'>
                    <View className='bg-white/95 items-center border-2 border-red-200 p-6 rounded-md w-11/12 max-w-md'>
                        {modalContent}
                    </View>
                </View>
            )}
        </Modal>
    )
}