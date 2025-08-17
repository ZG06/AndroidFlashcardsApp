import ActivityIndicator from '@/components/ActivityIndicator'
import DeckForm from '@/components/DeckForm'
import DeckHeader from '@/components/DeckHeader'
import { NewFlashcard } from '@/components/NewFlashcard'
import Text from '@/components/Text'
import { useAuth } from '@/context/authContext'
import { db } from '@/firebaseConfig'
import { updateDeck } from '@/lib/decks'
import { FlashCard } from '@/types/FlashCard'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
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
    const [initialFlashcards, setInitialFlashcards] = useState<FlashCard[]>([{id: uuid.v4(), front: '', back: ''}]);
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

    const hasFlashcardChanges = (): boolean => {
        const initialMeaningful = initialFlashcards.filter(card => card.front.trim() && card.back.trim());
        const currentMeaningful = flashcards.filter(card => card.front.trim() && card.back.trim());
        
        const initialIds = new Set(initialMeaningful.map(card => String(card.id)));
        const currentIds = new Set(currentMeaningful.map(card => String(card.id)));

        const hasAdded = [...currentIds].some(id => !initialIds.has(id));
        const hasDeleted = [...initialIds].some(id => !currentIds.has(id));

        if (hasAdded || hasDeleted) {
            return true;
        } else {
            const initialById = new Map(initialMeaningful.map(c => [String(c.id), {
                front: c.front.trim(), back: c.back.trim()
            }]));

            const currentById = new Map(currentMeaningful.map(c => [String(c.id), {
                front: c.front.trim(), back: c.back.trim()
            }]));

            const hasModified = Array.from(initialIds).some(id => {
                const a = initialById.get(id);
                const b = currentById.get(id);
                return !a || !b || a.front !== b.front || a.back !== b.back;
            });

            if (hasModified) return true;
        }

        return false;
        
        
    }

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
        let unsubscribe: (() => void) | undefined
        const getData = async () => {
            const userId = user?.uid;

            if (!deckId || !userId) {
                return
            }

            try {
                const deckRef = doc(db, `users/${userId}/decks/${deckId}`);
                const snap = await getDoc(deckRef);
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
                
                const q = query(collection(deckRef, 'cards'), orderBy('createdAt', 'desc'));
                unsubscribe = onSnapshot(q, (snapshot => {
                    const cards: FlashCard[] = snapshot.docs.map((d) => {
                        const data = d.data() as { front?: string; back?: string };

                        return {
                            id: d.id,
                            front: data?.front ?? '',
                            back: data?.back ?? '',
                        };
                    });

                    setFlashcards(cards.length ? cards : [{ id: uuid.v4() as string, front: '', back: '' }]);
                    setInitialFlashcards(cards.length ? cards : [{ id: uuid.v4() as string, front: '', back: '' }]);
                }));

                return unsubscribe;

            } catch (error) {
                console.error(error);
            }
        }

        getData();
        return () => unsubscribe?.();
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
                            disabled={isLoading || (initialDeckName === deckName && initialDeckDescription === deckDescription) && !hasFlashcardChanges()}
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
                            <Text weight="semibold" className={"text-black text-[13px]"}>Cancel</Text>
                        </TouchableOpacity>
                        {
                            // Save button
                        }
                        <TouchableOpacity
                            className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                            disabled={isLoading || (initialDeckName === deckName && initialDeckDescription === deckDescription) && !hasFlashcardChanges()}
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