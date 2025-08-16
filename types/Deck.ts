import { Timestamp } from "firebase/firestore";

export interface Deck {
    id: string;
    name: string;
    description?: string;
    createdAt: Timestamp
}