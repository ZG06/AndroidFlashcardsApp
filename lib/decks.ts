import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export const createDeck = async (name: string) => {
    const user = auth.currentUser;
    const userId = user?.uid;

    try {
        const response = await addDoc(collection(db, `users/${userId}/decks`), {
            name,
            createdAt: serverTimestamp()
        });

        return response.id;
    } catch (error) {
        console.error(error);
    }
}

export const deleteDeck = async (deckId: string) => {
    const user = auth.currentUser;
    const userId = user?.uid;

    try {
        const decksRef = doc(db, `users/${userId}/decks/${deckId}`);
        
        await deleteDoc(decksRef);
    } catch (error) {
        console.error(error);
    }
}