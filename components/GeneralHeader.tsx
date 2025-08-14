import Text from "@/components/Text";
import { View } from "react-native";

type GeneralHeaderProps = {
    title: string;
    description: string;
}

export default function GeneralHeader({title, description}: GeneralHeaderProps) {
    return (
        <View className={"flex justify-center items-start h-[120px] px-4 bg-white"}>
            <Text weight="bold" className={"text-[24px]"}>{title}</Text>
            <Text weight="medium" className={"text-gray-500 text-lg"}>{description}</Text>
        </View>
    )
}