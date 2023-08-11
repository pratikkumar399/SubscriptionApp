import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth";
import { createContext, useEffect, useContext, useState } from "react";
import { auth } from "../firebase";
import './Loading.css'


const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [pending, setPending] = useState(true);

    // implement the login signup and logout functions here

    function signup(email, password) {
        // implement signup logic here
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        // implement login logic here
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        // implement logout logic here
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("User state changed:", currentUser);
            setUser(currentUser);
            setPending(false)
        });
        // cleanup subscription on unmount
        return () => unsubscribe();

    }, []);

    if (pending) {
        return <>
            <div className="loading-wave">
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
            </div>

        </>
    }


    return (
        <UserAuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
}


export function useUserAuth() {
    return useContext(UserAuthContext);
}