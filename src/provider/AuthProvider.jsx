import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import propTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();


    //log in with google
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in user with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign out user
    const logOut = async () => {
        setLoading(true);
        await axiosPublic('/logout', {withCredentials : true});
        return signOut(auth);
    }

    //update user profile
    const userUpdate = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL : photo,
        })
    }

    //get token for every user
    const getToken = async email => {
        const {data} = await axiosPublic.post('/jwt', {email}, {withCredentials : true});
        return {data};
    }

    //track user info onAuthStateChanged
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                getToken(currentUser?.email)
            }
            setLoading(false);
        })

        return () => unSubscribe();
    }, [])

    
    const authInfo = {
        user,
        loading,
        googleLogin,
        createUser,
        signIn,
        logOut,
        userUpdate
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}