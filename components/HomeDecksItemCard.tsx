import Text from '@/components/Text';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';


type Props = {
    deckId: string;
    deckName: string;
    cardsCount: number;
}

const HomeDecksItemCard = ({deckId, deckName, cardsCount}: Props) => {
    return (
        <View className="flex-row items-center justify-center bg-white p-4 rounded-md shadow-md w-full gap-x-4 mx-auto mt-2">
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <View className='gap-y-1'>
                        <Text weight="semibold" className={`${Platform.OS === 'web' ? 'text-[17px]' : 'text-[15px]'}`}>
                            {deckName}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-x-1 mt-2">
                    <Text className="text-gray-600">
                        0/{cardsCount} cards
                    </Text>
                </View>
                <View className="gap-y-1 mt-3">
                    <View className={"w-full"}>
                        <Progress.Bar progress={(0/cardsCount)} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={4} />
                    </View>
                </View>
            </View>
            <View
                className="items-center justify-center"
                style={{
                    height: 38,
                    width: Platform.OS === 'web' ? 65 : 55
                }}
            >
                <TouchableOpacity
                    className="bg-black items-center justify-center rounded-md hover:opacity-80 size-full"
                >
                    <Text
                        weight='medium'
                        className='text-white'
                    >
                        Study
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeDecksItemCard;