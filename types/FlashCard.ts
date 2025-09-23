export type CardDifficulty = 'easy' | 'hard';

export type FlashCard = {
    id: string;
    front: string;
    back: string;
    difficulty?: CardDifficulty;
}