import type { Session, User } from "@supabase/supabase-js";

export type SignInResult =
  | {
      success: true;
      data: { session: Session | null; user: User | null };
    }
  | { success: false; error: string };

export type SupaSession = Session | null;
export type AuthContextType = {
  session: SupaSession;
  setSession: React.Dispatch<React.SetStateAction<SupaSession>>;
  signInUser: (email: string, password: string) => Promise<SignInResult>;
};
