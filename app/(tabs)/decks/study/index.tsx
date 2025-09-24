import ActivityIndicator from "@/components/ActivityIndicator";
import GeneralHeader from "@/components/GeneralHeader";
import FlashcardCounterCard from "@/components/quick-study/FlashcardCounterCard";
import StudyModeCards from "@/components/quick-study/StudyModeCards";
import Text from "@/components/Text";
import { auth, db } from "@/firebaseConfig";
import { DeckStudyMode } from "@/types/DeckStudyMode";
import { collection, getDocs } from "firebase/firestore";
import { BookOpen, Target, TrendingUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";


type CardCounts = {
    new: number;
    difficult: number;
}

export default function StudyOptionsScreen() {
    const [selectedMode, setSelectedMode] = useState<DeckStudyMode>('New');
    const [cardCounts, setCardCounts] = useState<CardCounts>({ new: 0, difficult: 0 });
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchCardsCount = async (): Promise<CardCounts> => {
        const userId = auth.currentUser?.uid;

        if (!userId) return { new: 0, difficult: 0 };

        try {
            const decksRef = collection(db, `users/${userId}/decks`);
            const decksSnapshot = await getDocs(decksRef);
            
            const cardPromises = decksSnapshot.docs.map(async (deckDoc) => {
                const cardsRef = collection(db, `users/${userId}/decks/${deckDoc.id}/cards`);
                const cardsSnapshot = await getDocs(cardsRef);
                
                return cardsSnapshot.docs.map(doc => doc.data());
            });

            const allCards = (await Promise.all(cardPromises)).flat();

            return {
                new: allCards.filter(card => !card.difficulty).length,
                difficult: allCards.filter(card => card.difficulty === 'hard').length
            }

        } catch (error) {
            console.error(error);
            return { new: 0, difficult: 0 };
        }
    }

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetchCardsCount()
            .then(counts => {
                if (isMounted) setCardCounts(counts);
            })
            .catch(console.error)
            .finally(() => {
                if (isMounted) setIsLoading(false);
            })

        return () => {
            isMounted = false;
        }
    }, [])

    return isLoading ? (
        <View className="flex-1 items-center justify-center"> 
            <ActivityIndicator size={72} />
        </View>
    ) : (
        <View className={"flex-1"}>

            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#E6EDFF'}}>
                {/* Header */}
                <GeneralHeader title={"Study Session"} description={"Choose your study mode and deck"} />

                <View className="p-6">
                    {/* Cards due to review and new cards counter */}
                    <View className="flex-row items-center justify-center gap-x-4 mb-6">
                        <FlashcardCounterCard
                            Icon={BookOpen}
                            color="#2664EB"
                            count={cardCounts.new}
                            description="New Cards"
                        />
                        
                        <FlashcardCounterCard
                            Icon={TrendingUp}
                            color="#DD412C"
                            count={cardCounts.difficult}
                            description="Difficult Cards"
                        />

                    </View>
                    
                    <Text weight="semibold" className="text-lg mb-4">
                        Study Mode
                    </Text>

                    {/* Study mode selection */}
                    <View className="gap-y-4 mb-6">
                        <View className="flex-row gap-x-4">
                            <TouchableOpacity
                                activeOpacity={1}
                                className="flex-1"
                                onPress={() => setSelectedMode('New')}
                            >
                                <StudyModeCards
                                    Icon={BookOpen}
                                    color="#2664EB"
                                    label="Learn New"
                                    description="Study new cards you haven't seen"
                                    isSelected={selectedMode === 'New'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                className="flex-1"
                                onPress={() => setSelectedMode('Hard')}
                            >
                                <StudyModeCards
                                    Icon={TrendingUp}
                                    color="#DD412C"
                                    label="Challenge Mode"
                                    description="Study new cards you haven't seen"
                                    isSelected={selectedMode === 'Hard'}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            activeOpacity={1}
                            className="flex-1"
                            onPress={() => setSelectedMode('All')}
                        >
                            <StudyModeCards
                                Icon={Target}
                                color="#61ad13"
                                label="Practice All"
                                description="Mix of new and review cards"
                                isSelected={selectedMode === 'All'}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-between mb-4">
                        {selectedMode === 'New' ? (
                            <Text weight="semibold" className="text-lg">
                                Decks with New Cards
                            </Text>
                        ) : selectedMode === 'Hard' ? (
                            <Text weight="semibold" className="text-lg">
                                Challenging Decks
                            </Text>
                        ) : (
                            <Text weight="semibold" className="text-lg">
                                All Decks
                            </Text>
                        )}

                        <View className="rounded-full bg-gray-100 px-2 py-1">
                            <Text weight="semibold" className="text-xs">
                                0 available
                            </Text>
                        </View>
                    </View>

                    <View className="items-center justify-center mt-4">
                        <Text className="text-gray-600">
                            No cards available
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}