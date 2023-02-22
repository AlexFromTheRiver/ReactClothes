import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPZlQUuQ7G0zsCT2oRBeRU46kzJJL0DR4",
    authDomain: "crwn-clothes-db-78b17.firebaseapp.com",
    projectId: "crwn-clothes-db-78b17",
    storageBucket: "crwn-clothes-db-78b17.appspot.com",
    messagingSenderId: "1037622092299",
    appId: "1:1037622092299:web:cc9d5b5466533b3fe59d0e"
};

// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPasswordAndDisplayName = async (email, password, displayName) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user: userAuth }) => {
            await updateProfile(userAuth, {
                displayName: displayName
            });

            createUserDocumentFromAuth(userAuth)

            return userAuth;
        });
};

export const SignIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};