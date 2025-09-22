import Text from "@/components/Text";
import { LucideIcon } from "lucide-react-native";
import { View } from "react-native";


type Props = {
    Icon: LucideIcon;
    color: string;
    count: number;
    description: string;
}

const FlashcardCounterCard = ({ Icon, color, count, description }: Props) => {
    return (
        <View className="flex-1 items-center justify-center border border-gray-200 rounded-md bg-white p-4">
            <Icon color={color} size={24} />
            <Text
                weight="bold"
                className="text-2xl mt-2"
                style={{ color }}
            >
                {count}
            </Text>
            <Text className="text-gray-600 text-center text-sm">
                {description}
            </Text>
        </View>
    )
}

export default FlashcardCounterCard;