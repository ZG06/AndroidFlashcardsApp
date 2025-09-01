import Text from '@/components/Text';
import { auth } from '@/firebaseConfig';
import { useCards } from '@/hooks/useCards';
import { useDecks } from '@/hooks/useDecks';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { Check, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react-native';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';


export default function NewDeck() {
    const {deckId} = useLocalSearchParams();

    const userId = auth.currentUser?.uid;

    const { decks, isLoading: isDeckLoading, error: deckError } = useDecks('All', userId);
    const deck = decks.find((deck) => deck.id === deckId);
    const deckLength = deck?.cardsCount;

    const { cards, isLoading: isCardLoading, error: cardsError } = useCards(deckId as string, userId);

    const [isAuthReady, setIsAuthReady] = useState(false);

    const [isTrackProgressMode, setIsTrackProgressMode] = useState(false);
    const [isFront, setIsFront] = useState(true);
    const [frontValue, setFrontValue] = useState('');
    const [backValue, setBackValue] = useState('');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [learnedCards, setLearnedCards] = useState<{ cardId: string; difficulty: 'easy' | 'hard' | null }[]>([]);

    const easyCards = learnedCards.filter((card) => card.difficulty === 'easy').length;
    const hardCards = learnedCards.filter((card) => card.difficulty === 'hard').length;
    const cardAccuracy = (easyCards / (easyCards + hardCards) * 100) | 0;
    const currentCardDifficulty = learnedCards.find((card) => card.cardId === cards[currentCardIndex].id)?.difficulty;

    const handleSelectDifficulty = (difficulty: 'easy' | 'hard') => {
        setLearnedCards(prev => {
            const updated = [...prev];
            const currentCard = cards[currentCardIndex];
            const isIncluded = updated.find((card) => card.cardId === currentCard.id)

            if (!isIncluded) {
                updated.push({
                    cardId: cards[currentCardIndex].id,
                    difficulty: difficulty
                });
            } else {
                updated.find((card) => card.cardId === currentCard.id)!.difficulty = difficulty;
            }

            return updated
        });

        if (currentCardIndex !== cards.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        }
    };

    const handleTrackModeBack = () => {

        setLearnedCards(prev => 
            prev.filter(card =>
                card.cardId !== cards[currentCardIndex].id &&
                card.cardId !== cards[currentCardIndex - 1].id
            )
        );
        setCurrentCardIndex(prev => prev - 1);
    }

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
                className={"flex-1 justify-center w-full mx-auto mt-6"}
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
                            className={`flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white ${currentCardIndex === 0 ? '' : 'hover:bg-gray-100'} `}
                            disabled={(currentCardIndex === 0)}
                            style={[
                                { opacity: (currentCardIndex === 0) ? 0.4 : 1 }
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
                        {/* Current card number */}
                        <Text className='text-gray-600 text-[15px]'>
                            Card {currentCardIndex + 1} of {deckLength}
                        </Text>
                        {/* Number of cards studies (selected as easy or hard) */}
                        <Text className='text-gray-600 text-[15px]'>
                            0 studied
                        </Text>
                    </View>
                    {/* Progres bar with number of cards reviewed */}
                    <View className={"w-full mb-3"}>
                        <Progress.Bar progress={progress} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={8} />
                    </View>

                    {/* Only show statistics if track progress mode is active */}
                    {isTrackProgressMode && (
                        <View className='flex-row items-center justify-between'>
                            {/* Number of cards selected as 'easy' */}
                            <View className='flex-row items-center justify-center gap-x-1'>
                                <Check size={13} color="#15A349" />
                                <Text className='text-green-600 text-[14px]'>
                                    {easyCards}
                                </Text>
                            </View>

                            {/* Number of cards selected as 'hard' */}
                            <View className='flex-row items-center justify-center gap-x-1'>
                                <X size={13} color="#DB2525" />
                                <Text className='text-red-600 text-[14px]'>
                                    {hardCards}
                                </Text>
                            </View>

                            {/* Accuracy of answers (how many % of cards were selected as 'easy') */}
                            <View className='flex-row items-center justify-center gap-x-1'>
                                <Text className='text-gray-500 text-[14px]'>
                                    {cardAccuracy}% accuracy
                                </Text>
                            </View>
                        </View>
                    )}
                    
                </View>
                <View className='flex-1 mt-6'>

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
                        <>
                             {/* Back side of the card */}
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
                        </>
                    )}

                    {/* Navigation buttons */}
                    <View className='flex-row items-center justify-between mt-6'>

                        {/* If track mode is active, show 'hard' button, else - show 'previous' button */}
                        {!isTrackProgressMode ? (
                            // Previous button
                            <TouchableOpacity
                                className={`flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white ${currentCardIndex === 0 ? '' : 'hover:bg-gray-100'}`}
                                // Disable the 'Previous' button on the first card in the decks
                                disabled={currentCardIndex === 0}
                                style={[
                                    { opacity: (currentCardIndex === 0) ? 0.4 : 1 }
                                ]}
                                onPress={handleTrackModeBack}
                            >
                                <ChevronLeft size={16} color={'black'} />
                                <Text weight='medium'>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            // Hard button
                            <TouchableOpacity
                                className={`flex-row items-center justify-center p-2.5 border border-red-200 rounded-md h-10 bg-red-50 hover:opacity-70`}
                                // Set current card difficulty as 'hard'
                                onPress={() => handleSelectDifficulty('hard')}
                            >
                                <View
                                    className='flex-row items-center justify-center gap-x-1.5'
                                >
                                    <X size={16} color="#DB2525" />
                                    <Text weight='medium' className='text-red-700 -mt-0.5'>
                                        Hard
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        
                        <View className='flex-row items-center justify-center gap-x-[4px]'>
                            {isTrackProgressMode && (
                                <TouchableOpacity
                                    disabled={currentCardIndex === 0}
                                    onPress={handleTrackModeBack}
                                    style={[
                                        { opacity: (currentCardIndex === 0) ? 0.4 : 1 }
                                    ]}
                                >
                                    <ChevronLeft size={22} color={currentCardIndex === 0 ? "#9ca3af" : "#4b5563"} />
                                </TouchableOpacity>
                            )}
                            <Text weight='medium' className=''>
                                Track progress
                            </Text>
                            <Switch
                                value={isTrackProgressMode}
                                onValueChange={setIsTrackProgressMode}
                                trackColor={{ 
                                    false: "#e5e7eb",
                                    true: "#0d9488"
                                }}
                                thumbColor={"#ffffff"}
                            />
                        </View>

                        {/* If track mode is active, show 'easy' button, else - show 'next' button */}
                        {!isTrackProgressMode ? (
                            // Next button
                            <TouchableOpacity
                                className={`flex-row items-center justify-center gap-x-[4px] border border-gray-200 rounded-md p-2.5 bg-white ${currentCardIndex === (deckLength! - 1) ? '' : 'hover:bg-gray-100'}`}
                                // Disable the 'Next' button on the last card in the decks
                                disabled={currentCardIndex === (deckLength! - 1)}
                                style={[
                                    { opacity: (currentCardIndex === (deckLength! - 1)) ? 0.4 : 1 }
                                ]}
                                onPress={() => handleSelectDifficulty('easy')}
                            >
                                <Text weight='medium'>
                                    Next
                                </Text>
                                <ChevronRight size={16} color={'black'} />
                            </TouchableOpacity>
                        ) : (
                            // Easy button
                            <TouchableOpacity
                                className={`items-center justify-center rounded-md p-2.5 bg-green-600 h-10 hover:opacity-70`}
                                // Set current card difficulty as 'easy'
                                onPress={() => handleSelectDifficulty('easy')}
                            >
                                <View className='flex-row items-center justify-center gap-x-1.5'>
                                    <Check size={16} color="white" />
                                    <Text weight='medium' className='text-white -mt-0.5'>
                                        Easy
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}