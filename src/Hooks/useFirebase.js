import { useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseAuthentication from "../Firebase/Firebase.init";

firebaseAuthentication();
const auth = getAuth();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLooding, setIsloading] = useState(true);
  const [error, setError] = useState("");

  // user manually sign up-
  const manuallySignUp = (email, password, name, location, navigate) => {
    setIsloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userInfo = result.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setUser(userInfo);
            setIsloading(false);
            const destination = location?.state?.from || "/";
            navigate(destination);
            console.log(userInfo);
            fetch("https://serene-journey-34919.herokuapp.com/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((result) => console.log(result));
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(error);
        setIsloading(false);
      });
  };

  // user manually sign in-
  const manuallySignIn = (email, password, location, navigate) => {
    setIsloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const userInfo = result.user;
        setUser(userInfo);
        setIsloading(false);
        const destination = location?.state?.from || "/";
        navigate(destination);
        fetch("https://serene-journey-34919.herokuapp.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((result) => console.log(result));
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setIsloading(false);
      });
  };

  // obserbing redering---
  useEffect(() => {
    setIsloading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsloading(false);
      } else {
        setUser(null);
        setIsloading(false);
      }
    });
  }, []);

  // logout-
  const logOut = () => {
    setIsloading(true);
    signOut(auth)
      .then(() => {
        setIsloading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // delete a user
  const handleUserDelete = (uid) => {
    console.log(uid);
    auth
      .deleteUser(uid)
      .then(() => {
        alert("Successfully deleted user");
      })
      .catch((error) => {
        alert("Error deleting user:", error);
      });
  };

  return {
    user,
    error,
    isLooding,
    logOut,
    manuallySignUp,
    manuallySignIn,
    handleUserDelete,
  };
};

export default useFirebase;
