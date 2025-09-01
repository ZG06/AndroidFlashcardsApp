import Text from '@/components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { CompleteDeckModalStar } from './CompleteDeckModalStar';


const motivationalQuotes = [
    "Every expert was once a beginner!",
    "Consistency is the key to mastery.",
    "Small steps lead to big achievements.",
    "Learning never exhausts the mind.",
    "Progress, not perfection!"
];

type Props = {
    isVisible: boolean;
    deckName: string;
    cardsStudied: number;
    cardAccuracy: number;
    correctAnswers: number;
    wrongAnswers: number;
    onStudyAgain: () => void;
    onClose: () => void;
}

export const CompleteDeckStudyModal = ({isVisible, deckName, cardsStudied, cardAccuracy, correctAnswers, wrongAnswers, onStudyAgain, onClose}: Props) => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={0.5}
            backdropColor="#111827"
            style={{
                margin: 'auto',
            }}
        >
            <View className='items-center bg-white p-6 rounded-2xl'>
                <CompleteDeckModalStar />

                <Text weight='bold' className='text-gray-900 text-2xl mb-2 mt-6'>
                    Practice Session Complete!
                </Text>
                <Text className='text-gray-600 text-[17px]'>
                    Great job studying {deckName}!
                </Text>

                {/* Deck statistics */}
                <View className='mt-6 bg-gray-50 p-4 rounded-xl w-full'>
                    <View className='flex-row items-center justify-center gap-x-10'>
                        {/* Cards studied */}
                        <View className='item-center justify-center'>
                            <Text weight='bold' className='text-center color-blue-600 text-2xl'>
                                {cardsStudied}
                            </Text>
                            <Text className='text-center text-gray-600 text-xs'>
                                Cards Studied
                            </Text>
                        </View>

                        {/* Accuracy */}
                        <View className='item-center justify-center'>
                            <Text weight='bold' className='text-center color-green-600 text-2xl'>
                                {cardAccuracy}%
                            </Text>
                            <Text className='text-center text-gray-600 text-xs'>
                                Accuracy
                            </Text>
                        </View>
                    </View>

                    {/* Horizontal divider */}
                    <View className='border-b border-gray-200 my-3' />

                    <View className='gap-y-2'>
                        {/* Correct answers */}
                        <View className='flex-row items-center justify-between'>
                            <Text className='text-gray-600'>
                                Correct answers:
                            </Text>
                            <View className='flex-row items-center justify-center gap-x-1'>
                                <Check size={12} color="#15A349" />
                                <Text weight='medium' className='text-green-600'>
                                    {correctAnswers}
                                </Text>
                            </View>
                        </View>

                        {/* Wrong answers */}
                        <View className='flex-row items-center justify-between'>
                            <Text className='text-gray-600'>
                                Wrong answers:
                            </Text>
                            <View className='flex-row items-center justify-center gap-x-1'>
                                <X size={12} color="#DB2525" />
                                <Text weight='medium' className='text-red-600'>
                                    {wrongAnswers}
                                </Text>
                            </View>
                        </View>

                        {/* Study mode */}
                        <View className='flex-row items-center justify-between'>
                            <Text className='text-gray-600'>
                                Study mode:
                            </Text>
                            <Text weight='medium'>
                                Practice Mode
                            </Text>
                        </View>
                    </View>

                </View>
                
                {cardAccuracy >= 90 ? (
                    <LinearGradient
                        colors={['#F59E0B', '#F97316']}
                        style={{
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginVertical: 24,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text weight='medium' className='text-white text-[12px]'>🏆 Excellent Performance!</Text>
                    </LinearGradient>
                ) : cardAccuracy >= 70 ? (
                    <LinearGradient
                        colors={['#4ADE80', '#60A5FA']}
                        style={{
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginVertical: 24,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text className='text-white'>🎯 Great Job!</Text>
                    </LinearGradient>
                ) : cardAccuracy >= 60 ? (
                    <LinearGradient
                        colors={['#60A5FA', '#A78BFA']}
                        style={{
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginVertical: 24,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text className='text-white'>📈 Good Progress!</Text>
                    </LinearGradient>
                ) : (
                    <LinearGradient
                        colors={['#A78BFA', '#EC4899']} 
                        style={{
                            borderRadius: 20,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginVertical: 24,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text className='text-white'>💪 Keep Practicing!</Text>
                    </LinearGradient>
                )}

                <TouchableOpacity
                    className='items-center justify-center bg-black w-full rounded-md h-10 mb-2'
                    onPress={() => {
                        onStudyAgain();
                        onClose();
                    }}
                >
                    <Text weight='medium' className='text-white'>
                        Study Again
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='items-center justify-center bg-white w-full rounded-md h-10 border border-gray-300'
                    onPress={() => {
                        router.replace('/decks');
                        onClose();
                    }}    
                >
                    <Text weight='medium' className='text-gray-700'>
                        Back to Decks
                    </Text>
                </TouchableOpacity>

                {/* Horizontal divider */}
                <View className='border-b border-gray-200 mt-6 mb-4 w-full' />

                <Text className='color-gray-500 text-xs italic'>
                    {randomQuote}
                </Text>
            </View>
        </Modal>
    );
};