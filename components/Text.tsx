import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Props = TextProps & { weight?: Weight; style?: TextStyle | TextStyle[] };

const familyByWeight: Record<Weight, string> = {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
};

export default function Text({ weight = "regular", style, children, ...rest }: Props) {
    return <RNText {...rest} style={[{ fontFamily: familyByWeight[weight] }, style]}>{children}</RNText>;
}