import ActivityIndicator from "@/components/ActivityIndicator";
import HomeDecksItemCard from "@/components/HomeDecksItemCard";
import { ProgressCard } from "@/components/ProgressCard";
import Text from "@/components/Text";
import { auth, db } from "@/firebaseConfig";
import { useDecks } from "@/hooks/useDecks";
import { router } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { Play, Plus } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";


export default function Index() {
    const userId = auth.currentUser?.uid;
    const { decks, isLoading, error } = useDecks('All', userId);
    const [learnedCardsToday, setLearnedCardsToday] = useState(0);
    const [sessionsDurationToday, setSessionsDurationToday] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(50);
    const [isTodaysProgressLoading, setIsTodaysProgressLoading] = useState(false);

    const todayStart = useMemo(() => {
        const todayStart = new Date(); 
        todayStart.setHours(0, 0, 0, 0);
        return todayStart
    }, []);

    const todayEnd = useMemo(() => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        return todayEnd;
    }, []);
    
    // const onQuickStudyPress = useCallback(() => {
    //     if (!decks || decks.length === 0) return;
    
    //     const mostRecentDeck = decks.reduce((mostRecent, current) => {
    //         if (!mostRecent) return current;
    
    //         return current.lastStudied.toDate().getTime() > mostRecent.lastStudied.toDate().getTime()
    //             ? current
    //             : mostRecent;
    //     })
        
    //     if (mostRecentDeck.id) {
    //         router.replace(`/decks/study/${mostRecentDeck.id}`);
    //     }
    // }, [decks, router])

    const deckList = useMemo(() => {
        if (isLoading) return null;
        if (decks.length === 0) return null;
        {/* Render only first 3 decks */}
        return decks.slice(0, 3).map((deck) => (
            <HomeDecksItemCard
                key={deck.id}
                deckName={deck.name}
                cardsCount={deck.cardsCount}
                createdAt={deck.createdAt}
                lastStudied={deck.lastStudied}
                learnedCount={deck.learnedCount}
                onStudy={() => router.push(`/decks/study/${deck.id}`)}
            />
        ));
    }, [decks, isLoading, router]);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error])

    useEffect(() => {
        if (isLoading) return;

        let learnedCards = 0;
        let sessionsDuration = 0;

        decks.forEach((deck) => {
            if (deck.lastStudied && deck.lastStudied.toDate() > todayStart && deck.lastStudied.toDate() < todayEnd) {
                learnedCards += deck.learnedCount;
                sessionsDuration += deck.studyTimeToday;
            };
        })

        setLearnedCardsToday(learnedCards);
        setSessionsDurationToday(sessionsDuration);
    }, [decks, todayStart, todayEnd])

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        
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
            <ProgressCard
                learnedCardsToday={learnedCardsToday}
                sessionsDurationToday={sessionsDurationToday}
                dailyGoal={dailyGoal}
                isTodaysProgressLoading={isTodaysProgressLoading}
            />

            <View className={"flex-row gap-x-5 mb-6"}>
                {
                    // Quick study button
                }
                <TouchableOpacity
                    className={"flex-1 bg-white p-6 rounded-md shadow-xl shadow-gray-200 items-center hover:shadow-md"}
                    onPress={() => router.push('/decks/study')}
                >
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
                        {deckList}
                    </View>
                )}
                </View>
            </View>
        </ScrollView>
    );
}
