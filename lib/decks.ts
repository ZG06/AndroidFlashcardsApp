import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const createDeck = async (name: string, description?: string) => {
    const userId = auth.currentUser?.uid;

    try {
        const response = await addDoc(collection(db, `users/${userId}/decks`), {
            name,
            description,
            createdAt: serverTimestamp()
        });

        return response.id;
    } catch (error) {
        console.error(error);
    }
}

export const deleteDeck = async (deckId: string) => {
    const userId = auth.currentUser?.uid;

    try {
        const decksRef = doc(db, `users/${userId}/decks/${deckId}`);
        
        await deleteDoc(decksRef);
    } catch (error) {
        console.error(error);
    }
}

export const updateDeck = async (deckId: string, data: {name?: string; description?: string}) => {
    const userId = auth.currentUser?.uid;
    
    try {
        const decksRef = doc(db, `users/${userId}/decks/${deckId}`);
        
        await updateDoc(decksRef, {
            name: data.name,
            description: data.description,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}