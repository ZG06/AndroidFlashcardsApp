import Text from '@/components/Text';
import { auth } from '@/firebaseConfig';
import { useDecks } from '@/hooks/useDecks';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';


export default function NewDeck() {
    const {deckId} = useLocalSearchParams();

    const userId = auth.currentUser?.uid;

    const { decks, isLoading, error: deckError } = useDecks('All', userId);
    const deck = decks.find((deck) => deck.id === deckId);
    const deckLength = deck?.cardsCount;

    const [isPreviewFront, setIsPreviewFront] = useState(true);
    const [frontValue, setFrontValue] = useState('');
    const [backValue, setBackValue] = useState('');

    return (
        <ScrollView
            style={{backgroundColor: '#EBF2FF'}}
            contentContainerStyle={{flexGrow: 1}}
        >
            <View
                className={"flex-1 justify-center w-full mx-auto"}
                style={{
                    maxWidth: Platform.OS === 'web' ? 500 : 370
                }}
            >
                <View className={"flex-row items-center"} >
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <View className='items-center justify-center p-2 hover:bg-gray-100 rounded-md'>
                            <MaterialIcons name={"arrow-back"} size={22} color={"black"} />
                        </View>
                    </TouchableOpacity>

                    {/* Deck name and mode */}
                    <View className='flex-1 flex-row items-center justify-between ml-10'>
                        <View>
                            <Text weight="bold" className={"text-xl text-gray-900"}>
                                {deck?.name}
                            </Text>
                            <Text className='text-gray-600'>
                                Practice mode
                            </Text>
                        </View>

                        {/* Reset button */}
                        <TouchableOpacity
                            className='flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white hover:bg-gray-100'
                        >
                            <RotateCcw color={"black"} size={16} />
                            <Text weight='medium'>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={"mt-6"}>
                    <View className={"flex-row justify-between mb-3"}>
                        <Text className='text-gray-600 text-[15px]'>
                            Card 0 of {deckLength}
                        </Text>
                        <Text className='text-gray-600 text-[15px]'>
                            0 studied
                        </Text>
                    </View>
                    <View className={"w-full"}>
                        <Progress.Bar progress={(0/deckLength!)} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={8} />
                    </View>
                </View>
                <View className='mt-6'>
                    {isPreviewFront ? (
                        // Front side preview
                        <TouchableOpacity
                            className={"border-[1px] rounded-md border-gray-300 h-[350px] bg-white"}
                            onPress={() => setIsPreviewFront(false)}
                        >
                            <View className={"flex-1 items-center justify-center gap-y-5"}>
                                <Text className={"text-center text-sm text-gray-500"}>
                                    QUESTION
                                </Text>
                                <Text weight="semibold" className={"text-center text-gray-900 text-lgo"}>
                                    { frontValue || 'Front side content...'}
                                </Text>
                            </View>
                            <View>
                                <Text className={"text-gray-400 text-xs text-center mb-4"}>
                                    Tap to reveal answer
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        // Back side preview
                        <TouchableOpacity
                            className={"border-[1px] rounded-md border-gray-300 h-[350px] bg-white"}
                            onPress={() => setIsPreviewFront(true)}
                        >
                            <View className={"flex-1 items-center justify-center gap-y-5 p-6"}>
                                <Text className={"text-center text-sm text-gray-500"}>
                                    ANSWER
                                </Text>
                                <Text weight="semibold" className={"text-center text-gray-900 text-lgo"}>
                                { backValue || 'Back side content...'}
                                </Text>
                            </View>
                            <View>
                                <Text className={"text-gray-400 text-xs text-center mb-4"}>
                                    Tap to flip back
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {/* Navigation buttons */}
                    <View className='flex-row items-center justify-between mt-6'>
                        {/* Previous button */}
                        <TouchableOpacity
                            className='flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white hover:bg-gray-100'
                        >
                            <ChevronLeft size={16} color={'black'} />
                            <Text weight='medium'>
                                Previous
                            </Text>
                        </TouchableOpacity>

                        {/* Next button */}
                        <TouchableOpacity
                            className='flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white hover:bg-gray-100'
                        >
                            <Text weight='medium'>
                                Next
                            </Text>
                            <ChevronRight size={16} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}