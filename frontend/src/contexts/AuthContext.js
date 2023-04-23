// import React, { useContext, useState, useEffect } from "react"
// import { auth } from "../firebase"

// const AuthContext = React.createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true)

//   // function signup(email, password) {
//   //   return new Promise((resolve, reject) => {
//   //     auth.createUserWithEmailAndPassword(email, password)
//   //       .then((cred) => {
//   //         resolve(cred.user.uid);
//   //       })
//   //       .catch((error) => {
//   //         reject(error);
//   //       });
//   //   });
//   // }


// async function signup(email, password) {
//   try {
//     const cred = await auth.createUserWithEmailAndPassword(email, password);
//     return cred.user.uid;
//   } catch (error) {
//     throw error;
//   }
// }


//   function login(email, password) {
//     return auth.signInWithEmailAndPassword(email, password)
//   }

//   function logout() {
//     return auth.signOut()
//   }

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email)
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email)
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password)
//   }



//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }


import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function signUp(email, password) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      return user.uid;
    } catch (error) {
      throw error;
    }
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function sendPasswordResetEmail(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(newEmail) {
    return user.updateEmail(newEmail);
  }

  function updatePassword(newPassword) {
    return user.updatePassword(newPassword);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
  
}
