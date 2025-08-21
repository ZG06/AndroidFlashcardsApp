import { db } from "@/firebaseConfig";
import { Deck } from "@/types/Deck";
import { collection, FirestoreError, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";


export const useDecks = (category: string, userId?: string) => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FirestoreError | undefined>(undefined);

    useEffect(() => {

        if (!userId) {
            setIsLoading(false);
            setDecks([]);
            return;
        }

        const q = query(collection(db, `users/${userId}/decks`), orderBy('createdAt', 'desc'));
        setIsLoading(true);
        const unsubscribe = onSnapshot(q, (snapshot => {
            const mapped: Deck[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.category === category) {
                    mapped.push({
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        cardsCount: data.cardsCount,
                        createdAt: data.createdAt
                    });
                } else if (category === 'All') {
                    mapped.push({
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        cardsCount: data.cardsCount,
                        createdAt: data.createdAt
                    });
                }
            });

            setDecks(mapped);
            setIsLoading(false);
        }), error => {
            setError(error);
            setIsLoading(false);
        });

        return unsubscribe;
    }, [category, userId])

    return { decks, isLoading, error };
}