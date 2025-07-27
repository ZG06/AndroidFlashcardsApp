import {createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut, deleteUser} from 'firebase/auth'
import {auth, db} from '@/firebaseConfig'
import {doc, setDoc, deleteDoc} from 'firebase/firestore'
import {router} from "expo-router";
import {Alert} from "react-native";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user?.emailVerified) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
    }, []);

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            const user = response?.user;

            if (!user.emailVerified) {
                await signOut(auth);
                return { success: false, msg: 'emailNotVerified' };
            }

            return {success: true}
        } catch (error) {
            let msg = error.message;

            if (msg.includes('(auth/invalid-credential)')) msg = 'invalidCredentials';
            if (msg.includes('(auth/email-not-verified)')) msg = 'emailNotVerified';
            return {success: false, msg};
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true}
        } catch (error) {
            return {success: false, msg: error.message}
        }
    }

    const register = async (username, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response?.user;

            await setDoc(doc(db, 'users', response?.user?.uid), {
                username,
                email,
                userId: response?.user?.uid
            });

            await sendEmailVerification(user);

            return {success: true, data: response?.user};
        } catch (error) {
            let msg = error.message;

            if (msg.includes('(auth/email-already-in-use')) msg = 'emailInUse';
            return {success: false, msg};
        }
    }

    const deleteAccount = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return { success: false, msg: 'No user is currently signed in.' };
        }


        try {
            await deleteDoc(doc(db, "users", currentUser.uid));
            await deleteUser(currentUser);
            return { success: true };
        } catch (error) {
            let msg = error.message;

            if (msg.includes("auth/requires-recent-login")) {
                Alert.alert(
                    "Session Expired",
                    "Please log in again to delete your account.",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                await logout();
                                router.replace("/login");
                            },
                        },
                    ]
                );
                return { success: false, msg: "Please re-authenticate and try again." };
            }
        }
    }

    const resendVerificationEmail = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return {success: false, msg: "No user signed in"};
        }

        try {
            await sendEmailVerification(currentUser);
            return { success: true };
        } catch (error) {
            let msg = error.message;

            if (msg.includes('(auth/too-many-requests)')) msg = 'tooManyRequests';
            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout, deleteAccount, resendVerificationEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }

    return value;
}