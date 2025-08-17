import { Timestamp } from "firebase/firestore";

export interface Deck {
    id: string;
    name: string;
    description?: string;
    cardsCount: number;
    createdAt: Timestamp;
    updatedAt?: Timestamp
}