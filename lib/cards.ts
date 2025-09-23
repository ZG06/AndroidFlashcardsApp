import { auth, db } from "@/firebaseConfig";
import { FlashCard } from "@/types/FlashCard";
import { deleteField, doc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

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

export const upsertAndDeleteCards = async (
    deckId: string,
    toCreate: Array<FlashCard>,
    toUpdate: Array<FlashCard>,
    toDeleteIds: Array<string>,
) => {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    const batch = writeBatch(db);

    toCreate.forEach((card) => {
        const cardId = card.id;

        try {
            const docRef = doc(db, `users/${userId}/decks/${deckId}/cards/${cardId}`);

            batch.set(docRef, {
                front: card.front,
                back: card.back,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
        } catch (error) {
            console.error(error);
        }
    });

    toUpdate.forEach((card) => {
        const cardId = card.id;

        try {
            const docRef = doc(db, `users/${userId}/decks/${deckId}/cards/${cardId}`);

            batch.set(docRef, {
                front: card.front,
                back: card.back,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error(error);
        }
    });

    toDeleteIds.forEach((id) => {
        try {
            const docRef = doc(db, `users/${userId}/decks/${deckId}/cards/${id}`);

            batch.delete(docRef);
        } catch (error) {
            console.error(error);
        }
    });

    await batch.commit();
}

export const setCardDifficulty = async (
    deckId: string,
    cardId: string,
    difficulty: 'easy' | 'hard' | null
) => {
    const userId = auth.currentUser?.uid;

    if (!userId) return;

    try {
        const cardRef = doc(db, `users/${userId}/decks/${deckId}/cards/${cardId}`);

        await updateDoc(cardRef, {
            difficulty: difficulty || deleteField(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}