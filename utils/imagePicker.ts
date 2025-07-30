import * as ImagePicker from 'expo-image-picker';

export const pickImageFromLibrary = async (): Promise<string | null> => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
    });

    return result.canceled ? null : result.assets[0].uri;
}