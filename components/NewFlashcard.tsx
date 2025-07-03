import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function NewFlashcard({
     index = 1,
     onDelete,
     canDelete,
     isFlipped,
     frontValue,
     backValue,
     onFrontChange,
     onBackChange,
     togglePreview
 }: {
    index?: number;
    onDelete?: () => void;
    canDelete: boolean;
    isFlipped: boolean;
    frontValue: string;
    backValue: string;
    onFrontChange: (text: string) => void;
    onBackChange: (text: string) => void;
    togglePreview: () => void;
}) {
    const [isPreviewFront, setIsPreviewFront] = useState(true);

    return (
        <>
            {isFlipped ? (
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
                    <View className={"flex-row justify-between mb-5"}>
                        <Text className={"font-semibold text-[16px]"}>Card {index}</Text>
                        <View className={"flex-row items-center gap-x-3"}>
                            {
                                // Preview icon
                            }
                            <TouchableOpacity
                                className={"flex-row gap-x-1 hover:bg-gray-100 hover:rounded-md h-6 w-20 justify-center"}
                                onPress={togglePreview}
                            >
                                {isFlipped ? (
                                    <MaterialIcons name='visibility-off' size={18} color="black"/>
                                ) : (
                                    <MaterialIcons name='visibility' size={18} color="black"/>
                                )}
                                <Text className={"text-sm"}>Preview</Text>
                            </TouchableOpacity>
                            {
                                // Delete icon
                            }
                            {canDelete && (
                                <TouchableOpacity
                                    className={"hover:bg-gray-100 hover:rounded-md h-6 w-8 items-center"}
                                    onPress={onDelete}
                                >
                                    <MaterialIcons name={"delete"} size={18} color={"red"}/>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View>
                        {isPreviewFront ? (
                            // Front side preview
                            <TouchableOpacity
                                className={"border-[1px] rounded-md border-gray-300 h-32 flex justify-between items-center pb-2 pt-9"}
                                onPress={() => setIsPreviewFront(false)}
                            >
                                <View className={"items-center"}>
                                    <Text className={"text-center mb-2 text-gray-500"}>
                                        QUESTION
                                    </Text>
                                    <Text className={"text-center text-sm font-semibold"}>
                                        { frontValue || 'Front side content...'}
                                    </Text>
                                </View>
                                <Text className={"text-gray-400 text-xs text-center"}>
                                    Tap to reveal answer
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            // Back side preview
                            <TouchableOpacity
                                className={"border-[1px] rounded-md border-gray-300 h-32 flex justify-center items-center"}
                                onPress={() => setIsPreviewFront(true)}
                            >
                                <View className={"items-center"}>
                                    <Text className={"text-center mb-2 text-gray-500"}>
                                        ANSWER
                                    </Text>
                                    <Text className={"text-center text-sm font-semibold"}>
                                        { backValue || 'Back side content...'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
            ) : (
                <View className={"bg-white p-6 rounded-md shadow-sm shadow-gray-200 mb-6"}>
                    <View className={"flex-row justify-between mb-5"}>
                        <Text className={"font-semibold text-[16px]"}>Card {index}</Text>
                        <View className={"flex-row items-center gap-x-3"}>
                            {
                                // Preview icon
                            }
                            <TouchableOpacity
                                className={"flex-row gap-x-1 hover:bg-gray-100 hover:rounded-md h-6 w-20 justify-center"}
                                onPress={togglePreview}
                            >
                                {isFlipped ? (
                                    <MaterialIcons name='visibility-off' size={18} color="black"/>
                                ) : (
                                    <MaterialIcons name='visibility' size={18} color="black"/>
                                )}
                                <Text className={"text-sm"}>Preview</Text>
                            </TouchableOpacity>
                            {
                                // Delete icon
                            }
                            {canDelete && (
                                <TouchableOpacity
                                    className={"hover:bg-gray-100 hover:rounded-md h-6 w-8 items-center"}
                                    onPress={onDelete}
                                >
                                    <MaterialIcons name={"delete"} size={18} color={"red"}/>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {
                        // Deck question
                    }
                    <View className={"mb-5"}>
                        <Text className={"mb-1.5"}>Front (Question)</Text>
                        <TextInput
                            multiline={true}
                            value={frontValue}
                            onChangeText={onFrontChange}
                            className={"border-gray-200 border rounded-md px-3 min-h-[70px] pt-2.5"}
                            placeholder={"Enter the question or prompt..."}
                        />
                    </View>
                    <View>
                        {
                            // Deck answer
                        }
                        <Text className={"mb-1.5"}>Back (Answer)</Text>
                        <TextInput
                            multiline={true}
                            value={backValue}
                            onChangeText={onBackChange}
                            className={"border-gray-200 border rounded-md px-3 min-h-[70px] pt-2.5"}
                            placeholder={"Enter the answer or explanation..."}
                        />
                    </View>
                </View>
            )}
        </>

    );
}
