import Text from "@/components/Text";
import { FlashCard } from "@/types/FlashCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { Save } from "lucide-react-native";
import { Platform, TouchableOpacity, View } from "react-native";


type HeaderProps = {
    title: string;
    flashcardsLength: number;
    flashcards: FlashCard[];
    saveButtonText: string;
    onPress: () => void;
}

const DeckHeader = ({title, flashcardsLength, flashcards, saveButtonText, onPress}: HeaderProps) => {
    const navigation = useNavigation();
    const filledFlashCards = flashcards.filter((card) => card.front !== '' && card.back !== '')

    return (
        <View className={"justify-center h-[130px] px-4 bg-white"}>
            <View className={"flex-row items-center justify-between w-full"}>
                <View className={"flex-row items-center gap-x-4"}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <MaterialIcons name={"arrow-back"} size={24} color={"black"} />
                    </TouchableOpacity>
                    <View>
                        <Text weight="bold" className={"text-2xl"}>{title}</Text>
                        <Text className={"text-gray-600"}>{filledFlashCards ? filledFlashCards.length : '0'} of {flashcardsLength} cards completed</Text>
                    </View>
                </View>
                {
                    // Save deck button
                }
                <TouchableOpacity
                    className={"flex-row items-center justify-center gap-x-2 bg-black rounded-md px-3"}
                    style={{
                        height: Platform.OS === 'web' ? 40 : 35,
                        width: saveButtonText === 'Save Deck'
                            ? Platform.OS === 'web' ? 130 : 122
                            : Platform.OS === 'web' ? 160 : 142
                    }}
                    onPress={onPress}
                >
                    <Save color={"white"} size={16}/>
                    <Text weight="semibold" className={"text-white text-[15px]"}>{saveButtonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeckHeader;