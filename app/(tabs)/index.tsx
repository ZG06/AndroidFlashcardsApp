import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import * as Progress from 'react-native-progress';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {router} from "expo-router";

export default function Index() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>
            {
                // Today's progress card
            }
            <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
                <Text className={"font-bold text-2xl mb-2"}>Today&#39;s Progress</Text>
                <View className={"flex-row justify-center gap-x-20 mb-5"}>
                    <View className={"items-center"}>
                        <Text className={"text-blue-600 font-bold text-xl"}>47</Text>
                        <Text className={"text-gray-500"}>Cards Studied</Text>
                    </View>
                    <View className={"items-center"}>
                        <Text className={"text-green-600 font-bold text-xl"}>32m</Text>
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
                    <MaterialIcons name={"play-arrow"} color={"#2563eb"} size={38} />
                    <Text className={"font-bold text-lg"}>Quick Study</Text>
                    <Text className={"text-gray-500"}>Continue learning</Text>
                </TouchableOpacity>
                {
                    // Create deck button
                }
                <TouchableOpacity
                    className={"flex-1 bg-white p-6 rounded-md shadow-xl shadow-gray-200 items-center hover:shadow-md"}
                    onPress={() => router.push('/decks/new')}
                >
                    <MaterialIcons name={"add"} color={'#16a34a'} size={38} />
                    <Text className={"font-bold text-lg"}>Create deck</Text>
                    <Text className={"text-gray-500"}>Add new cards</Text>
                </TouchableOpacity>
            </View>

            <View>
                <View className={"flex-row justify-between mb-20"}>
                    <Text className={"font-bold text-xl"}>Recent Decks</Text>
                    <TouchableOpacity className={"h-7 w-20 hover:bg-gray-200 hover:rounded-md items-center"}>
                        <Text className={"text-[16px]"}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={"text-gray-500"}>No recent decks.</Text>
                </View>
            </View>
        </ScrollView>
    );
}
