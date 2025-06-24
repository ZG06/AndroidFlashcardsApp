import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {router, Stack, useNavigation} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NewFlashcard from "@/components/NewFlashcard";
import { v4 as uuidv4 } from 'uuid';


const NewDeckHeader = () => {
    const navigation = useNavigation();

    return (
        <View className={"justify-center h-[130px] px-4 bg-white"}>
            <View className={"flex-row items-center justify-between w-full"}>
                <View className={"flex-row items-center gap-x-4"}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <MaterialIcons name={"arrow-back"} size={24} color={"black"} />
                    </TouchableOpacity>
                    <View>
                        <Text className={"text-2xl font-bold"}>Create New Deck</Text>
                        <Text className={"text-gray-600"}>0 of 1 cards completed</Text>
                    </View>
                </View>
                {
                    // New deck button
                }
                <TouchableOpacity
                    className={"flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                    onPress={() => router.push('/new/newDeck')}
                >
                    <MaterialIcons name={"save"} color={"white"} size={15}/>
                    <Text className={"text-white font-semibold text-[13px]"}>Save Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function NewDeck() {
    const [deckInfoValue, setDeckInfoValue] = useState('');
    const [flashcards, setFlashcards] = useState([{ id: uuidv4() }]);

    const addFlashcard = () => {
        setFlashcards(prev => [...prev, { id: uuidv4() }]);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (<NewDeckHeader />)
                }}
            />
            <ScrollView className={"p-6"} style={{backgroundColor: '#E6EDFF'}}>
                {
                    // Deck information block
                }
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
                    <Text className={"font-semibold text-xl mb-5"}>Deck Information</Text>
                    {
                        // Deck name
                    }
                    <View className={"mb-4"}>
                        <Text className={"mb-1.5"}>Deck Name *</Text>
                        <TextInput
                            className={"border-gray-200 border rounded-md min-h-12 px-3 text-gray-500"}
                            value={deckInfoValue}
                            onChangeText={setDeckInfoValue}
                            placeholder={"e.g., Spanish vocabulary"}
                        />
                    </View>
                    <View>
                        {
                            // Deck description
                        }
                        <Text className={"mb-1.5"}>Description</Text>
                        <TextInput
                            multiline={true}
                            className={"border-gray-200 border rounded-md px-3 text-gray-500 min-h-[70px] pt-2.5"}
                            placeholder={"Brief description of what this deck"}
                        />
                    </View>
                </View>

                <View className={"flex-row justify-between w-full mb-6"}>
                    <Text className={"text-[18px] font-bold mb-4"}>Flashcards</Text>
                    {
                        // Add card button
                    }
                    <TouchableOpacity
                        className={"flex-row items-center justify-center gap-x-2 bg-black h-9 w-[110px] rounded-md px-3"}
                        onPress={addFlashcard}
                    >
                        <MaterialIcons name={"add"} color={"white"} size={15}/>
                        <Text className={"text-white font-semibold text-[13px]"}>Add card</Text>
                    </TouchableOpacity>
                </View>

                {flashcards.map((card, index) => (
                    <NewFlashcard
                        key={card.id}
                        index={index + 1}
                        canDelete={flashcards.length > 1}
                        onDelete={() => {
                            setFlashcards(prev => prev.filter(f => f.id !== card.id))
                        }}
                    />
                ))}
            </ScrollView>
            <View className={"absolute bottom-8 left-6 right-6"}>
                <View className={"flex-row gap-x-6"}>
                    {
                        // Cancel button
                    }
                    <TouchableOpacity
                        className={"flex-1 items-center justify-center gap-x-2 bg-white h-10 w-[120px] rounded-md px-3"}
                        onPress={() => router.back()}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    {
                        // Save button
                    }
                    <TouchableOpacity
                        className={"flex-1 flex-row items-center justify-center gap-x-2 bg-black h-10 w-[120px] rounded-md px-3"}
                    >
                        <MaterialIcons name={"save"} color={"white"} size={15}/>
                        <Text className={"text-white font-semibold text-[13px]"}>Save Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
