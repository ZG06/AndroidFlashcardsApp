import { Text, View } from "react-native";

type HeaderProps = {
    title: string;
    description: string;
}

const Header = ({title, description}: HeaderProps) => {
    return (
        <View className={"flex justify-center items-start h-[120px] px-4 bg-white"}>
            <Text className={"text-[24px] font-bold"}>{title}</Text>
            <Text className={"text-gray-500 font-medium text-lg"}>{description}</Text>
        </View>
    )
}

export default Header;