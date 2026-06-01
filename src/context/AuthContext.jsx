import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth }
from "../firebase";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // FIREBASE USER PERSISTENCE
  // ==========================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  // ==========================================
  // NORMAL LOGIN
  // ==========================================

  const login = async (
    email,
    password
  ) => {

    try {

      const res =
        await axios.post(
          "https://ai-study-planner-backend-jr7f.onrender.com/api/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      return {
        success: true,
      };

    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data?.message ||
          "Login Failed",
      };
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {

    try {

      await axios.post(
        "https://ai-study-planner-backend-jr7f.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      return {
        success: true,
      };

    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data?.message ||
          "Registration Failed",
      };
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {

    try {

      await signOut(auth);

      localStorage.removeItem(
        "token"
      );

      setUser(null);

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        register,

        logout,

        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);