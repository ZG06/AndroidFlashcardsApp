import { db } from "@/firebaseConfig";
import { FlashCard } from "@/types/FlashCard";
import { collection, FirestoreError, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCards = (deckId: string, userId?: string) => {
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);   
    const [error, setError] = useState<FirestoreError | undefined>(undefined);

    useEffect(() => {
        if (!userId || !deckId) {
            setIsLoading(false);
            setCards([]);
            return;
        }

        setIsLoading(true);
        const q = query(collection(db, `users/${userId}/decks/${deckId}/cards`), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const mapped: FlashCard[] = snapshot.docs.map(doc => ({
                id: doc.id, 
                front: doc.data().front,
                back: doc.data().back
            }));
            
            setCards(mapped);
            setIsLoading(false);
        }, 
        (error) => {
            setError(error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [deckId, userId])

    return { cards, isLoading, error };
}