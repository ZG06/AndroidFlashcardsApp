import { Slider as WebSlider } from '@miblanchard/react-native-slider';
import Slider from "@react-native-community/slider";
import { Platform } from "react-native";

type Props = {
    value: number;
    onValueChange: (value: number) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
}

const CustomSlider = (props: Props) => {
    if (Platform.OS === 'web') {
        return (
            <WebSlider
                value={props.value}
                onValueChange={props.onValueChange}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                step={props.step}
                minimumTrackTintColor={props.minimumTrackTintColor}
                maximumTrackTintColor={props.maximumTrackTintColor}
                thumbTintColor={props.thumbTintColor}
                trackStyle={{ height: 4, backgroundColor: props.maximumTrackTintColor }}
                thumbStyle={{
                width: 20,
                height: 20,
                backgroundColor: props.thumbTintColor,
                borderRadius: 10,
                }}
                minimumTrackStyle={{ backgroundColor: props.minimumTrackTintColor }}
            />
        );
    }
  
    return (
        <Slider
            value={props.value}
            onValueChange={props.onValueChange}
            minimumValue={props.minimumValue}
            maximumValue={props.maximumValue}
            step={props.step}
            minimumTrackTintColor={props.minimumTrackTintColor}
            maximumTrackTintColor={props.maximumTrackTintColor}
            thumbTintColor={props.thumbTintColor}
        />
    );
};
  
export default CustomSlider;