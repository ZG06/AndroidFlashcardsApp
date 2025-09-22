import Text from "@/components/Text";
import { LucideIcon } from "lucide-react-native";
import { Platform, View } from "react-native";


type Props = {
    Icon: LucideIcon;
    color: string;
    label: string;
    description: string;
    isSelected: boolean;
}

const StudyModeCards = ({
    Icon,
    color,
    label,
    description,
    isSelected
}: Props) => {
    return (
        <View className={`flex-1 items-center justify-center rounded-md p-4 ${
            isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200 bg-white'}
            ${Platform.OS === 'web' && 'transition-shadow hover:shadow-md'}    
        `}>
            <View
                style={{
                    backgroundColor: `${color}1A`,
                    padding: 10,
                    borderRadius: 999
                }}
            >
                <Icon color={color} size={24} />
            </View>
            <Text weight="semibold" className="text-sm mt-2 mb-1">
                {label}
            </Text>
            <Text className="text-gray-600 text-center text-xs">
                {description}
            </Text>
        </View>
    )
}

export default StudyModeCards;