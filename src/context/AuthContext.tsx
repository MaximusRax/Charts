import { AuthError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "../supabase-client.ts";
import type { SignInResult, SupaSession } from "./types.ts";
import { AuthContext } from "./useAuth.ts";


export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<SupaSession>(null);
  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(data);
        // setSession(data.session);
      } catch (error) {
        if (error instanceof AuthError) {
          console.log("Error geting session: " + error.message);
        }
      }
    }
    getInitialSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
  }, []);

  const signInUser = async (
    email: string,
    password: string
  ): Promise<SignInResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      //Unexpected error
      console.error("Unexpected error during sign-in:", error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSession, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
