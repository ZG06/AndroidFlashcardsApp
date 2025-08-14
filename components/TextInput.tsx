import React, { forwardRef } from "react";
import { TextInput as RNTextInput, TextInputProps, TextStyle } from "react-native";

type Weight = "regular" | "medium" | "semibold" | "bold";
type Props = TextInputProps & { weight?: Weight; style?: TextStyle | TextStyle[]; className?: string };

const familyByWeight: Record<Weight, string> = {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
};

const BaseTextInput = forwardRef<RNTextInput, Props>(({ weight = "regular", style, className, ...rest }, ref) => {
    return (
        <RNTextInput
            ref={ref}
            {...rest}
            className={className}
            style={[{ fontFamily: familyByWeight[weight] }, style]}
        />
    );
});

BaseTextInput.displayName = "TextInput";

export default BaseTextInput;