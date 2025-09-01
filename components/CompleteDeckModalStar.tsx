import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';

export const CompleteDeckModalStar = () => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.7,
                    duration: 1000,
                    useNativeDriver: Platform.OS !== 'web',
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: Platform.OS !== 'web',
                })
            ])
        );
        
        pulse.start();
        return () => pulse.stop();
    }, []);

    return (
        <View className="w-20 h-20 rounded-full overflow-hidden justify-center items-center">
            <Animated.View 
                style={[{
                    width: '100%',
                    height: '100%',
                    opacity: pulseAnim,
                }]}
            >
                <LinearGradient
                    colors={['#4ADE80', '#60A5FA']}
                    style={{ 
                        width: '100%', 
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Star size={40} color="#FFFFFF" fill="#FFFFFF" />
                </LinearGradient>
            </Animated.View>
        </View>
    );
};