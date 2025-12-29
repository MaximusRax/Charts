import type { Session } from "@supabase/supabase-js";
import { createContext, useState } from "react";

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
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

