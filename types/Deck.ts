import { Timestamp } from "firebase/firestore";
import { DeckCategory } from "./DeckCategory";

export interface Deck {
    id: string;
    name: string;
    description?: string;
    category: DeckCategory;
    cardsCount: number;
    createdAt: Timestamp;
    updatedAt?: Timestamp
}