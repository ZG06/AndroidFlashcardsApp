import Text from "@/components/Text";
import { View } from "react-native";
import * as Progress from 'react-native-progress';


type Props = {
    name: string;
    description: string;
    cardsCount: number;
    learnedCount: number;
    newCardsCount?: number;
    difficultCardsCount?: number;
    accuracy?: number;
    studyTimeToday: number;
}

export const DeckPreviewCard = ({
    name,
    description,
    cardsCount,
    learnedCount,
    newCardsCount,
    difficultCardsCount,
    accuracy,
    studyTimeToday
}: Props) => {
    return (
        <View className="flex-1 border border-gray-200 rounded-md bg-white p-4">
            <Text weight="semibold" className="text-[16px]">
                {name}
            </Text>
            <Text className="text-gray-600 text-sm mt-1.5">
                {description}
            </Text>
            <View className="flex-row gap-x-4 mt-1.5">
                <View className="flex-1 gap-y-2">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-500">
                            Progress
                        </Text>
                        <Text>
                            {learnedCount}/{cardsCount}
                        </Text>
                    </View>
                    <Progress.Bar
                        progress={learnedCount/cardsCount}
                        color={"black"}
                        width={null}
                        className="w-full"
                        borderColor={"white"}
                        unfilledColor={"#f3f4f6"}
                        height={4}
                    />
                </View>
                <View className="flex-1 gap-y-1">
                    {newCardsCount && (
                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500">
                                New:
                            </Text>
                            <Text weight="medium" className="text-blue-600">
                                {newCardsCount} cards
                            </Text>
                        </View>
                    )}

                    {difficultCardsCount && (
                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500">
                                Hard:
                            </Text>
                            <Text weight="medium" className="text-red-600">
                                {difficultCardsCount} cards
                            </Text>
                        </View>
                    )}

                    {accuracy && (
                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500">
                                Accuracy:
                            </Text>
                            <Text weight="medium" className="text-yellow-600">
                                {accuracy}%
                            </Text>
                        </View>
                    )}

                    {studyTimeToday && (
                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500">
                                Time:
                            </Text>
                            <Text>
                                {Math.floor(studyTimeToday / 60)}m
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}