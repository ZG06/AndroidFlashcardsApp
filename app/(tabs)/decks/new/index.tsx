import { NewFlashcard } from "@/components/NewFlashcard";
import Text from "@/components/Text";
import TextInput from '@/components/TextInput';
import { FlashCard } from "@/types/FlashCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack, useNavigation } from "expo-router";
import { Save } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import uuid from 'react-native-uuid';


type HeaderProps = {
    flashcardsLength: number;
    flashcards: FlashCard[];
}

const NewDeckHeader = ({flashcardsLength, flashcards}: HeaderProps) => {
    const navigation = useNavigation();
    const filledFlashCards = flashcards.filter((card) => card.front !== '' && card.back !== '')

    return (
        <View className={"justify-center h-[130px] px-4 bg-white"}>
            <View className={"flex-row items-center justify-between w-full"}>
                <View className={"flex-row items-center gap-x-4"}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <MaterialIcons name={"arrow-back"} size={24} color={"black"} />
                    </TouchableOpacity>
                    <View>
                        <Text weight="bold" className={"text-2xl"}>Create New Deck</Text>
                        <Text className={"text-gray-600"}>{filledFlashCards ? filledFlashCards.length : '0'} of {flashcardsLength} cards completed</Text>
                    </View>
                </View>
                {
                    // Save deck button
                }
                <TouchableOpacity
                    className={"flex-row items-center justify-center gap-x-2 bg-black rounded-md px-3"}
                    style={{
                        height: Platform.OS === 'web' ? 40 : 35,
                        width: Platform.OS === 'web' ? 130 : 120
                    }}
                >
                    <Save color={"white"} size={16}/>
                    <Text weight="semibold" className={"text-white text-[15px]"}>Save Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function NewDeck() {
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [flashcards, setFlashcards] = useState<FlashCard[]>([{id: uuid.v4(), front: '', back: ''}]);
    const [previewCard, setPreviewCard] = useState<string | null>(null);

    const addFlashcard = () => {
        const newCard: FlashCard = {
            id: uuid.v4(),
            front: '',
            back: ''
        }
        setFlashcards(prev => [...prev, newCard]);
    }

    const updateFlashcard = (id: string, field: keyof FlashCard, value: string) => {
        setFlashcards(flashcards.map((card) => (card.id === id) ? { ...card, [field]: value } : card));
    }

    const deleteFlashcard = (id: string) => {
        setFlashcards(flashcards.filter((card) => card.id !== id));
    }

    const togglePreview = (id: string) => {
        setPreviewCard(prev => (prev === id ? null : id));
    }

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (<NewDeckHeader flashcardsLength={flashcards.length} flashcards={flashcards} />)
                }}
            />
            <ScrollView className={"p-6"} style={{backgroundColor: '#E6EDFF'}} showsVerticalScrollIndicator={false}>
                {
                    // Deck information block
                }
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
                    <Text weight="semibold" className={"text-xl mb-5"}>Deck Information</Text>
                    {
                        // Deck name
                    }
                    <View className={"mb-4"}>
                        <Text className={"mb-1.5"}>Deck Name *</Text>
                        <TextInput
                            className={"border-gray-200 border rounded-md min-h-12 px-3"}
                            value={deckName}
                            onChangeText={setDeckName}
                            placeholder={"e.g., Spanish vocabulary"}
                            placeholderTextColor={"#6B7280"}
                        />
                    </View>
                    <View>
                        {
                            // Deck description
                        }
                        <Text className={"mb-1.5"}>Description</Text>
                        <TextInput
                            multiline={true}
                            className={"border-gray-200 border rounded-md px-3 min-h-[70px] pt-2.5"}
                            value={deckDescription}
                            onChangeText={setDeckDescription}
                            placeholder={"Brief description of what this deck"}
                            placeholderTextColor={"#6B7280"}
                        />
                    </View>
                </View>

                <View className={"flex-row justify-between w-full mb-6"}>
                    <Text weight="bold" className={"text-[18px] mb-4"}>Flashcards</Text>
                    {
                        // Add card button
                    }
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black rounded-md px-3"}
                        style={{
                            height: Platform.OS === 'web' ? 40 : 35,
                            width: Platform.OS === 'web' ? 130 : 120
                        }}
                        onPress={addFlashcard}
                    >
                        <MaterialIcons name={"add"} color={"white"} size={16}/>
                        <Text weight="medium" className={"text-white text-[16px]"}>Add card</Text>
                    </TouchableOpacity>
                </View>

                <View className={"pb-24"}>
                    {flashcards.map((card, index) => (
                        <NewFlashcard
                            key={card.id}
                            index={index + 1}
                            canDelete={flashcards.length > 1}
                            onDelete={() => deleteFlashcard(card.id)}
                            frontValue={card.front}
                            backValue={card.back}
                            onFrontChange={(text) => updateFlashcard(card.id, 'front', text)}
                            onBackChange={(text) => updateFlashcard(card.id, 'back', text)}
                            isFlipped={previewCard === card.id}
                            togglePreview={() => togglePreview(card.id)}
                        />
                    ))}
                </View>

            </ScrollView>
            <View className={"absolute bottom-8 left-6 right-6"}>
                <View className={"flex-row gap-x-6"}>
                    {
                        // Cancel button
                    }
                    <TouchableOpacity
                        className={"flex-1 items-center justify-center gap-x-2 bg-white h-10 w-[120px] rounded-md px-3"}
                        onPress={() => router.push('decks')}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    {
                        // Save button
                    }
                    <TouchableOpacity
                        className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                    >
                        <MaterialIcons name={"save"} color={"white"} size={15}/>
                        <Text weight="semibold" className={"text-white text-[13px]"}>Save Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
