import ActivityIndicator from "@/components/ActivityIndicator";
import DeckForm from "@/components/DeckForm";
import DeckHeader from "@/components/DeckHeader";
import { NewFlashcard } from "@/components/NewFlashcard";
import Text from "@/components/Text";
import { createDeck } from "@/lib/decks";
import { FlashCard } from "@/types/FlashCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import uuid from 'react-native-uuid';


export default function NewDeck() {
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [flashcards, setFlashcards] = useState<FlashCard[]>([{id: uuid.v4(), front: '', back: ''}]);
    const [previewCard, setPreviewCard] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleDeckSave = async () => {
        if (!deckName.trim()) {
            setError('Provide a deck name');
            return;
        }

        setIsLoading(true);

        try {
            await createDeck(deckName, deckDescription);

            router.replace('/decks');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (
                        <DeckHeader
                            title="Create New Deck"
                            flashcardsLength={flashcards.length} 
                            flashcards={flashcards}
                            saveButtonText="Save Deck"
                            onPress={handleDeckSave}
                            disabled={isLoading}
                        />
                    )
                }}
            />
            <ScrollView className={"p-6"} style={{backgroundColor: '#E6EDFF'}} showsVerticalScrollIndicator={false}>
                {
                    // Deck information block
                }
                <DeckForm
                    deckName={deckName}
                    setDeckName={setDeckName}
                    deckDescription={deckDescription}
                    setDeckDescription={setDeckDescription}
                    error={error}
                    setError={setError}
                    editable={!isLoading}
                />

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
                {isLoading ? (
                    <ActivityIndicator size={50} />
                ) : (
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
                            disabled={isLoading}
                            onPress={handleDeckSave}
                        >
                            <MaterialIcons name={"save"} color={"white"} size={15}/>
                            <Text weight="semibold" className={"text-white text-[13px]"}>Save Deck</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
}
