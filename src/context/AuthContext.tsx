import { AuthError, type Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import supabase from "../supabase-client.ts";

type SupaSession = Session | null;
type AuthContextType = {
  session: SupaSession;
  setSession: React.Dispatch<React.SetStateAction<SupaSession>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

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
        setSession(data.session);
      } catch (error) {
        if (error instanceof AuthError)
          console.log("Error geting session: " + error.message);
      }
    }
    getInitialSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
