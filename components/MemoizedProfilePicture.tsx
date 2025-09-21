import ActivityIndicator from "@/components/ActivityIndicator";
import { User } from "lucide-react-native";
import React, { useMemo } from "react";
import { Image, View } from "react-native";


type Props = {
    isProfilePictureLoading: boolean;
    profilePicture: string | null;
    size?: number;
    borderRadius: number;
};

export const MemoizedProfilePicture = ({
    isProfilePictureLoading,
    profilePicture,
    size,
    borderRadius
}: Props) => {
    const profilePictureComponent = useMemo(() => {
        if (isProfilePictureLoading) {
            return <ActivityIndicator size={50} />;
        } else if (profilePicture) {
            return (
                <Image
                    source={{uri: profilePicture}}
                    style={{
                        height: size,
                        width: size,
                        borderRadius: borderRadius,
                        resizeMode: 'cover',
                    }}
                />
            );
        } else {
            return <User size={32} color={'#2863e9'} />
        }
    }, [isProfilePictureLoading, profilePicture, size, borderRadius])

    return (
        <View>
            {profilePictureComponent}
        </View>
    )
};