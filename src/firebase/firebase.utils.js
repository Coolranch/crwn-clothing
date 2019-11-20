import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvabTYXnoCm9sDc4Ij_2XilF8f8rDZvyE",
    authDomain: "crwn-db-8c84c.firebaseapp.com",
    databaseURL: "https://crwn-db-8c84c.firebaseio.com",
    projectId: "crwn-db-8c84c",
    storageBucket: "crwn-db-8c84c.appspot.com",
    messagingSenderId: "857764065802",
    appId: "1:857764065802:web:2a6b5245243fd1f82165f3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;