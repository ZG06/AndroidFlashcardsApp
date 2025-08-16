import ActivityIndicator from "@/components/ActivityIndicator";
import SearchBar from "@/components/SearchBar";
import Text from "@/components/Text";
import { auth, db } from "@/firebaseConfig";
import { Deck } from "@/types/Deck";
import { router } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";


export default function Decks() {

    const [isLoading, setIsLoading] = useState(false);
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            setIsLoading(false);
            setDecks([]);
            return;
        }

        const q = query(collection(db, `users/${userId}/decks`), orderBy('createdAt', 'desc'));
        setIsLoading(true);
        const unsubscribe = onSnapshot(q, (snapshot => {
            const mapped: Deck[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                mapped.push({
                    id: doc.id,
                    name: data.name,
                    createdAt: data.createdAt
                })
            });

            setDecks(mapped);
            setIsLoading(false);
        }), error => {
            console.log(error);
        });

        return unsubscribe
    }, [auth])

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
            <View className={"justify-center items-center mt-20"}>
                {isLoading ? (
                    <ActivityIndicator size={50} />
                ) : decks.length === 0 ? (
                    <Text className={"text-gray-500"}>No decks found.</Text>
                ) : (
                    decks.map((deck) => (
                        <Text>
                            {deck.name}
                        </Text>
                    ))
                )}
            </View>
        </ScrollView>
    );
}
