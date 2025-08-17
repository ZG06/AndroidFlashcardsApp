import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { View } from 'react-native';


type Props = {
    deckName: string;
    setDeckName: (name: string) => void;
    deckDescription: string;
    setDeckDescription: (desc: string) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const DeckForm = ({
    deckName,
    setDeckName,
    deckDescription,
    setDeckDescription,
    error,
    setError
}: Props) => {
    return (
        <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
            <Text weight="semibold" className={"text-xl mb-5"}>Deck Information</Text>
            {
                // Deck name
            }
            <View className={"mb-4"}>
                <Text weight="medium" className={"mb-1.5 text-gray-700"}>Deck Name *</Text>
                <TextInput
                    className={"border-gray-200 border rounded-md min-h-12 px-3"}
                    value={deckName}
                    onChangeText={(text) => {
                        setDeckName(text);
                        if (error) setError(null);
                    }}
                    placeholder={"e.g., Spanish vocabulary"}
                    placeholderTextColor={"#6B7280"}
                />
                {error && (
                    <Text weight="medium" className="mt-1 text-xs text-red-600">
                        {error}
                    </Text>
                )}
            </View>
            <View>
                {
                    // Deck description
                }
                <Text weight="medium" className={"mb-1.5 text-gray-700"}>Description</Text>
                <TextInput
                    multiline={true}
                    className={"border-gray-200 border rounded-md px-3 min-h-[70px] pt-2.5"}
                    value={deckDescription}
                    onChangeText={setDeckDescription}
                    placeholder={"Brief description of what this deck"}
                    placeholderTextColor={"#6B7280"}
                />
            </View>
        </View>
    );
}

export default DeckForm;