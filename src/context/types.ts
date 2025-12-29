import type { Session } from "@supabase/supabase-js";

export type SupaSession = Session | null;
export type AuthContextType = {
  session: SupaSession;
  setSession: React.Dispatch<React.SetStateAction<SupaSession>>;
};
