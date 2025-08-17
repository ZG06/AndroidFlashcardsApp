import { auth, db } from "@/firebaseConfig";
import { doc, serverTimestamp, writeBatch } from "firebase/firestore";

export const saveCardsForDeck = async (deckId: string, cards: Array<{id: string; front: string; back: string}>) => {
    const userId = auth.currentUser?.uid;
    const filteredCards = cards.filter(card => (card.front.trim() && card.back.trim()));
    const batch = writeBatch(db);

    if (!userId || filteredCards.length === 0) return;

    filteredCards.forEach((card) => {
        if (card.front.trim() && card.back.trim()) {
            const cardId = card.id as string;

            try {
                const docRef = doc(db, `users/${userId}/decks/${deckId}/cards/${cardId}`)
                batch.set(docRef, {
                    front: card.front,
                    back: card.back,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error(error);
            }
        }
    })

    await batch.commit();
}