import Text from '@/components/Text';
import { Edit, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';


type Props = {
    deckName: string;
    deckDescription?: string;
}

const DecksItemCard = ({deckName, deckDescription}: Props) => {
    return (
        <View className="bg-white p-3 rounded-md shadow-md w-full mx-auto gap-y-5 mt-2">
            <View className="flex-row items-center justify-between">
                <View className='gap-y-1'>
                    <Text weight="semibold" className={`${Platform.OS === 'web' ? 'text-[17px]' : 'text-[15px]'}`}>
                        {deckName}
                    </Text>
                    {deckDescription && (
                        <Text className='text-gray-600 text-sm'>
                            {deckDescription}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    className='items-center justify-center size-9 rounded-md hover:bg-gray-200'
                >
                    <Trash2 size={16} color="red" />
                </TouchableOpacity>
            </View>
            <View className='flex-row items-center justify-center gap-x-2'>
                <TouchableOpacity
                    className='flex-1 bg-black items-center justify-center rounded-md hover:opacity-80'
                    style={{
                        height: Platform.OS === 'web' ? 40 : 35
                    }}
                >
                    <Text
                        weight='medium'
                        className='text-white'
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="p-[10px] border border-gray-200 rounded-md hover:bg-gray-100"
                >
                    <Edit size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DecksItemCard;