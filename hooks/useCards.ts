import { db } from "@/firebaseConfig";
import { FlashCard } from "@/types/FlashCard";
import { collection, FirestoreError, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCards = (deckId: string, userId?: string) => {
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [error, setError] = useState<FirestoreError | undefined>(undefined);

    useEffect(() => {
        if (!userId) {
            setCards([]);
            return;
        }

        const q = query(collection(db, `users/${userId}/decks/${deckId}/cards`), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot => {
            const mapped: FlashCard[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                mapped.push({
                    id: doc.id,
                    front: data.front,
                    back: data.back
                });
            });
            
            setCards(mapped);
        }), error => {
            setError(error);
        });

        return unsubscribe;
    }, [deckId, userId])

    return { cards, error };
}