import Text from "@/components/Text";
import { router } from "expo-router";
import { Play, Plus, TrendingUp } from "lucide-react-native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';

export default function Index() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>
            {
                // Today's progress card
            }
            <View className={"bg-white p-6 rounded-md justify-center shadow-sm shadow-gray-200 mb-6"}>
                <View className={"flex-row items-center gap-x-2 mb-3"}>
                    <TrendingUp size={20} color="#2563EB" />
                    <Text weight="semibold" className={"text-2xl"}>Today&#39;s Progress</Text>
                </View>
                <View className={"flex-row justify-center gap-x-20 mb-5"}>
                    <View className={"items-center"}>
                        <Text weight="bold" className={"text-blue-600 text-xl"}>47</Text>
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
                        <Text>47/50 cards</Text>
                    </View>
                    <View className={"w-full"}>
                        <Progress.Bar progress={(47/50)} color={"black"} width={null} borderColor={"white"} unfilledColor={"#f3f4f6"} height={7} />
                    </View>
                </View>
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
                <View className={"flex-row justify-between mb-20"}>
                    <Text weight="semibold" className={"text-xl"}>Recent Decks</Text>
                    <TouchableOpacity className={"h-7 w-20 hover:bg-gray-200 hover:rounded-md items-center"}>
                        <Text weight="medium" className={"text-[16px]"}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={"text-gray-500"}>No recent decks.</Text>
                </View>
            </View>
        </ScrollView>
    );
}
