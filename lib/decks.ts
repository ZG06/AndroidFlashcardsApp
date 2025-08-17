import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

export const createDeck = async (name: string, cardsCount: number, description?: string) => {
    const userId = auth.currentUser?.uid;

    try {
        const response = await addDoc(collection(db, `users/${userId}/decks`), {
            name,
            description,
            cardsCount,
            createdAt: serverTimestamp()
        });

        return response.id;
    } catch (error) {
        console.error(error);
    }
}

export const deleteDeck = async (deckId: string) => {
    const userId = auth.currentUser?.uid;
    const batch = writeBatch(db);

    try {
        const deckRef = doc(db, `users/${userId}/decks/${deckId}`);
        const cardDocs = await getDocs(collection(db, `users/${userId}/decks/${deckId}/cards`));

        cardDocs.forEach((doc) => {
            batch.delete(doc.ref);
        })
        
        await batch.commit();

        await deleteDoc(deckRef);
    } catch (error) {
        console.error(error);
    }
}

export const updateDeck = async (
    deckId: string,
    data: {
        name?: string;
        description?: string;
        cardsCount: number;
    }
) => {
    const userId = auth.currentUser?.uid;
    
    try {
        const decksRef = doc(db, `users/${userId}/decks/${deckId}`);
        
        await updateDoc(decksRef, {
            name: data.name,
            description: data.description,
            cardsCount: data.cardsCount,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}