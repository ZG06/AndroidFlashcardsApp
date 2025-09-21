import ActivityIndicator from "@/components/ActivityIndicator";
import Text from "@/components/Text";
import { TrendingUp } from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";
import * as Progress from 'react-native-progress';


type Props = {
    learnedCardsToday: number;
    sessionsDurationToday: number;
    dailyGoal: number;
    isTodaysProgressLoading: boolean;
}

export const ProgressCard = memo(({
    learnedCardsToday,
    sessionsDurationToday,
    dailyGoal,
    isTodaysProgressLoading
}: Props) => {
    return (
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
                            <Text weight="bold" className={"text-green-600 text-xl"}>{Math.floor(sessionsDurationToday / 60)}m</Text>
                            <Text className={"text-gray-500"}>Time Spent</Text>
                        </View>
                    </View>
                    <View>
                        <View className={"flex-row justify-between mb-2"}>
                            <Text>Daily Goal</Text>
                            <Text>{learnedCardsToday}/{dailyGoal} cards</Text>
                        </View>
                        <View className={"w-full"}>
                            <Progress.Bar
                                progress={Math.min(learnedCardsToday/dailyGoal, 1)}
                                color={"black"} 
                                width={null}
                                borderColor={"white"}
                                unfilledColor={"#f3f4f6"}
                                height={7}
                            />
                        </View>
                    </View>
                </>
            )}
        </View>
    )
})