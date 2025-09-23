import GeneralHeader from "@/components/GeneralHeader";
import FlashcardCounterCard from "@/components/quick-study/FlashcardCounterCard";
import StudyModeCards from "@/components/quick-study/StudyModeCards";
import Text from "@/components/Text";
import { DeckStudyMode } from "@/types/DeckStudyMode";
import { BookOpen, Target, TrendingUp } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";


export default function StudyOptionsScreen() {
    const [selectedMode, setSelectedMode] = useState<DeckStudyMode>('New');

    return (
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
                            count={133}
                            description="New Cards"
                        />
                        
                        <FlashcardCounterCard
                            Icon={TrendingUp}
                            color="#DD412C"
                            count={100}
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
                        {selectedMode === 'Review' ? (
                            <Text weight="semibold" className="text-lg">
                                Decks Due for Review
                            </Text>
                        ) : selectedMode === 'New' ? (
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