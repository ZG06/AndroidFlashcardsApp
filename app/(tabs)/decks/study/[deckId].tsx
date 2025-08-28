import Text from '@/components/Text';
import { auth } from '@/firebaseConfig';
import { useCards } from '@/hooks/useCards';
import { useDecks } from '@/hooks/useDecks';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';


export default function NewDeck() {
    const {deckId} = useLocalSearchParams();

    const userId = auth.currentUser?.uid;

    const { decks, isLoading: isDeckLoading, error: deckError } = useDecks('All', userId);
    const deck = decks.find((deck) => deck.id === deckId);
    const deckLength = deck?.cardsCount;

    const { cards, isLoading: isCardLoading, error: cardsError } = useCards(deckId as string, userId);

    const [isAuthReady, setIsAuthReady] = useState(false);

    const [isFront, setIsFront] = useState(true);
    const [frontValue, setFrontValue] = useState('');
    const [backValue, setBackValue] = useState('');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(() => {
            setIsAuthReady(true);
        });
        return unsubscribe;
    }, []);
    
    useEffect(() => {
        if (cards.length > 0) {
            setFrontValue(cards[currentCardIndex].front);
            setBackValue(cards[currentCardIndex].back);
            setIsFront(true);
        }
    }, [currentCardIndex, cards]); 

    const isLoading = isDeckLoading || isCardLoading || !deckId || !userId || !deck;

    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size={50} />
            </View> 
        );
    }

    const progress = (currentCardIndex + 1) / deckLength!;

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
                            disabled={(currentCardIndex === 0 && isFront)}
                            style={[
                                { opacity: (currentCardIndex === 0 && isFront) ? 0.4 : 1 }
                            ]}
                            onPress={() => {
                                setCurrentCardIndex(0);
                                setIsFront(true);
                            }}
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
                            Card {currentCardIndex + 1} of {deckLength}
                        </Text>
                        <Text className='text-gray-600 text-[15px]'>
                            {currentCardIndex + 1} studied
                        </Text>
                    </View>
                    <View className={"w-full"}>
                        <Progress.Bar progress={progress} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={8} />
                    </View>
                </View>
                <View className='mt-6'>
                    

                    {isFront ? (

                        // Front side preview
                        <TouchableOpacity
                            className={"border-[1px] rounded-md border-gray-300 h-[350px] bg-white"}
                            onPress={() => setIsFront(false)}
                        >
                            <View className={"flex-1 items-center justify-center gap-y-5"}>
                                <Text className={"text-center text-sm text-gray-500"}>
                                    QUESTION
                                </Text>
                                <Text weight="medium" className={"text-center text-gray-900 text-xl"}>
                                    {frontValue}
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
                            onPress={() => setIsFront(true)}
                        >
                            <View className={"flex-1 items-center justify-center gap-y-5 p-6"}>
                                <Text className={"text-center text-sm text-gray-500"}>
                                    ANSWER
                                </Text>
                                <Text weight="medium" className={"text-center text-gray-900 text-xl"}>
                                {backValue}
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
                            // Disable the 'Previous' button on the first card in the decks
                            disabled={currentCardIndex === 0}
                            style={[
                                { opacity: (currentCardIndex === 0) ? 0.4 : 1 }
                            ]}
                            onPress={() => setCurrentCardIndex(prev => prev - 1)}
                        >
                            <ChevronLeft size={16} color={'black'} />
                            <Text weight='medium'>
                                Previous
                            </Text>
                        </TouchableOpacity>

                        {/* Next button */}
                        <TouchableOpacity
                            className='flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white hover:bg-gray-100'
                            // Disable the 'Next' button on the last card in the decks
                            disabled={currentCardIndex === (deckLength! - 1)}
                            style={[
                                { opacity: (currentCardIndex === (deckLength! - 1)) ? 0.4 : 1 }
                            ]}
                            onPress={() => setCurrentCardIndex(prev => prev + 1)}
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