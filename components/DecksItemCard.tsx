import Text from '@/components/Text';
import { getLastStudied } from '@/utils/getLastStudied';
import { router } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { BookOpen, Clock, Edit, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';


type Props = {
    deckId: string;
    deckName: string;
    deckDescription?: string;
    cardsCount: number;
    createdAt: Timestamp;
    lastStudied: Timestamp;
    learnedCount: number;
    onDelete: () => void;
    onStudy: () => void;
}

const DecksItemCard = ({
    deckId,
    deckName,
    deckDescription,
    cardsCount,
    createdAt,
    lastStudied,
    learnedCount,
    onDelete,
    onStudy
}: Props) => {
    console.log("learned: ", learnedCount)
    return (
        <View className="bg-white p-4 rounded-md shadow-md w-full mx-auto mt-2">
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
                    onPress={onDelete}
                >
                    <Trash2 size={16} color="red" />
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-x-4 mt-3">
                <View className='flex-row items-center justify-center gap-x-1'>
                    <BookOpen color={"#6B7280"} size={16} />
                    <Text className="text-gray-500">
                        {cardsCount} cards
                    </Text>
                </View>
                <View className='flex-row items-center justify-center gap-x-1'>
                    <Clock color={"#6B7280"} size={16} />
                    <Text className='text-gray-600'>
                        {getLastStudied(createdAt, lastStudied)}
                    </Text>
                </View>
            </View>
            <View className="gap-y-1 mb-3 mt-3">
                <View className={"flex-row justify-between"}>
                    <Text>Progress</Text>
                    {learnedCount ? (
                        <Text>
                            {learnedCount}/{cardsCount}
                        </Text>
                    ) : (
                        <Text>
                            0/{cardsCount}
                        </Text>
                    )}
                </View>
                <View className={"w-full"}>
                    <Progress.Bar progress={((learnedCount ? learnedCount : 0)/cardsCount)} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={7} />
                </View>
            </View>
            <View className='flex-row items-center justify-center gap-x-2'>
                <TouchableOpacity
                    className='flex-1 bg-black items-center justify-center rounded-md hover:opacity-80'
                    style={{
                        height: Platform.OS === 'web' ? 40 : 35
                    }}
                    onPress={onStudy}
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
                    onPress={() => router.push(`decks/edit/${deckId}`)}
                >
                    <Edit size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DecksItemCard;