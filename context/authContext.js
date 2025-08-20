import { auth, db } from '@/firebaseConfig';
import Constants from "expo-constants";
import { router } from "expo-router";
import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    verifyBeforeUpdateEmail,
    verifyPasswordResetCode
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";


const {
    CLOUDINARY_CLOUD_NAME
} = Constants.expoConfig?.extra || {};

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
            let msg = error.code;

            switch (msg) {
                case 'auth/invalid-credential':
                    msg = 'invalidCredentials';
                    break;
                case 'auth/user-disabled':
                    msg = 'userDisabled';
                    break;
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;
                default:
                    msg = 'unexpectedError';
            }

            return {success: false, msg};
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true}
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }

            return {success: false, msg};
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
            let msg = error.code;

            switch (msg) {
                case 'auth/email-already-in-use':
                    msg = 'emailInUse';
                    break;
                case 'auth/invalid-email':
                    msg = 'invalidEmail';
                    break;
                case 'auth/weak-password':
                    msg = 'tooWeakPassword';
                    break;
                case 'auth/operation-not-allowed':
                    msg = 'registrationNotAllowed';
                    break;
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;
                default:
                    msg = 'unexpectedError';
            }
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
            let msg = error.code;

            switch (msg) {
                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return {success: false, msg};
        }
    }

    const sendResetPasswordEmail = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;

                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;

                default:
                    msg = 'unexpectedError';
            }

            return { success: false, msg };
        }
    }

    const resetPassword = async (oobCode, newPassword) => {
        try {
            await verifyPasswordResetCode(auth, oobCode);
            await confirmPasswordReset(auth, oobCode, newPassword);
            return {success: true};
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;

                case 'auth/user-not-found':
                    msg = 'userNotFound';
                    break;

                case 'auth/weak-password':
                    msg = 'tooWeakPassword';
                    break;

                default:
                    msg = 'unexpectedError';
            }

            return { success: false, msg };
        }
    }

    const uploadProfilePicture = async (imageUri) => {
        try {
            const formData = new FormData();
            

            if (imageUri.startsWith('data:')) {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                formData.append('file', blob, 'avatar.jpg');
            } else {
                formData.append('file', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'avatar.jpg'
                });
            }
            formData.append('upload_preset', 'flashcard-app-avatars');

            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.secure_url) {
                return data.secure_url;
            } else {
                return undefined;
            }
        } catch (error) {
            return undefined;
        }
    };


    const saveProfilePictureURL = async (userId, url) => {
        const userRef = doc(db, 'users', userId);
        try {
            await updateDoc(userRef, {
                profilePictureUrl: url
            });
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'permission-denied':
                    msg = 'profilePermissionDenied';
                    break;
                case 'not-found':
                    msg = 'userDocumentNotFound';
                    break;
                case 'internal':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return { success: false, msg };
        }
    }

    const fetchProfilePicture = async (setProfilePicture) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const data = userDoc.data();
                if (data.profilePictureUrl) {
                    setProfilePicture(data.profilePictureUrl);
                }
            }
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'permission-denied':
                    msg = 'profilePermissionDenied';
                    break;
                case 'not-found':
                    msg = 'userDocumentNotFound';
                    break;
                case 'internal':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return { success: false, msg };
        }
    }
    
    const getUserData = async (options = {}) => {
        const {
            setUsername = () => {},
            setEmail = () => {},
            setBio = () => {},
            setLocation = () => {},
            setWebsite = () => {},
            setProfilePicture = () => {}
        } = options;

        const userId = auth.currentUser?.uid;
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const data = userDoc.data();
                
                if (data.username) setUsername(data.username);
                if (data.email) setEmail(data.email);
                if (data.bio) setBio(data.bio);
                if (data.location) setLocation(data.location);
                if (data.website) setWebsite(data.website);
                if (data.profilePictureUrl) fetchProfilePicture(setProfilePicture);
            }
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'permission-denied':
                    msg = 'profilePermissionDenied';
                    break;
                case 'not-found':
                    msg = 'userDocumentNotFound';
                    break;
                case 'internal':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return { success: false, msg };
        }
    }

    const saveUserData = async (
        username,
        bio,
        location,
        website,
        profilePictureUrl
    ) => {
        const userId = auth.currentUser?.uid;
        const userRef = doc(db, 'users', userId);

        try {
            await updateDoc(userRef, {
                username,
                bio,
                location,
                website,
                profilePictureUrl
            })
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'permission-denied':
                    msg = 'profilePermissionDenied';
                    break;
                case 'not-found':
                    msg = 'userDocumentNotFound';
                    break;
                case 'internal':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return { success: false, msg };
        }
    }

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const user = auth.currentUser;

            if (!user) return { success: false, msg: 'unexpectedError' }

            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);

            return { success: true };
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'auth/invalid-credential':
                    msg = 'invalidCredentials';
                    break;
                case 'auth/user-disabled':
                    msg = 'userDisabled';
                    break;
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;
                case 'auth/weak-password':
                    msg = 'tooWeakPassword';
                    break;
                case 'auth/internal-error':
                    msg = 'internalError';
                    break;
                case 'auth/wrong-password':
                    msg = 'wrongPassword';
                    break;
                default:
                    msg = 'unexpectedError';
            }

            return { success: false, msg };
        }
    }

    const changeEmail = async (newEmail, currentPassword) => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser?.email) {
                return { success: false, error: 'unexpectedError' };
            }

            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);
            await verifyBeforeUpdateEmail(currentUser, newEmail);

            return { success: true }
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'auth/wrong-password':
                    msg = 'wrongPassword';
                    break;
                case 'auth/user-disabled':
                    msg = 'userDisabled';
                    break;
                case 'auth/network-request-failed':
                    msg = 'networkRequestFailed';
                    break;
                case 'auth/too-many-requests':
                    msg = 'tooManyRequests';
                    break;
                case 'auth/internal-error':
                    msg = 'internalError';
                    break;
                case 'auth/invalid-credential':
                    msg = 'wrongPassword';
                    break;
                case 'auth/operation-not-allowed':
                    console.log(error);
                    msg = 'operationNotAllowed';
                    break;
                default:
                    console.log(msg)
                    msg = 'unexpectedError';
            }

            return { success: false, error:msg };
        }
    }

    const updateEmailInFirestore = async (newEmail) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const userRef = doc(db, 'users', userId);
        try {
            await updateDoc(userRef, { email: newEmail });
            return { success: true };
        } catch (error) {
            let msg = error.code;

            switch (msg) {
                case 'permission-denied':
                    msg = 'profilePermissionDenied';
                    break;
                case 'not-found':
                    msg = 'userDocumentNotFound';
                    break;
                case 'internal':
                    msg = 'networkRequestFailed';
                    break;
                default:
                    msg = 'unexpectedError';
            }
            return { success: false, msg };
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            register,
            logout,
            deleteAccount,
            resendVerificationEmail,
            uploadProfilePicture,
            saveProfilePictureURL,
            fetchProfilePicture,
            sendResetPasswordEmail,
            resetPassword,
            getUserData,
            saveUserData,
            changePassword,
            changeEmail,
            updateEmailInFirestore
        }}>
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