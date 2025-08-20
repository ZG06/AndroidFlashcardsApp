import ActivityIndicator from "@/components/ActivityIndicator";
import DecksItemCard from "@/components/DecksItemCard";
import SearchBar from "@/components/SearchBar";
import Text from "@/components/Text";
import { useAuth } from "@/context/authContext";
import { useDecks } from "@/hooks/useDecks";
import { deleteDeck } from "@/lib/decks";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect } from "react";
import { Alert, Platform, ScrollView, TouchableOpacity, View } from "react-native";


export default function Decks() {
    const {user} = useAuth();
    const userId = user?.uid;
    const { decks, isLoading, error } = useDecks(userId);

    const handleDeckDelete = async (deckId: string) => {
        try {
            await deleteDeck(deckId);
        } catch (error) {
            console.error(error);
        }
    }

    const confirmDeckDelete = async (deckId: string) => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            );

            if (confirmed) {
                handleDeckDelete(deckId);
            }
        }
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => handleDeckDelete(deckId)
                }
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error])

    return (
        <ScrollView style={{backgroundColor: '#E6EDFF'}}>
            {
                // Header
            }
            <View className={"flex justify-center items-start h-[160px] px-6 bg-white"}>
                <View className={"flex-row justify-between w-full py-4"}>
                    <Text weight="bold" className={"text-[24px] mb-4"}>My Decks</Text>
                    {
                        // New deck button
                    }
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black rounded-md px-3"}
                        style={{
                            height: 40,
                            width: 130
                        }}
                        onPress={() => router.push('/decks/new/')}
                    >
                        <Plus color="white" size={16}/>
                        <Text weight="semibold" className={"text-white text-[15px]"}>New Deck</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar />
            </View>
            <View className={"justify-center items-center mt-8"}>
                {isLoading ? (
                    <ActivityIndicator size={50} />
                ) : decks.length === 0 ? (
                    <Text className={"text-gray-500"}>No decks found.</Text>
                ) : (
                    <View
                        className="w-full gap-y-2 p-6"
                    >
                        {decks.map((deck) => (
                            <DecksItemCard
                                key={deck.id}
                                deckId={deck.id}
                                deckName={deck.name}
                                deckDescription={deck.description}
                                cardsCount={deck.cardsCount}
                                onDelete={() => confirmDeckDelete(deck.id)}
                            />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
