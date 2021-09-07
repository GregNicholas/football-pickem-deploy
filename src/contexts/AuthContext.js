import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password, name) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const user = auth.currentUser;
                return user.updateProfile({
                    displayName: name
                })
            })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = email => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = email => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = password => {
        return currentUser.updatePassword(password);
    }

    const updateUserName = username => {
        return currentUser.updateProfile({
            displayName: username
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateUserName
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}   
        </AuthContext.Provider>
    )
}

export default AuthContext
