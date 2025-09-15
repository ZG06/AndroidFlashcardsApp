import ActivityIndicator from "@/components/ActivityIndicator";
import HomeDecksItemCard from "@/components/HomeDecksItemCard";
import Text from "@/components/Text";
import { auth, db } from "@/firebaseConfig";
import { useDecks } from "@/hooks/useDecks";
import { updateLastStudied } from "@/lib/decks";
import { router } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { Play, Plus, TrendingUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';

export default function Index() {
    const userId = auth.currentUser?.uid;
    const { decks, isLoading, error } = useDecks('All', userId);
    const [learnedCardsToday, setLearnedCardsToday] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(50);
    const [isTodaysProgressLoading, setIsTodaysProgressLoading] = useState(false);

    const handleDeckStudyPress = async (deckId: string) => {
        await updateLastStudied(deckId);
        router.push(`/decks/study/${deckId}`);
    }

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error])

    useEffect(() => {
        if (isLoading) return;
        
        const todayStart = new Date(); 
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        let learnedCards = 0; 

        decks.forEach((deck) => {
            if (deck.lastStudied.toDate() > todayStart && deck.lastStudied.toDate() < todayEnd) {
                learnedCards += deck.learnedCount;
            };
        })

        setLearnedCardsToday(learnedCards);
    }, [decks])

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        
        if (!userId) return;

        if (!userId) {
            setIsTodaysProgressLoading(false);
            return;
        }

        setIsTodaysProgressLoading(true);

        try {
            const userRef = doc(db, `users/${userId}`);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setDailyGoal(data.dailyGoal);
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error(error);
        } finally {
            setIsTodaysProgressLoading(false);
        }
    }, [auth.currentUser?.uid])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 24 }}
            style={{backgroundColor: '#E6EDFF'}}
        >
            {
                // Today's progress card
            }
            <View className={"bg-white p-6 rounded-md justify-center shadow-sm shadow-gray-200 mb-6"}>
                <View className={"flex-row items-center gap-x-2 mb-3"}>
                    <TrendingUp size={20} color="#2563EB" />
                    <Text weight="semibold" className={"text-2xl"}>Today&#39;s Progress</Text>
                </View>
                {isTodaysProgressLoading ? (
                    <View className="items-center justify-center">
                        <ActivityIndicator size={50} />
                    </View>
                ) : (
                    <>
                        <View className={"flex-row justify-center gap-x-20 mb-5"}>
                            <View className={"items-center"}>
                                <Text weight="bold" className={"text-blue-600 text-xl"}>{learnedCardsToday}</Text>
                                <Text className={"text-gray-500"}>Cards Studied</Text>
                            </View>
                            <View className={"items-center"}>
                                <Text weight="bold" className={"text-green-600 text-xl"}>32m</Text>
                                <Text className={"text-gray-500"}>Time Spent</Text>
                            </View>
                        </View>
                        <View>
                            <View className={"flex-row justify-between mb-2"}>
                                <Text>Daily Goal</Text>
                                <Text>{learnedCardsToday}/{dailyGoal} cards</Text>
                            </View>
                            <View className={"w-full"}>
                                <Progress.Bar progress={Math.min(learnedCardsToday/dailyGoal, 1)} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={7} />
                            </View>
                        </View>
                    </>
                )}
            </View>

            <View className={"flex-row gap-x-5 mb-6"}>
                {
                    // Quick study button
                }
                <TouchableOpacity className={"flex-1 bg-white p-6 rounded-md shadow-xl shadow-gray-200 items-center hover:shadow-md"}>
                    <Play color={"#2563eb"} size={32} style={{marginBottom: 10}} />
                    <Text weight="bold" className={"text-lg"}>Quick Study</Text>
                    <Text className={"text-gray-600"}>Continue learning</Text>
                </TouchableOpacity>
                {
                    // Create deck button
                }
                <TouchableOpacity
                    className={"flex-1 bg-white p-6 rounded-md shadow-xl shadow-gray-200 items-center hover:shadow-md"}
                    onPress={() => router.push('/decks/new')}
                >
                    <Plus color={'#16a34a'} size={32} style={{marginBottom: 10}}/>
                    <Text weight="bold" className={"text-lg"}>Create deck</Text>
                    <Text className={"text-gray-600"}>Add new cards</Text>
                </TouchableOpacity>
            </View>

            <View>
                <View className={"flex-row justify-between mb-2"}>
                    <Text weight="semibold" className={"text-xl"}>Recent Decks</Text>
                    <TouchableOpacity
                        className={"h-8 w-20 hover:bg-gray-100 hover:rounded-md items-center justify-center"}
                        onPress={() => router.push(`decks`)}
                    >
                        <Text weight="medium" className={"text-[16px]"}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View className={"justify-center items-center"}>
                {isLoading ? (
                    <ActivityIndicator size={50} />
                ) : decks.length === 0 ? (
                    <Text className={"text-gray-500"}>No decks found.</Text>
                ) : (
                    <View
                        className="w-full gap-y-2"
                    >
                        {/* Render only first 3 decks */}
                        {decks.slice(0, 3).map((deck) => (
                            <HomeDecksItemCard
                                key={deck.id}
                                deckName={deck.name}
                                cardsCount={deck.cardsCount}
                                createdAt={deck.createdAt}
                                lastStudied={deck.lastStudied}
                                learnedCount={deck.learnedCount}
                                onStudy={async () => handleDeckStudyPress(deck.id)}
                            />
                        ))}
                    </View>
                )}
                </View>
            </View>
        </ScrollView>
    );
}
