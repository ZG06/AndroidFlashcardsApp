import Text from '@/components/Text';
import TextInput from '@/components/TextInput';
import { DeckCategory } from '@/types/DeckCategory';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


type Props = {
    deckName: string;
    setDeckName: (name: string) => void;
    deckDescription: string;
    setDeckDescription: (desc: string) => void;
    deckCategory: DeckCategory | null;
    setDeckCategory: (category: DeckCategory | null) => void;
    error: string[];
    setError: (error: string[]) => void;
    editable: boolean;
}

const dropdownData: { label: DeckCategory; value: string }[] = [
    { label: 'Language', value: '1' },
    { label: 'Math', value: '2' },
    { label: 'History', value: '3' },
    { label: 'Science', value: '4' },
    { label: 'Technology', value: '5' },
    { label: 'Other', value: '6' },
];

const DeckForm = ({
    deckName,
    setDeckName,
    deckDescription,
    setDeckDescription,
    deckCategory,
    setDeckCategory,
    error,
    setError,
    editable
}: Props) => {

    return (
        <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
            <Text weight="semibold" className={"text-xl mb-5"}>Deck Information</Text>

            {/* Deck name */}
            <View className={"mb-4"}>
                <Text weight="medium" className={"mb-1.5 text-gray-700"}>Deck Name *</Text>
                <TextInput
                    className={"border-gray-200 border rounded-md min-h-12 px-3"}
                    value={deckName}
                    onChangeText={(text) => {
                        setDeckName(text);
                        if (error) setError([]);
                    }}
                    placeholder={"e.g., Spanish vocabulary"}
                    placeholderTextColor={"#6B7280"}
                    editable={editable}
                />
                {error.includes('name') && (
                    <Text weight="medium" className="mt-1 text-xs text-red-600">
                        Provide a deck name
                    </Text>
                )}
            </View>

            {/* Deck description */}
            <View className={"mb-4"}>
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

            {/* Deck category */}
            <View>
                <Text weight="medium" className={"mb-1.5 text-gray-700"}>Category *</Text>
                
                <Dropdown
                    search={false}
                    data={dropdownData}
                    labelField={"label"}
                    valueField={"value"}
                    onChange={(item) => setDeckCategory(item.label)}
                    style={{
                        borderColor: '#e5e7eb',
                        borderRadius: 8,
                        borderWidth: 1,
                        height: 40,
                        paddingHorizontal: 12
                    }}
                />
                {error.includes('category') && (
                    <Text weight="medium" className="mt-1 text-xs text-red-600">
                        Select a category
                    </Text>
                )}
            </View>
        </View>
    );
}

export default DeckForm;