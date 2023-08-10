import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth";
import { createContext, useEffect, useContext, useState } from "react";
import { auth } from "../firebase";


const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [user, setUser] = useState("");
    // implement the login signup and logout functions here

    function signup(email, password) {
        // implement signup logic here
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        // implement login logic here
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // cleanup subscription on unmount

        return () => unsubscribe();


    }, []);

    return (
        <UserAuthContext.Provider value={{ user, signup, login }}>
            {children}
        </UserAuthContext.Provider>
    );
}


export function useUserAuth() {
    return useContext(UserAuthContext);
}