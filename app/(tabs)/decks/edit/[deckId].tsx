import ActivityIndicator from '@/components/ActivityIndicator'
import DeckForm from '@/components/DeckForm'
import DeckHeader from '@/components/DeckHeader'
import Text from '@/components/Text'
import { useAuth } from '@/context/authContext'
import { db } from '@/firebaseConfig'
import { updateDeck } from '@/lib/decks'
import { FlashCard } from '@/types/FlashCard'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid'


const EditDeck = () => {
    const {deckId} = useLocalSearchParams();

    const {user} = useAuth();

    const [deckName, setDeckName] = useState('');
    const [initialDeckName, setInitialDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const [initialDeckDescription, setInitialDeckDescription] = useState('');
    const [flashcards, setFlashcards] = useState<FlashCard[]>([{id: uuid.v4(), front: '', back: ''}]);
    const [previewCard, setPreviewCard] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeckUpdate = async () => {
        
        
        if (!deckName.trim()) {
            setError('Provide a deck name');
            return
        }

        setIsLoading(true);

        try {
            await updateDeck(deckId as string, {
                name: deckName,
                description: deckDescription
            })

            router.replace('/decks');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const userId = user?.uid;

            if (!deckId || !userId) {
                return
            }

            try {
                const snap = await getDoc(doc(db, `/users/${userId}/decks/${deckId}`));
                const data = snap.data()
    
                if (snap.exists()) {
                    setDeckName(data?.name ?? '');
                    setDeckDescription(data?.description ?? '');
                    setInitialDeckName(data?.name ?? '');
                    setInitialDeckDescription(data?.description ?? '');
                } else {
                    if (Platform.OS === 'web') {
                        window.alert('Deck not found');
                    } else {
                        Alert.alert('Deck not found');
                    }

                    router.back()
                }
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, [deckId, user])

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (
                        <DeckHeader
                            title="Edit Deck"
                            flashcardsLength={flashcards.length} 
                            flashcards={flashcards}
                            saveButtonText="Save Changes"
                            onPress={handleDeckUpdate}
                            disabled={isLoading || (initialDeckName === deckName && initialDeckDescription === deckDescription)}
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
                            <Text weight="semibold" className={"text-black text-[13px]"}>Cancel</Text>
                        </TouchableOpacity>
                        {
                            // Save button
                        }
                        <TouchableOpacity
                            className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                            disabled={isLoading || (initialDeckName === deckName && initialDeckDescription === deckDescription)}
                            onPress={handleDeckUpdate}
                        >
                            <MaterialIcons name={"save"} color={"white"} size={15}/>
                            <Text weight="semibold" className={"text-white text-[13px]"}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
}

export default EditDeck;